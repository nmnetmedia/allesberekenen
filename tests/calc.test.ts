import { describe, expect, it } from 'vitest';
import { calcBtw } from '../src/lib/calc/btw';
import { calcPercentage } from '../src/lib/calc/percentage';
import { calcBmi } from '../src/lib/calc/bmi';
import { calcAge } from '../src/lib/calc/age';
import { calcArea } from '../src/lib/calc/area';
import { calcCalories } from '../src/lib/calc/calories';
import { calcSalary, generalCredit, labourCredit, incomeTax } from '../src/lib/calc/salary';
import { calcOvulation } from '../src/lib/calc/ovulation';
import { calcCompound } from '../src/lib/calc/compound';
import { calcMortgage } from '../src/lib/calc/mortgage';
import { parseNumber } from '../src/lib/format';
import { parseIsoDate, toIsoDate } from '../src/lib/dates';
import { nl2026 } from '../src/config/tax/nl-2026';

const d = (s: string) => parseIsoDate(s)!;

describe('parseNumber', () => {
  it('begrijpt Nederlandse en internationale notatie', () => {
    expect(parseNumber('1.234,56')).toBe(1234.56);
    expect(parseNumber('1234,5')).toBe(1234.5);
    expect(parseNumber('1234.5')).toBe(1234.5);
    expect(parseNumber('1.250')).toBe(1250);
    expect(parseNumber('0.125')).toBe(0.125);
    expect(parseNumber('€ 100')).toBe(100);
    expect(parseNumber('')).toBeNaN();
    expect(parseNumber('abc')).toBeNaN();
  });
});

describe('BTW', () => {
  it('exclusief → inclusief', () => {
    expect(calcBtw(100, 21, 'excl-to-incl')).toEqual({ excl: 100, vat: 21, incl: 121 });
    expect(calcBtw(50, 9, 'excl-to-incl')).toEqual({ excl: 50, vat: 4.5, incl: 54.5 });
  });
  it('inclusief → exclusief, optelling klopt altijd', () => {
    expect(calcBtw(121, 21, 'incl-to-excl')).toEqual({ excl: 100, vat: 21, incl: 121 });
    const r = calcBtw(19.99, 21, 'incl-to-excl')!;
    expect(r.excl).toBe(16.52);
    expect(r.vat).toBe(3.47);
    expect(Math.round((r.excl + r.vat) * 100)).toBe(1999);
  });
  it('0% en ongeldige invoer', () => {
    expect(calcBtw(80, 0, 'incl-to-excl')).toEqual({ excl: 80, vat: 0, incl: 80 });
    expect(calcBtw(NaN, 21, 'excl-to-incl')).toBeNull();
    expect(calcBtw(10, -5, 'excl-to-incl')).toBeNull();
  });
});

describe('Percentage', () => {
  it('alle modi', () => {
    expect(calcPercentage('deel', 15, 80)!.value).toBe(12);
    expect(calcPercentage('aandeel', 30, 120)!.value).toBe(25);
    expect(calcPercentage('stijging', 80, 100)!.value).toBe(25);
    expect(calcPercentage('daling', 100, 80)!.value).toBe(20);
    expect(calcPercentage('verschil', 100, 80)!.value).toBeCloseTo(22.2222, 3);
    expect(calcPercentage('korting', 25, 80)).toEqual({ value: 60, secondary: 20 });
  });
  it('delen door nul geeft null', () => {
    expect(calcPercentage('aandeel', 5, 0)).toBeNull();
    expect(calcPercentage('stijging', 0, 5)).toBeNull();
  });
});

describe('BMI', () => {
  it('berekent BMI en categorie', () => {
    const r = calcBmi(70, 175)!;
    expect(r.bmi).toBeCloseTo(22.857, 3);
    expect(r.category.key).toBe('gezond');
    expect(r.healthyMinKg).toBeCloseTo(56.66, 2);
    expect(r.healthyMaxKg).toBeCloseTo(76.26, 2);
  });
  it('grenswaarden', () => {
    expect(calcBmi(25 * 4, 200)!.category.key).toBe('overgewicht'); // precies 25
    expect(calcBmi(18.5 * 4, 200)!.category.key).toBe('gezond'); // precies 18,5
    expect(calcBmi(30 * 4, 200)!.category.key).toBe('obesitas');
  });
  it('70-plus en minderjarig', () => {
    expect(calcBmi(70, 175, 75)!.seniorRange).toBeDefined();
    expect(calcBmi(50, 160, 15)!.isMinor).toBe(true);
  });
});

describe('Leeftijd', () => {
  it('gewone leeftijd', () => {
    const r = calcAge(d('1990-05-15'), d('2026-10-04'))!;
    expect([r.years, r.months, r.days]).toEqual([36, 4, 19]);
    expect(toIsoDate(r.nextBirthday)).toBe('2027-05-15');
    expect(r.nextAge).toBe(37);
  });
  it('maandeinde en schrikkeljaar', () => {
    const a = calcAge(d('2000-01-31'), d('2025-03-01'))!;
    expect([a.years, a.months, a.days]).toEqual([25, 1, 1]);
    const b = calcAge(d('2000-02-29'), d('2025-02-28'))!;
    expect([b.years, b.months, b.days]).toEqual([25, 0, 0]);
    expect(b.isBirthday).toBe(true);
    const c = calcAge(d('2000-02-29'), d('2028-02-29'))!;
    expect(c.years).toBe(28);
  });
  it('totaal dagen en weken', () => {
    const r = calcAge(d('2026-01-01'), d('2026-12-31'))!;
    expect(r.totalDays).toBe(364);
    expect(r.totalWeeks).toBe(52);
    expect(r.totalHours).toBe(364 * 24);
  });
  it('peildatum vóór geboorte', () => {
    expect(calcAge(d('2020-01-01'), d('2019-01-01'))).toBeNull();
  });
});

describe('m²', () => {
  it('meerdere ruimtes en snijverlies', () => {
    const r = calcArea([{ length: 5, width: 4 }, { length: 300, width: 250 }].slice(0, 1), 'm', 10);
    expect(r.net).toBe(20);
    expect(r.total).toBeCloseTo(22, 10);
    const cm = calcArea([{ length: 300, width: 250 }], 'cm', 0);
    expect(cm.net).toBeCloseTo(7.5, 10);
  });
});

describe('Caloriebehoefte', () => {
  it('Mifflin-St Jeor', () => {
    const man = calcCalories('man', 30, 80, 180, 'gemiddeld')!;
    expect(man.bmr).toBe(1780); // 800 + 1125 − 150 + 5
    expect(man.tdee).toBeCloseTo(2759, 0);
    const vrouw = calcCalories('vrouw', 30, 65, 168, 'weinig')!;
    expect(vrouw.bmr).toBe(1389); // 650 + 1050 − 150 − 161
    expect(vrouw.tdee).toBeCloseTo(1666.8, 1);
  });
});

describe('Bruto netto (NL 2026)', () => {
  it('schijven en kortingen', () => {
    expect(incomeTax(38883, nl2026)).toBeCloseTo(13900.67, 2);
    expect(generalCredit(20000, nl2026)).toBe(3115);
    expect(generalCredit(78426, nl2026)).toBeCloseTo(0, 0);
    expect(labourCredit(11965, nl2026)).toBeCloseTo(996, 0);
    expect(labourCredit(25845, nl2026)).toBeCloseTo(5300, 0);
    expect(labourCredit(45592, nl2026)).toBeCloseTo(5685, 0);
    expect(labourCredit(140000, nl2026)).toBe(0);
  });
  it('€ 4.000 per maand met 8% vakantiegeld', () => {
    const r = calcSalary(
      { gross: 4000, period: 'maand', holidayIncluded: true, holidayRate: 0.08, bonus: 0, thirteenthMonth: false, pensionRate: 0, applyCredits: true },
      nl2026,
    )!;
    expect(r.annualGross).toBe(51840);
    expect(r.annualTax).toBeCloseTo(11788.27, 1);
    expect(r.annualNet).toBeCloseTo(40051.73, 1);
    // maandnetto + netto extra's = jaarnetto
    expect(r.monthlyNet * 12 + r.extrasNet).toBeCloseTo(r.annualNet, 6);
  });
  it('heffingskortingen maken belasting nooit negatief', () => {
    const r = calcSalary(
      { gross: 500, period: 'maand', holidayIncluded: false, holidayRate: 0.08, bonus: 0, thirteenthMonth: false, pensionRate: 0, applyCredits: true },
      nl2026,
    )!;
    expect(r.annualTax).toBe(0);
    expect(r.annualNet).toBe(6000);
  });
});

describe('Ovulatie', () => {
  it('cyclus van 28 dagen', () => {
    const [c] = calcOvulation(d('2026-01-01'), 28)!;
    expect(toIsoDate(c.ovulation)).toBe('2026-01-15');
    expect(toIsoDate(c.fertileStart)).toBe('2026-01-10');
    expect(toIsoDate(c.fertileEnd)).toBe('2026-01-16');
    expect(toIsoDate(c.nextPeriod)).toBe('2026-01-29');
  });
  it('cyclus van 32 dagen', () => {
    const [c] = calcOvulation(d('2026-03-01'), 32)!;
    expect(toIsoDate(c.ovulation)).toBe('2026-03-19');
  });
});

describe('Rente op rente', () => {
  it('alleen startbedrag', () => {
    const r = calcCompound(10000, 0, 7, 10)!;
    expect(r.endValue).toBeCloseTo(10000 * 1.07 ** 10, 6);
  });
  it('met maandinleg en 0% rendement', () => {
    const r = calcCompound(1000, 100, 0, 5)!;
    expect(r.endValue).toBeCloseTo(7000, 8);
    expect(r.totalInterest).toBeCloseTo(0, 8);
  });
});

describe('Hypotheek', () => {
  it('annuïteit', () => {
    const r = calcMortgage(300000, 4, 30, 'annuitair')!;
    expect(r.monthlyPayment).toBeCloseTo(1432.25, 2);
    expect(r.totalPaid).toBeCloseTo(1432.2458 * 360, 0);
    expect(r.rows.at(-1)!.balance).toBe(0);
  });
  it('lineair', () => {
    const r = calcMortgage(300000, 4, 30, 'lineair')!;
    expect(r.monthlyPayment).toBeCloseTo(833.33 + 1000, 1);
    // rente lineair = i × L × (n + 1) / 2
    expect(r.totalInterest).toBeCloseTo((0.04 / 12) * 300000 * 361 / 2, 4);
  });
  it('0% rente', () => {
    expect(calcMortgage(120000, 0, 10, 'annuitair')!.monthlyPayment).toBe(1000);
  });
});

import { calcSalaryBe, scaleTax, specialContribution, childReduction } from '../src/lib/calc/salary-be';
import { be2026 } from '../src/config/tax/be-2026';

describe('Bruto netto (BE 2026)', () => {
  const base = { status: 'bediende' as const, household: 'alleenstaand' as const, children: 0, singleParent: false };
  it('basisschaal en belastingvrije som', () => {
    expect(scaleTax(11170, be2026.brackets)).toBeCloseTo(be2026.taxFreeAllowance.tax, 1);
    expect(scaleTax(16710, be2026.brackets)).toBeCloseTo(4469.93, 1);
    expect(scaleTax(29500, be2026.brackets)).toBeCloseTo(9944.05, 1);
    expect(scaleTax(51050, be2026.brackets)).toBeCloseTo(20320.38, 1);
  });
  it('€ 3.500 bruto, bediende, alleenstaand', () => {
    const r = calcSalaryBe({ ...base, gross: 3500 }, be2026)!;
    expect(r.rsz).toBe(457.45);
    expect(r.workBonus).toBe(0);
    expect(r.professionalCosts).toBe(6070);
    expect(r.withholdingTax).toBeCloseTo(617.41, 1);
    expect(r.specialContribution).toBeCloseTo(24.74, 2);
    expect(r.net).toBeCloseTo(2400.4, 1);
  });
  it('laag loon: werkbonus afgetopt op RSZ (eerst luik B)', () => {
    const r = calcSalaryBe({ ...base, gross: 2200 }, be2026)!;
    expect(r.rsz).toBe(0);
    expect(r.workBonusA).toBe(127.54);
    expect(r.workBonusB).toBe(160);
    expect(r.fiscalWorkBonus).toBeCloseTo(126.33, 2);
    expect(r.withholdingTax).toBeCloseTo(126.28, 1);
    expect(r.net).toBeCloseTo(2063.28, 1);
  });
  it('partner zonder inkomen (huwelijksquotiënt) en 2 kinderen', () => {
    const r = calcSalaryBe({ ...base, gross: 4000, household: 'partner-zonder-inkomen', children: 2 }, be2026)!;
    expect(r.familyReductions).toBe(1656);
    expect(r.withholdingTax).toBeCloseTo(269.18, 1);
    expect(r.specialContribution).toBeCloseTo(34.35, 2);
    expect(r.net).toBeCloseTo(3173.67, 1);
  });
  it('arbeider: RSZ op 108%', () => {
    const r = calcSalaryBe({ ...base, gross: 3500, status: 'arbeider' }, be2026)!;
    expect(r.rsz).toBeCloseTo(3500 * 1.08 * 0.1307, 2);
  });
  it('BBSZ en kinderen', () => {
    expect(specialContribution(1900, 'alleenstaand', be2026)).toBe(0);
    expect(specialContribution(8000, 'alleenstaand', be2026)).toBe(60.94);
    expect(specialContribution(1500, 'partner-met-inkomen', be2026)).toBe(5.15);
    expect(specialContribution(9000, 'partner-met-inkomen', be2026)).toBe(51.64);
    expect(childReduction(9, be2026)).toBe(25860);
    expect(childReduction(10, be2026)).toBe(29724);
  });
  it('bedrijfsvoorheffing wordt nooit negatief', () => {
    const r = calcSalaryBe({ ...base, gross: 2100, children: 4 }, be2026)!;
    expect(r.withholdingTax).toBe(0);
  });
});
