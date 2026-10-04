import type { ComponentChildren } from 'preact';

interface ResultCardProps {
  label: string;
  value: ComponentChildren;
  sub?: ComponentChildren;
  children?: ComponentChildren;
}

/** Hoofdresultaat: korte zin + groot getal. aria-live zodat schermlezers wijzigingen horen. */
export function ResultCard({ label, value, sub, children }: ResultCardProps) {
  return (
    <div>
      <div aria-live="polite" aria-atomic="true">
        <p class="result-label">{label}</p>
        <p class="result-value">{value}</p>
        {sub && <p class="result-sub">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

export function EmptyResult({ children }: { children: ComponentChildren }) {
  return (
    <p class="result-empty" aria-live="polite">
      {children}
    </p>
  );
}

export interface BreakdownRow {
  label: ComponentChildren;
  value: ComponentChildren;
  variant?: 'total' | 'minus';
}

export function Breakdown({ rows, label }: { rows: BreakdownRow[]; label?: string }) {
  return (
    <dl class="breakdown" aria-label={label}>
      {rows.map((r, i) => (
        <div class={`breakdown-row${r.variant ? ` ${r.variant}` : ''}`} key={i}>
          <dt>{r.label}</dt>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Stat({ label, value, note }: { label: string; value: ComponentChildren; note?: ComponentChildren }) {
  return (
    <div class="stat">
      <div class="stat-label">{label}</div>
      <div class="stat-value">{value}</div>
      {note && <div class="stat-note">{note}</div>}
    </div>
  );
}

export function FormulaInline({ children }: { children: ComponentChildren }) {
  return (
    <div class="formula-inline">
      <span class="visually-hidden">Gebruikte formule: </span>
      {children}
    </div>
  );
}

export function Notice({ kind = 'info', children }: { kind?: 'info' | 'warn'; children: ComponentChildren }) {
  return (
    <div class={`notice notice-${kind}`} role={kind === 'warn' ? 'note' : undefined}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        {kind === 'warn' ? (
          <>
            <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
            <path d="M12 9v4M12 17h.01" />
          </>
        ) : (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 16v-5M12 8h.01" />
          </>
        )}
      </svg>
      <div>{children}</div>
    </div>
  );
}
