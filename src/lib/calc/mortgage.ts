export type MortgageType = 'annuitair' | 'lineair';

export interface MortgageYear {
  year: number;
  interest: number;
  principal: number;
  balance: number;
}

/** Annuïteit per maand: L × i / (1 − (1 + i)^−n), met i = jaarrente / 12. */
export function annuityPayment(loan: number, annualRatePercent: number, months: number) {
  const i = annualRatePercent / 100 / 12;
  if (i === 0) return loan / months;
  return (loan * i) / (1 - Math.pow(1 + i, -months));
}

/**
 * Bruto maandlasten van een hypotheek, zonder hypotheekrenteaftrek.
 * Uitbreidingen zoals kosten koper, notariskosten, registratierechten (BE)
 * of maximale hypotheek horen in aparte functies die hier naast komen.
 */
export function calcMortgage(loan: number, annualRatePercent: number, years: number, type: MortgageType) {
  if (!(loan > 0) || !(years >= 1 && years <= 50) || !(annualRatePercent >= 0 && annualRatePercent < 30)) return null;
  const n = Math.round(years * 12);
  const i = annualRatePercent / 100 / 12;
  const annuity = annuityPayment(loan, annualRatePercent, n);
  const linearPrincipal = loan / n;

  let balance = loan;
  let totalInterest = 0;
  let firstPayment = 0;
  let lastPayment = 0;
  let yi = 0;
  let yp = 0;
  const rows: MortgageYear[] = [];
  for (let m = 1; m <= n; m++) {
    const interest = balance * i;
    const principal = Math.min(balance, type === 'annuitair' ? annuity - interest : linearPrincipal);
    const payment = interest + principal;
    balance = Math.max(0, balance - principal);
    totalInterest += interest;
    yi += interest;
    yp += principal;
    if (m === 1) firstPayment = payment;
    lastPayment = payment;
    if (m % 12 === 0 || m === n) {
      rows.push({ year: Math.ceil(m / 12), interest: yi, principal: yp, balance: balance < 0.005 ? 0 : balance });
      yi = 0;
      yp = 0;
    }
  }
  return { monthlyPayment: firstPayment, lastPayment, totalInterest, totalPaid: loan + totalInterest, rows, months: n };
}
