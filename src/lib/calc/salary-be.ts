import type { BeTaxConfig, TaperedReduction, TaxBracket } from '../../config/tax/types';
import { round2 } from '../format';

export type BeStatus = 'bediende' | 'arbeider';
export type BeHousehold = 'alleenstaand' | 'partner-met-inkomen' | 'partner-zonder-inkomen';

export interface BeSalaryInput {
  /** Bruto maandloon (voltijds, volledige maand). */
  gross: number;
  status: BeStatus;
  household: BeHousehold;
  /** Aantal kinderen ten laste (een kind met een handicap telt voor twee). */
  children: number;
  /** Alleenstaande ouder met kinderen ten laste (alleen bij "alleenstaand"). */
  singleParent: boolean;
}

export interface BeSalaryResult {
  gross: number;
  rszBase: number;
  rszGross: number;
  workBonusA: number;
  workBonusB: number;
  workBonus: number;
  rsz: number;
  taxableMonthly: number;
  annualGrossForTax: number;
  professionalCosts: number;
  annualTaxable: number;
  baseTax: number;
  familyReductions: number;
  annualTax: number;
  monthlyTaxBeforeBonus: number;
  fiscalWorkBonus: number;
  withholdingTax: number;
  specialContribution: number;
  net: number;
  annualGross: number;
  annualNet: number;
  effectiveRate: number;
}

const tapered = (s: number, r: TaperedReduction) => {
  if (s <= r.full) return r.amount;
  if (s > r.zero) return 0;
  return Math.max(0, round2(r.amount - r.slope * (s - r.full)));
};

/** Belasting volgens de basisschaal van de sleutelformule. */
export function scaleTax(income: number, brackets: TaxBracket[]) {
  let tax = 0;
  let lower = 0;
  for (const b of brackets) {
    const upper = b.upTo ?? Infinity;
    if (income <= lower) break;
    tax += (Math.min(income, upper) - lower) * b.rate;
    lower = upper;
  }
  return round2(tax);
}

export function childReduction(children: number, cfg: BeTaxConfig) {
  const n = Math.max(0, Math.floor(children));
  if (n <= 8) return cfg.childReductions[n];
  return cfg.childReductions[8] + (n - 8) * cfg.childReductionExtra;
}

/** Maandelijkse inhouding bijzondere bijdrage sociale zekerheid op het brutomaandloon. */
export function specialContribution(gross: number, household: BeHousehold, cfg: BeTaxConfig) {
  const sc = cfg.specialContribution;
  if (household === 'alleenstaand') {
    if (gross > sc.individualMax.from) return sc.individualMax.amount;
    const tier = [...sc.individual].reverse().find((t) => gross > t.from);
    return tier ? round2(tier.base + tier.rate * (gross - tier.from)) : 0;
  }
  if (household === 'partner-met-inkomen') {
    const j = sc.jointWithIncome;
    if (gross < j.minFrom) return 0;
    if (gross <= j.rateFrom) return j.min;
    if (gross <= j.stepFrom) return Math.max(j.min, round2(j.rate * (gross - j.rateFrom)));
    return Math.min(j.max, round2(j.stepBase + j.stepRate * (gross - j.stepFrom)));
  }
  const j = sc.jointWithoutIncome;
  if (gross <= j.rateFrom) return 0;
  if (gross <= j.stepFrom) return round2(j.rate * (gross - j.rateFrom));
  return Math.min(j.max, round2(j.stepBase + j.stepRate * (gross - j.stepFrom)));
}

/**
 * Netto maandloon voor een voltijdse werknemer in België volgens de
 * sleutelformule bedrijfsvoorheffing en de RSZ-regels van het opgegeven jaar.
 */
export function calcSalaryBe(input: BeSalaryInput, cfg: BeTaxConfig): BeSalaryResult | null {
  const gross = input.gross;
  if (!cfg.available || !(gross > 0) || gross > 1_000_000) return null;

  // 1. Persoonlijke RSZ (arbeiders op 108%) en sociale werkbonus.
  const rszBase = input.status === 'arbeider' ? gross * cfg.workerRszBase : gross;
  const rszGross = round2(rszBase * cfg.rszRate);
  const wb = cfg.workBonus[input.status];
  let bonusA = tapered(gross, wb.a);
  let bonusB = tapered(gross, wb.b);
  // De werkbonus mag de persoonlijke bijdragen niet overschrijden; aftopping eerst op luik B, dan op luik A.
  let excess = round2(bonusA + bonusB - rszGross);
  if (excess > 0) {
    const cutB = Math.min(bonusB, excess);
    bonusB = round2(bonusB - cutB);
    excess = round2(excess - cutB);
    bonusA = round2(Math.max(0, bonusA - excess));
  }
  const workBonus = round2(bonusA + bonusB);
  const rsz = round2(rszGross - workBonus);

  // 2. Bedrijfsvoorheffing volgens de sleutelformule.
  const taxableMonthly = round2(gross - rsz);
  const annualGrossForTax = round2(taxableMonthly * 12);
  const professionalCosts = Math.min(cfg.professionalCosts.max, round2(annualGrossForTax * cfg.professionalCosts.rate));
  const annualTaxable = round2(annualGrossForTax - professionalCosts);

  let baseTax: number;
  if (input.household === 'partner-zonder-inkomen') {
    const assigned = Math.min(cfg.marriageQuotient.max, round2(annualTaxable * cfg.marriageQuotient.rate));
    baseTax = scaleTax(assigned, cfg.brackets) + scaleTax(round2(annualTaxable - assigned), cfg.brackets) - 2 * cfg.taxFreeAllowance.tax;
  } else {
    baseTax = scaleTax(annualTaxable, cfg.brackets) - cfg.taxFreeAllowance.tax;
  }
  baseTax = Math.max(0, round2(baseTax));

  let reductions = childReduction(input.children, cfg);
  if (input.household === 'alleenstaand' && input.singleParent && input.children > 0) reductions += cfg.singleParentReduction;
  const familyReductions = Math.min(baseTax, reductions);
  const annualTax = round2(baseTax - familyReductions);
  const monthlyTaxBeforeBonus = round2(annualTax / 12);
  const fiscalWorkBonus = round2(bonusA * cfg.fiscalWorkBonus.a + bonusB * cfg.fiscalWorkBonus.b);
  const withholdingTax = Math.max(0, round2(monthlyTaxBeforeBonus - fiscalWorkBonus));

  // 3. Bijzondere bijdrage sociale zekerheid.
  const special = specialContribution(gross, input.household, cfg);

  const net = round2(gross - rsz - withholdingTax - special);
  return {
    gross,
    rszBase,
    rszGross,
    workBonusA: bonusA,
    workBonusB: bonusB,
    workBonus,
    rsz,
    taxableMonthly,
    annualGrossForTax,
    professionalCosts,
    annualTaxable,
    baseTax,
    familyReductions,
    annualTax,
    monthlyTaxBeforeBonus,
    fiscalWorkBonus,
    withholdingTax,
    specialContribution: special,
    net,
    annualGross: round2(gross * 12),
    annualNet: round2(net * 12),
    effectiveRate: (gross - net) / gross,
  };
}
