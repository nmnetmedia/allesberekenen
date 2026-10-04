import { ACTIVITY_LEVELS, calcCalories, type ActivityKey, type Sex } from '../lib/calc/calories';
import { formatNumber, parseNumber } from '../lib/format';
import { NumberInput, Segmented, SelectField } from './ui/fields';
import { EmptyResult, FormulaInline, Notice, ResultCard, Stat } from './ui/ResultCard';
import { ShareResult } from './ui/ShareResult';
import { shareUrl, useCalcState, useCompletion } from './ui/hooks';

const NAME = 'caloriebehoefte-berekenen';
const kcal = (v: number) => `${formatNumber(Math.round(v), 0)} kcal`;

export default function CalorieCalculator() {
  const { state, set, reset, touched } = useCalcState(NAME, { geslacht: 'vrouw', leeftijd: '35', gewicht: '68', lengte: '170', activiteit: 'licht' });
  const sex = state.geslacht as Sex;
  const age = parseNumber(state.leeftijd);
  const w = parseNumber(state.gewicht);
  const h = parseNumber(state.lengte);
  const result = calcCalories(sex, age, w, h, state.activiteit as ActivityKey);
  useCompletion(NAME, touched, !!result, [state.geslacht, state.leeftijd, state.gewicht, state.lengte, state.activiteit]);

  const ageErr = state.leeftijd.trim() && !(age >= 18 && age <= 100) ? 'Deze calculator is bedoeld voor volwassenen (18–100 jaar).' : null;
  const wErr = state.gewicht.trim() && !(w >= 30 && w <= 350) ? 'Vul een gewicht tussen 30 en 350 kg in.' : null;
  const hErr = state.lengte.trim() && !(h >= 120 && h <= 240) ? 'Vul een lengte tussen 120 en 240 cm in.' : null;
  const level = ACTIVITY_LEVELS.find((l) => l.key === state.activiteit) ?? ACTIVITY_LEVELS[0];
  const maxKcal = result ? Math.max(...result.goals.map((g) => g.kcal)) : 1;

  return (
    <div class="calc">
      <div class="calc-grid">
        <div class="calc-inputs">
          <Segmented
            name="geslacht"
            legend="Geslacht"
            value={state.geslacht}
            onChange={(v) => set('geslacht', v)}
            options={[
              { value: 'vrouw', label: 'Vrouw' },
              { value: 'man', label: 'Man' },
            ]}
          />
          <div class="field-row field-row-3">
            <NumberInput id="cal-leeftijd" label="Leeftijd" suffix="jr" mode="numeric" value={state.leeftijd} onInput={(v) => set('leeftijd', v)} error={ageErr} />
            <NumberInput id="cal-gewicht" label="Gewicht" suffix="kg" value={state.gewicht} onInput={(v) => set('gewicht', v)} error={wErr} />
            <NumberInput id="cal-lengte" label="Lengte" suffix="cm" value={state.lengte} onInput={(v) => set('lengte', v)} error={hErr} />
          </div>
          <SelectField
            id="cal-activiteit"
            label="Activiteitsniveau"
            value={state.activiteit}
            onChange={(v) => set('activiteit', v)}
            options={ACTIVITY_LEVELS.map((l) => ({ value: l.key, label: `${l.label} (×${formatNumber(l.factor, 3)})` }))}
            hint={level.hint}
          />
        </div>
        <div class="calc-output">
          {result ? (
            <>
              <ResultCard label="Om op gewicht te blijven heb je per dag ongeveer nodig" value={kcal(result.tdee)} />
              <div class="stat-grid">
                <Stat label="BMR (ruststofwisseling)" value={kcal(result.bmr)} note="Verbruik in volledige rust" />
                <Stat label="TDEE (totaal verbruik)" value={kcal(result.tdee)} note={`BMR × ${formatNumber(result.factor, 3)}`} />
              </div>
              <div class="breakdown" role="list" aria-label="Calorieën per doel">
                {result.goals.map((g) => (
                  <div class="breakdown-row" role="listitem" key={g.key} style={{ display: 'grid', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                      <span>
                        <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{g.label}</strong>
                        <span class="hint" style={{ display: 'block' }}>
                          {g.note}
                        </span>
                      </span>
                      <strong class="tabular" style={{ color: 'var(--ink)', whiteSpace: 'nowrap' }}>{kcal(g.kcal)}</strong>
                    </div>
                    <div style={{ height: '6px', background: 'var(--bg-muted)', borderRadius: '999px', overflow: 'hidden' }} aria-hidden="true">
                      <div style={{ width: `${(g.kcal / maxKcal) * 100}%`, height: '100%', background: g.belowBmr ? 'var(--warn)' : 'var(--accent)', borderRadius: '999px' }} />
                    </div>
                  </div>
                ))}
              </div>
              {result.goals.some((g) => g.belowBmr) && (
                <Notice kind="warn">Een of meer doelen liggen onder je ruststofwisseling. Eet niet langdurig zo weinig zonder begeleiding van een arts of diëtist.</Notice>
              )}
              <FormulaInline>
                {`10 × ${formatNumber(w, 1)} + 6,25 × ${formatNumber(h, 1)} − 5 × ${formatNumber(age, 0)} ${sex === 'man' ? '+ 5' : '− 161'} = ${formatNumber(result.bmr, 0)} kcal`}
              </FormulaInline>
              <ShareResult
                calculatorName={NAME}
                text={`Mijn geschatte caloriebehoefte: ${kcal(result.tdee)} per dag (BMR ${kcal(result.bmr)}, ${level.label.toLowerCase()}).`}
                url={touched ? shareUrl(state) : undefined}
                onReset={reset}
              />
            </>
          ) : (
            <EmptyResult>Vul je leeftijd, gewicht en lengte in.</EmptyResult>
          )}
        </div>
      </div>
    </div>
  );
}
