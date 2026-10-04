import { round2 } from '../format';

export type BtwDirection = 'excl-to-incl' | 'incl-to-excl';

export interface BtwResult {
  excl: number;
  vat: number;
  incl: number;
}

/**
 * Bereken BTW. Er wordt op centen afgerond en het BTW-bedrag is altijd het
 * verschil tussen inclusief en exclusief, zodat de optelling altijd klopt.
 */
export function calcBtw(amount: number, ratePercent: number, direction: BtwDirection): BtwResult | null {
  if (!Number.isFinite(amount) || !Number.isFinite(ratePercent) || ratePercent < 0 || ratePercent > 100) return null;
  const r = ratePercent / 100;
  if (direction === 'excl-to-incl') {
    const excl = round2(amount);
    const vat = round2(excl * r);
    return { excl, vat, incl: round2(excl + vat) };
  }
  const incl = round2(amount);
  const excl = round2(incl / (1 + r));
  return { excl, vat: round2(incl - excl), incl };
}
