import { useEffect, useId, useMemo, useRef, useState } from 'preact/hooks';
import type { SearchItem } from '../data/calculators';
import { Icon } from './ui/Icon';

interface Props {
  items: SearchItem[];
  variant?: 'header' | 'hero';
  placeholders?: string[];
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/²/g, '2')
    .replace(/[^a-z0-9% ]+/g, ' ')
    .trim();

function score(item: SearchItem, q: string) {
  const name = normalize(item.name);
  const hay = normalize(`${item.name} ${item.keywords} ${item.description}`);
  const terms = q.split(/\s+/).filter((t) => t && t !== 'berekenen' && t !== 'calculator' && t !== 'hoeveel');
  if (!terms.length) return name.includes(q) ? 1 : 0;
  let s = 0;
  for (const t of terms) {
    if (name.startsWith(t)) s += 6;
    else if (name.includes(t)) s += 4;
    else if (hay.includes(t)) s += 2;
    else return 0; // elk woord moet ergens voorkomen
  }
  return s;
}

export default function Search({ items, variant = 'header', placeholders }: Props) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [sel, setSel] = useState(0);
  const [ph, setPh] = useState(0);
  const [narrow, setNarrow] = useState(false);
  useEffect(() => setNarrow(window.matchMedia('(max-width: 520px)').matches), []);
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();

  const results = useMemo(() => {
    const nq = normalize(q);
    if (!nq) return variant === 'hero' ? items.slice(0, 6) : [];
    return items
      .map((it) => ({ it, s: score(it, nq) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((r) => r.it);
  }, [q, items, variant]);

  useEffect(() => setSel(0), [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) {
        setOpen(false);
        setExpanded(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  // Wisselende voorbeelden in de placeholder (alleen hero, niet bij reduced motion).
  useEffect(() => {
    if (!placeholders?.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setPh((p) => (p + 1) % placeholders.length), 2600);
    return () => clearInterval(t);
  }, [placeholders]);

  // Sneltoets "/" focust de zoekbalk in de header.
  useEffect(() => {
    if (variant !== 'header') return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
        e.preventDefault();
        setExpanded(true);
        setTimeout(() => input.current?.focus(), 0);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [variant]);

  const go = (slug: string) => {
    window.location.href = `/${slug}`;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setSel((s) => Math.min(results.length - 1, s + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel((s) => Math.max(0, s - 1));
    } else if (e.key === 'Enter') {
      if (results[sel]) {
        e.preventDefault();
        go(results[sel].slug);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setExpanded(false);
      input.current?.blur();
    }
  };

  const showList = open && (results.length > 0 || q.trim().length > 0);
  const placeholder =
    variant === 'hero' && placeholders?.length ? (narrow ? `Bijv. “${placeholders[ph]}”` : `Wat wil je berekenen? Bijv. “${placeholders[ph]}”`) : 'Wat wil je berekenen?';

  return (
    <div ref={root} class={`search search--${variant}${expanded ? ' is-open' : ''}`} role="search">
      {variant === 'header' && (
        <button
          type="button"
          class="search-toggle"
          aria-label="Zoeken"
          onClick={() => {
            setExpanded(true);
            setTimeout(() => input.current?.focus(), 0);
          }}
        >
          <Icon name="search" size={18} />
        </button>
      )}
      <div class="search-field">
        <Icon name="search" size={variant === 'hero' ? 20 : 16} />
        <input
          ref={input}
          type="search"
          class="search-input"
          placeholder={placeholder}
          aria-label="Zoek een calculator"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showList && results[sel] ? `${listId}-${results[sel].slug}` : undefined}
          autoComplete="off"
          spellcheck={false}
          enterKeyHint="search"
          value={q}
          onInput={(e) => {
            setQ((e.currentTarget as HTMLInputElement).value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
      </div>
      {showList && (
        <ul class="search-results" id={listId} role="listbox" aria-label="Zoekresultaten">
          {results.length === 0 ? (
            <li class="search-empty">
              Geen calculator gevonden voor “{q}”. <a href="/calculators">Bekijk alle calculators</a>
            </li>
          ) : (
            results.map((r, i) => (
              <li key={r.slug} role="presentation">
                <a href={`/${r.slug}`} id={`${listId}-${r.slug}`} role="option" aria-selected={i === sel} onMouseEnter={() => setSel(i)}>
                  <span class="sr-icon">
                    <Icon name={r.icon} size={18} />
                  </span>
                  <span>
                    <span class="sr-name">{r.name}</span>
                    <span class="sr-desc" style={{ display: 'block' }}>
                      {r.description}
                    </span>
                  </span>
                </a>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
