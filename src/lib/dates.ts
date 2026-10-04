/** Alle datumrekenwerk gebeurt in UTC op middernacht, zodat zomer-/wintertijd geen dagen kan verschuiven. */
export const DAY_MS = 86_400_000;

export function parseIsoDate(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(y, mo - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) return null;
  return date;
}

export const toIsoDate = (d: Date) => d.toISOString().slice(0, 10);

/** Vandaag (lokale kalenderdag van de bezoeker) als UTC-middernacht. */
export function todayUTC(now = new Date()) {
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

export const addDays = (d: Date, n: number) => new Date(d.getTime() + n * DAY_MS);
export const diffDays = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / DAY_MS);
export const daysInMonth = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
