import { daysInMonth, diffDays } from '../dates';

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  remainderDays: number;
  totalDays: number;
  totalHours: number;
  nextBirthday: Date;
  daysToBirthday: number;
  nextAge: number;
  isBirthday: boolean;
}

/** Tel hele maanden op bij een datum; bestaat de dag niet (31 → februari), dan wordt het de laatste dag van die maand. */
export function addMonthsClamped(d: Date, months: number) {
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + months;
  const ty = y + Math.floor(m / 12);
  const tm = ((m % 12) + 12) % 12;
  return new Date(Date.UTC(ty, tm, Math.min(d.getUTCDate(), daysInMonth(ty, tm))));
}

/**
 * Leeftijd in jaren, maanden en dagen op een peildatum.
 * Methode: zoveel mogelijk hele maanden vanaf de geboortedatum, daarna de resterende dagen.
 * Geboren op 29 februari? Dan valt de verjaardag in een gewoon jaar op 28 februari.
 */
export function calcAge(birth: Date, on: Date): AgeResult | null {
  if (on.getTime() < birth.getTime()) return null;
  const by = birth.getUTCFullYear();

  let totalMonths = (on.getUTCFullYear() - by) * 12 + (on.getUTCMonth() - birth.getUTCMonth());
  if (addMonthsClamped(birth, totalMonths).getTime() > on.getTime()) totalMonths -= 1;
  const anchor = addMonthsClamped(birth, totalMonths);
  const days = diffDays(anchor, on);

  const totalDays = diffDays(birth, on);
  let nextAge = Math.floor(totalMonths / 12) + 1;
  let next = addMonthsClamped(birth, Math.floor(totalMonths / 12) * 12);
  if (next.getTime() < on.getTime()) next = addMonthsClamped(birth, nextAge * 12);
  else nextAge -= 1; // vandaag jarig
  const daysToBirthday = diffDays(on, next);

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    days,
    totalMonths,
    totalWeeks: Math.floor(totalDays / 7),
    remainderDays: totalDays % 7,
    totalDays,
    totalHours: totalDays * 24,
    nextBirthday: next,
    daysToBirthday,
    nextAge,
    isBirthday: daysToBirthday === 0,
  };
}
