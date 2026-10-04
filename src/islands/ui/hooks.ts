import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { track } from '../../lib/analytics';

type FlatState = Record<string, string>;

/**
 * Formulierstatus voor een calculator.
 * - Start met standaardwaarden (zodat de server-render direct een voorbeeldresultaat toont).
 * - Neemt na het laden waarden over uit de URL (?bedrag=100&tarief=21), zodat gedeelde links werken.
 * - Stuurt calculator_view en calculator_start events.
 */
export function useCalcState<T extends FlatState>(calculatorName: string, defaults: T) {
  const [state, setState] = useState<T>(defaults);
  const [touched, setTouched] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    track('calculator_view', calculatorName);
    const params = new URLSearchParams(window.location.search);
    let fromUrl = false;
    const next = { ...defaults };
    for (const key of Object.keys(defaults)) {
      const v = params.get(key);
      if (v !== null && v.length <= 64) {
        (next as FlatState)[key] = v;
        fromUrl = true;
      }
    }
    if (fromUrl) {
      setState(next);
      setTouched(true);
    }
  }, []);

  const set = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      if (!started.current) {
        started.current = true;
        track('calculator_start', calculatorName);
      }
      setTouched(true);
      setState((s) => ({ ...s, [key]: value }));
    },
    [calculatorName],
  );

  const reset = useCallback(() => {
    setState(defaults);
    setTouched(false);
    if (window.location.search) history.replaceState(null, '', window.location.pathname);
  }, []);

  /** Waarden aanpassen zonder dat het als gebruikersinvoer telt (bijv. datum van vandaag na het laden). */
  const patch = useCallback((values: Partial<T>) => setState((s) => ({ ...s, ...values })), []);

  return { state, set, patch, reset, touched };
}

/** Stuurt één keer calculator_completed zodra de gebruiker iets heeft ingevuld en er een geldig resultaat staat. */
export function useCompletion(calculatorName: string, touched: boolean, valid: boolean, deps: unknown[]) {
  const done = useRef(false);
  useEffect(() => {
    if (done.current || !touched || !valid) return;
    const t = setTimeout(() => {
      done.current = true;
      track('calculator_completed', calculatorName);
    }, 1200);
    return () => clearTimeout(t);
  }, [touched, valid, ...deps]);
}

export function shareUrl(state: FlatState) {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(state);
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

/** True na hydratatie; voorkomt verschillen tussen server- en client-render. */
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}
