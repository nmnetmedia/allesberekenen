import { useEffect, useState } from 'preact/hooks';
import { calcAge } from '../lib/calc/age';
import { parseIsoDate, toIsoDate, todayUTC } from '../lib/dates';
import { formatDate, formatNumber, formatWeekday } from '../lib/format';
import { DateInput } from './ui/fields';
import { EmptyResult, Notice, ResultCard, Stat } from './ui/ResultCard';
import { ShareResult } from './ui/ShareResult';
import { shareUrl, useCalcState, useCompletion } from './ui/hooks';

const NAME = 'leeftijd-berekenen';
const n0 = (v: number) => formatNumber(v, 0);

/** buildDate: datum van de build, zodat server- en eerste client-render gelijk zijn; daarna nemen we "vandaag" van de bezoeker. */
export default function LeeftijdCalculator({ buildDate }: { buildDate: string }) {
  const { state, set, reset, touched } = useCalcState(NAME, { geboren: '1990-05-15', op: '' });
  const [today, setToday] = useState(buildDate);
  useEffect(() => setToday(toIsoDate(todayUTC())), []);

  const birth = parseIsoDate(state.geboren);
  const on = parseIsoDate(state.op || today);
  const result = birth && on ? calcAge(birth, on) : null;
  const beforeBirth = birth && on && on.getTime() < birth.getTime();
  useCompletion(NAME, touched, !!result, [state.geboren, state.op]);

  const isToday = !state.op || state.op === today;
  const shareText = result
    ? `Leeftijd ${isToday ? 'vandaag' : `op ${formatDate(on!)}`}: ${result.years} jaar, ${result.months} maanden en ${result.days} dagen. Dat is ${n0(result.totalDays)} dagen of ${n0(result.totalHours)} uur.`
    : '';

  return (
    <div class="calc">
      <div class="calc-grid">
        <div class="calc-inputs">
          <DateInput id="lt-geboren" label="Geboortedatum" value={state.geboren} onInput={(v) => set('geboren', v)} max={today} />
          <DateInput
            id="lt-op"
            label="Leeftijd berekenen op datum"
            optional
            value={state.op || today}
            onInput={(v) => set('op', v)}
            hint="Laat staan op vandaag, of kies een andere datum in het verleden of de toekomst."
            error={beforeBirth ? 'Deze datum ligt vóór de geboortedatum.' : null}
          />
          {result && (
            <p class="hint">
              Geboren op een <strong>{formatWeekday(birth!)}</strong> ({formatDate(birth!)}).
            </p>
          )}
        </div>
        <div class="calc-output">
          {result ? (
            <>
              <ResultCard
                label={isToday ? 'Je bent' : `Op ${formatDate(on!)} is de leeftijd`}
                value={
                  <>
                    {result.years}
                    <small>jaar</small>
                  </>
                }
                sub={`${result.years} jaar, ${result.months} ${result.months === 1 ? 'maand' : 'maanden'} en ${result.days} ${result.days === 1 ? 'dag' : 'dagen'}`}
              />
              <div class="stat-grid">
                <Stat label="Maanden" value={n0(result.totalMonths)} />
                <Stat label="Weken" value={n0(result.totalWeeks)} note={result.remainderDays ? `+ ${result.remainderDays} ${result.remainderDays === 1 ? 'dag' : 'dagen'}` : undefined} />
                <Stat label="Dagen" value={n0(result.totalDays)} />
                <Stat label="Uren" value={n0(result.totalHours)} />
              </div>
              {result.isBirthday ? (
                <Notice>Gefeliciteerd! {isToday ? 'Vandaag' : 'Op deze datum'} is het je verjaardag: je wordt {result.nextAge} jaar.</Notice>
              ) : (
                <div class="stat-grid">
                  <Stat label="Volgende verjaardag" value={formatDate(result.nextBirthday)} note={`Je wordt ${result.nextAge}, op een ${formatWeekday(result.nextBirthday)}`} />
                  <Stat label="Dagen tot verjaardag" value={n0(result.daysToBirthday)} />
                </div>
              )}
              <ShareResult calculatorName={NAME} text={shareText} url={touched ? shareUrl(state) : undefined} onReset={reset} />
            </>
          ) : (
            <EmptyResult>{beforeBirth ? 'Kies een peildatum na de geboortedatum.' : 'Vul een geboortedatum in.'}</EmptyResult>
          )}
        </div>
      </div>
    </div>
  );
}
