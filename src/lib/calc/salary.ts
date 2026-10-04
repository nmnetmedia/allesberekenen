import type { NlTaxConfig as IncomeTaxConfig } from '../../config/tax/types';

/** Belasting en premies volksverzekeringen over het belastbaar inkomen (box 1), vóór heffingskortingen. */
export function incomeTax(taxable: number, cfg: IncomeTaxConfig) {
  let remaining = Math.max(0, taxable);
  let lower = 0;
  let tax = 0;
  for (const b of cfg.brackets) {
    const upper = b.upTo ?? Infinity;
    const slice = Math.min(remaining, upper - lower);
    if (slice <= 0) break;
    tax += slice * b.rate;
    remaining -= slice;
    lower = upper;
  }
  return tax;
}

export function generalCredit(income: number, cfg: IncomeTaxConfig) {
  const { max, phaseOutStart, phaseOutRate } = cfg.generalCredit;
  if (income <= phaseOutStart) return max;
  return Math.max(0, max - phaseOutRate * (income - phaseOutStart));
}

export function labourCredit(income: number, cfg: IncomeTaxConfig) {
  if (income <= 0) return 0;
  const seg = cfg.labourCredit.find((s) => income >= s.from && (s.to === null || income < s.to));
  if (!seg) return 0;
  return Math.max(0, seg.base + seg.rate * (income - seg.from));
}

/** Jaarbelasting na heffingskortingen. Kortingen kunnen de belasting niet onder nul brengen. */
export function annualTaxAfterCredits(taxable: number, cfg: IncomeTaxConfig, applyCredits = true) {
  const gross = incomeTax(taxable, cfg);
  if (!applyCredits) return { gross, general: 0, labour: 0, net: gross };
  const general = generalCredit(taxable, cfg);
  const labour = labourCredit(taxable, cfg);
  const totalCredits = Math.min(gross, general + labour);
  const generalUsed = Math.min(general, totalCredits);
  return { gross, general: generalUsed, labour: totalCredits - generalUsed, net: gross - totalCredits };
}

export interface SalaryInput {
  gross: number;
  period: 'maand' | 'jaar';
  holidayIncluded: boolean;
  holidayRate: number;
  bonus: number;
  thirteenthMonth: boolean;
  /** Werknemersdeel pensioenpremie als fractie van het vaste loon (0,05 = 5%). */
  pensionRate: number;
  applyCredits: boolean;
}

export interface SalaryResult {
  monthlyGross: number;
  annualRegularGross: number;
  holidayAllowance: number;
  bonus: number;
  thirteenth: number;
  annualGross: number;
  pension: number;
  taxable: number;
  taxGross: number;
  generalCredit: number;
  labourCredit: number;
  annualTax: number;
  annualNet: number;
  monthlyTax: number;
  monthlyPension: number;
  monthlyNet: number;
  extrasGross: number;
  extrasNet: number;
  effectiveRate: number;
  marginalRate: number;
}

/**
 * Indicatieve bruto-netto berekening op jaarbasis.
 * Maandnetto = netto van het vaste loon / 12. Het netto van vakantiegeld, bonus
 * en 13e maand is wat deze bedragen extra opleveren bovenop het vaste loon
 * (marginale methode, vergelijkbaar met de werking van het bijzonder tarief).
 */
export function calcSalary(input: SalaryInput, cfg: IncomeTaxConfig): SalaryResult | null {
  if (!cfg.available || !(input.gross > 0) || input.gross > 100_000_000) return null;
  const monthlyGross = input.period === 'maand' ? input.gross : input.gross / 12;
  const annualRegularGross = monthlyGross * 12;
  const holidayAllowance = input.holidayIncluded ? annualRegularGross * input.holidayRate : 0;
  const thirteenth = input.thirteenthMonth ? monthlyGross : 0;
  const bonus = Math.max(0, input.bonus || 0);
  const extrasGross = holidayAllowance + thirteenth + bonus;
  const annualGross = annualRegularGross + extrasGross;

  // Pensioenpremie wordt meestal alleen over het vaste loon ingehouden en is aftrekbaar.
  const pension = annualRegularGross * Math.min(0.3, Math.max(0, input.pensionRate || 0));
  const taxableRegular = annualRegularGross - pension;
  const taxable = annualGross - pension;

  const all = annualTaxAfterCredits(taxable, cfg, input.applyCredits);
  const regular = annualTaxAfterCredits(taxableRegular, cfg, input.applyCredits);

  const annualNet = annualGross - pension - all.net;
  const regularNet = taxableRegular - regular.net;

  const step = 100;
  const marginalRate = (annualTaxAfterCredits(taxable + step, cfg, input.applyCredits).net - all.net) / step;

  return {
    monthlyGross,
    annualRegularGross,
    holidayAllowance,
    bonus,
    thirteenth,
    annualGross,
    pension,
    taxable,
    taxGross: all.gross,
    generalCredit: all.general,
    labourCredit: all.labour,
    annualTax: all.net,
    annualNet,
    monthlyTax: regular.net / 12,
    monthlyPension: pension / 12,
    monthlyNet: regularNet / 12,
    extrasGross,
    extrasNet: annualNet - regularNet,
    effectiveRate: annualGross > 0 ? all.net / annualGross : 0,
    marginalRate,
  };
}
