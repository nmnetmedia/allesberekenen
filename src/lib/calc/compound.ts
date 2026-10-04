export interface CompoundYear {
  year: number;
  contributions: number;
  interest: number;
  value: number;
  interestThisYear: number;
}

/**
 * Samengestelde rente met maandelijkse inleg aan het einde van elke maand.
 * Het jaarrendement wordt omgerekend naar een gelijkwaardig maandrendement:
 * (1 + r)^(1/12) − 1. Zonder inleg groeit het startbedrag dan precies met r per jaar.
 */
export function calcCompound(start: number, monthly: number, annualRatePercent: number, years: number) {
  if (!(years >= 1 && years <= 100) || !(start >= 0) || !(monthly >= 0) || !Number.isFinite(annualRatePercent) || annualRatePercent <= -100 || annualRatePercent > 100) return null;
  if (start === 0 && monthly === 0) return null;
  const rm = Math.pow(1 + annualRatePercent / 100, 1 / 12) - 1;
  let value = start;
  let contributions = start;
  const rows: CompoundYear[] = [];
  for (let y = 1; y <= Math.round(years); y++) {
    const startValue = value;
    for (let m = 0; m < 12; m++) {
      value = value * (1 + rm) + monthly;
      contributions += monthly;
    }
    rows.push({
      year: y,
      contributions,
      interest: value - contributions,
      value,
      interestThisYear: value - startValue - monthly * 12,
    });
  }
  const last = rows[rows.length - 1];
  return { rows, totalContributions: last.contributions, totalInterest: last.interest, endValue: last.value, monthlyRate: rm };
}
