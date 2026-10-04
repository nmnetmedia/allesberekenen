const eur = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });
const eur0 = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

export const formatEUR = (n: number) => eur.format(Number.isFinite(n) ? n : 0);
export const formatEUR0 = (n: number) => eur0.format(Number.isFinite(n) ? n : 0);

export function formatNumber(n: number, maxDecimals = 2, minDecimals = 0) {
  if (!Number.isFinite(n)) return '–';
  return new Intl.NumberFormat('nl-NL', {
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: minDecimals,
  }).format(n);
}

export const formatPercent = (n: number, maxDecimals = 2) => `${formatNumber(n, maxDecimals)}%`;

/** Parse Nederlandse invoer: "1.234,56", "1234.56", "1234,5" en "€ 12" werken allemaal. */
export function parseNumber(raw: string | number | null | undefined): number {
  if (typeof raw === 'number') return raw;
  if (raw == null) return NaN;
  let s = String(raw).trim().replace(/[€%\s]/g, '');
  if (!s) return NaN;
  const hasComma = s.includes(',');
  const hasDot = s.includes('.');
  if (hasComma && hasDot) {
    // De laatste scheider is het decimaalteken.
    if (s.lastIndexOf(',') > s.lastIndexOf('.')) s = s.replace(/\./g, '').replace(',', '.');
    else s = s.replace(/,/g, '');
  } else if (hasComma) {
    s = s.replace(',', '.');
  } else if (hasDot) {
    // "1.234" of "1.234.567" behandelen we als duizendtallen; "12.5" als decimaal.
    const parts = s.split('.');
    const thousands = parts.length > 2 || (parts[1].length === 3 && /^-?[1-9]\d{0,2}$/.test(parts[0]));
    if (thousands) s = s.replace(/\./g, '');
  }
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

export const round2 = (n: number) => Math.round((n + Math.sign(n) * Number.EPSILON) * 100) / 100;

const dateLong = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const dateWeekday = new Intl.DateTimeFormat('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const dateShort = new Intl.DateTimeFormat('nl-NL', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
const weekdayOnly = new Intl.DateTimeFormat('nl-NL', { weekday: 'long', timeZone: 'UTC' });

export const formatDate = (d: Date) => dateLong.format(d);
export const formatDateWeekday = (d: Date) => dateWeekday.format(d);
export const formatDateShort = (d: Date) => dateShort.format(d);
export const formatWeekday = (d: Date) => weekdayOnly.format(d);

/** "2026-10-04" → "4 oktober 2026" (voor build-time datums). */
export function formatIsoDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return formatDate(new Date(Date.UTC(y, m - 1, d)));
}
