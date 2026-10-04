import { useEffect, useState } from 'preact/hooks';
import { calcOvulation, type CycleEstimate } from '../lib/calc/ovulation';
import { addDays, daysInMonth, diffDays, parseIsoDate, toIsoDate, todayUTC } from '../lib/dates';
import { formatDate, formatDateShort, parseNumber } from '../lib/format';
import { DateInput, NumberInput } from './ui/fields';
import { Breakdown, EmptyResult, Notice, ResultCard } from './ui/ResultCard';
import { ShareResult } from './ui/ShareResult';
import { useCalcState, useCompletion } from './ui/hooks';

const NAME = 'ovulatie-berekenen';
const DOW = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];
const monthFmt = new Intl.DateTimeFormat('nl-NL', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const dayFmt = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', timeZone: 'UTC' });
const range = (a: Date, b: Date) => `${dayFmt.format(a)} t/m ${dayFmt.format(b)}`;

type DayKind = 'period' | 'fertile' | 'ovulation' | '';

function classify(d: Date, cycles: CycleEstimate[], periodLength: number): DayKind {
  const t = d.getTime();
  for (const c of cycles) {
    if (t === c.ovulation.getTime()) return 'ovulation';
    if (t >= c.fertileStart.getTime() && t <= c.fertileEnd.getTime()) return 'fertile';
    if (t >= c.periodStart.getTime() && t <= c.periodEnd.getTime()) return 'period';
  }
  const last = cycles[cycles.length - 1];
  if (t >= last.nextPeriod.getTime() && t <= addDays(last.nextPeriod, periodLength - 1).getTime()) return 'period';
  return '';
}

function Month({ year, month, cycles, periodLength, today }: { year: number; month: number; cycles: CycleEstimate[]; periodLength: number; today: string }) {
  const first = new Date(Date.UTC(year, month, 1));
  const offset = (first.getUTCDay() + 6) % 7; // maandag = 0
  const days = daysInMonth(year, month);
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(<span key={`e${i}`} />);
  for (let d = 1; d <= days; d++) {
    const date = new Date(Date.UTC(year, month, d));
    const kind = classify(date, cycles, periodLength);
    const isToday = toIsoDate(date) === today;
    const title = kind === 'ovulation' ? 'Geschatte eisprong' : kind === 'fertile' ? 'Vruchtbaar' : kind === 'period' ? 'Menstruatie (verwacht)' : undefined;
    cells.push(
      <span key={d} class={`cal-day${kind ? ` ${kind}` : ''}${isToday ? ' today' : ''}`} title={title}>
        {d}
      </span>,
    );
  }
  return (
    <div class="cal">
      <div class="cal-title">{monthFmt.format(first)}</div>
      <div class="cal-grid">
        {DOW.map((d) => (
          <span class="cal-dow" key={d}>
            {d}
          </span>
        ))}
        {cells}
      </div>
    </div>
  );
}

export default function OvulatieCalculator({ buildDate }: { buildDate: string }) {
  const defaultLmp = (base: string) => toIsoDate(addDays(parseIsoDate(base)!, -10));
  const { state, set, patch, reset, touched } = useCalcState(NAME, { laatste: defaultLmp(buildDate), cyclus: '28', duur: '5' });
  const [today, setToday] = useState(buildDate);
  useEffect(() => {
    const t = toIsoDate(todayUTC());
    setToday(t);
    // Zonder eigen invoer: toon een voorbeeld rond de huidige datum van de bezoeker.
    if (!new URLSearchParams(location.search).has('laatste') && t !== buildDate) patch({ laatste: defaultLmp(t) });
  }, []);

  const lmp = parseIsoDate(state.laatste);
  const cycle = parseNumber(state.cyclus);
  const dur = parseNumber(state.duur);
  const cycles = lmp ? calcOvulation(lmp, Math.round(cycle), Math.round(dur) || 5, 3) : null;
  useCompletion(NAME, touched, !!cycles, [state.laatste, state.cyclus, state.duur]);

  const cycleErr = state.cyclus.trim() && !(cycle >= 21 && cycle <= 45) ? 'Vul een cyclusduur tussen 21 en 45 dagen in.' : null;
  const durErr = state.duur.trim() && !(dur >= 1 && dur <= 10) ? 'Tussen 1 en 10 dagen.' : null;

  let months: { year: number; month: number }[] = [];
  if (cycles) {
    const start = cycles[0].periodStart;
    const end = cycles[1].fertileEnd;
    let y = start.getUTCFullYear();
    let m = start.getUTCMonth();
    while ((y < end.getUTCFullYear() || (y === end.getUTCFullYear() && m <= end.getUTCMonth())) && months.length < 4) {
      months.push({ year: y, month: m });
      m++;
      if (m > 11) {
        m = 0;
        y++;
      }
    }
  }

  const c0 = cycles?.[0];
  const todayDate = parseIsoDate(today)!;
  const upcoming = cycles?.find((c) => c.fertileEnd.getTime() >= todayDate.getTime()) ?? c0;
  const daysUntilOv = upcoming ? diffDays(todayDate, upcoming.ovulation) : 0;

  return (
    <div class="calc">
      <div class="calc-grid">
        <div class="calc-inputs">
          <DateInput id="ov-laatste" label="Eerste dag van je laatste menstruatie" value={state.laatste} onInput={(v) => set('laatste', v)} />
          <div class="field-row">
            <NumberInput id="ov-cyclus" label="Cyclusduur" suffix="dagen" mode="numeric" value={state.cyclus} onInput={(v) => set('cyclus', v)} error={cycleErr} hint="Meestal 21–35 dagen" />
            <NumberInput id="ov-duur" label="Duur menstruatie" suffix="dagen" mode="numeric" value={state.duur} onInput={(v) => set('duur', v)} error={durErr} />
          </div>
        </div>
        <div class="calc-output">
          {cycles && c0 && upcoming ? (
            <>
              <ResultCard
                label="Je geschatte eisprong"
                value={formatDateShort(upcoming.ovulation)}
                sub={
                  daysUntilOv > 0
                    ? `Over ${daysUntilOv} ${daysUntilOv === 1 ? 'dag' : 'dagen'}.`
                    : daysUntilOv === 0
                      ? 'Vandaag.'
                      : `${-daysUntilOv} ${daysUntilOv === -1 ? 'dag' : 'dagen'} geleden.`
                }
              />
              <Breakdown
                rows={[
                  { label: 'Vruchtbare periode', value: range(upcoming.fertileStart, upcoming.fertileEnd) },
                  { label: 'Meest vruchtbaar', value: range(addDays(upcoming.ovulation, -2), upcoming.ovulation) },
                  { label: 'Volgende menstruatie', value: formatDate(upcoming.nextPeriod), variant: 'total' },
                ]}
              />
              <Notice kind="warn">
                Dit is een schatting op basis van de kalendermethode. Gebruik deze berekening <strong>niet als anticonceptie</strong>. Het is geen medische diagnose.
              </Notice>
              <ShareResult
                calculatorName={NAME}
                text={`Mijn geschatte eisprong: ${formatDate(upcoming.ovulation)}. Vruchtbare periode: ${range(upcoming.fertileStart, upcoming.fertileEnd)}. Volgende menstruatie: ${formatDate(upcoming.nextPeriod)}. (Schatting, geen anticonceptie.)`}
                onReset={reset}
              />
            </>
          ) : (
            <EmptyResult>Vul de eerste dag van je laatste menstruatie en je cyclusduur in.</EmptyResult>
          )}
        </div>
      </div>
      {cycles && (
        <div class="calc-section" style={{ display: 'grid', gap: '14px' }}>
          <h2 style={{ fontSize: '1rem' }}>Kalender</h2>
          <div class="cal-legend" aria-hidden="true">
            <span>
              <i style={{ background: '#fde8ec' }} /> Menstruatie
            </span>
            <span>
              <i style={{ background: 'var(--good-soft)' }} /> Vruchtbaar
            </span>
            <span>
              <i style={{ background: 'var(--good)' }} /> Eisprong
            </span>
          </div>
          <div class="cal-months">
            {months.map((m) => (
              <Month key={`${m.year}-${m.month}`} {...m} cycles={cycles} periodLength={Math.round(dur) || 5} today={today} />
            ))}
          </div>
          <div class="data-table-wrap">
            <table class="data-table">
              <caption class="visually-hidden">Schatting per cyclus</caption>
              <thead>
                <tr>
                  <th scope="col">Cyclus</th>
                  <th scope="col">Vruchtbaar</th>
                  <th scope="col">Eisprong</th>
                  <th scope="col">Menstruatie</th>
                </tr>
              </thead>
              <tbody>
                {cycles.map((c, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{range(c.fertileStart, c.fertileEnd)}</td>
                    <td>{dayFmt.format(c.ovulation)}</td>
                    <td>{dayFmt.format(c.nextPeriod)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
