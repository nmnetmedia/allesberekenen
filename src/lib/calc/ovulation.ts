import { addDays } from '../dates';

export interface CycleEstimate {
  periodStart: Date;
  periodEnd: Date;
  fertileStart: Date;
  ovulation: Date;
  fertileEnd: Date;
  nextPeriod: Date;
}

/**
 * Kalendermethode: de eisprong valt gemiddeld 14 dagen vóór de volgende
 * menstruatie (de luteale fase is relatief constant). De vruchtbare periode
 * loopt van 5 dagen vóór tot en met 1 dag na de geschatte eisprong.
 */
export function calcOvulation(lastPeriod: Date, cycleLength: number, periodLength = 5, cycles = 3): CycleEstimate[] | null {
  if (!(cycleLength >= 21 && cycleLength <= 45) || !(periodLength >= 1 && periodLength <= 10)) return null;
  const list: CycleEstimate[] = [];
  for (let i = 0; i < cycles; i++) {
    const start = addDays(lastPeriod, i * cycleLength);
    const nextPeriod = addDays(start, cycleLength);
    const ovulation = addDays(nextPeriod, -14);
    list.push({
      periodStart: start,
      periodEnd: addDays(start, periodLength - 1),
      fertileStart: addDays(ovulation, -5),
      ovulation,
      fertileEnd: addDays(ovulation, 1),
      nextPeriod,
    });
  }
  return list;
}
