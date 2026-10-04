import { calcBmi } from '../lib/calc/bmi';
import { formatNumber, parseNumber } from '../lib/format';
import { NumberInput, Segmented } from './ui/fields';
import { Breakdown, EmptyResult, FormulaInline, Notice, ResultCard } from './ui/ResultCard';
import { ShareResult } from './ui/ShareResult';
import { shareUrl, useCalcState, useCompletion } from './ui/hooks';

const NAME = 'bmi-berekenen';
const SCALE_MIN = 15;
const SCALE_MAX = 40;
const SEGMENTS = [
  { from: 15, to: 18.5, color: '#8fb3e8', label: 'Onder' },
  { from: 18.5, to: 25, color: '#3fb58a', label: 'Gezond' },
  { from: 25, to: 30, color: '#e8b04a', label: 'Over' },
  { from: 30, to: 40, color: '#e07a6c', label: 'Obesitas' },
];
const BADGE: Record<string, string> = { ondergewicht: 'badge-info', gezond: 'badge-good', overgewicht: 'badge-warn', obesitas: 'badge-bad' };

export default function BmiCalculator() {
  const { state, set, reset, touched } = useCalcState(NAME, { gewicht: '70', lengte: '175', leeftijd: '', geslacht: '' });
  const w = parseNumber(state.gewicht);
  const h = parseNumber(state.lengte);
  const age = state.leeftijd.trim() ? parseNumber(state.leeftijd) : undefined;
  const result = calcBmi(w, h, age);
  useCompletion(NAME, touched, !!result, [state.gewicht, state.lengte, state.leeftijd]);

  const wErr = state.gewicht.trim() && !(w >= 2 && w <= 500) ? 'Vul je gewicht in kilogram in, bijvoorbeeld 72,5.' : null;
  const hErr = state.lengte.trim() && !(h >= 50 && h <= 260) ? 'Vul je lengte in centimeters in, bijvoorbeeld 178.' : null;
  const hintHeightInMeters = h > 0 && h < 3 ? 'Het lijkt erop dat je meters invult. Gebruik centimeters, bijvoorbeeld 175.' : null;

  const pos = result ? Math.min(100, Math.max(0, ((result.bmi - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100)) : 0;
  const bmiText = result ? formatNumber(result.bmi, 1, 1) : '';
  const m = h / 100;

  return (
    <div class="calc">
      <div class="calc-grid">
        <div class="calc-inputs">
          <div class="field-row">
            <NumberInput id="bmi-gewicht" label="Gewicht" suffix="kg" value={state.gewicht} onInput={(v) => set('gewicht', v)} error={wErr} />
            <NumberInput id="bmi-lengte" label="Lengte" suffix="cm" value={state.lengte} onInput={(v) => set('lengte', v)} error={hErr || hintHeightInMeters} />
          </div>
          <div class="field-row">
            <NumberInput id="bmi-leeftijd" label="Leeftijd" suffix="jaar" mode="numeric" optional value={state.leeftijd} onInput={(v) => set('leeftijd', v)} />
            <Segmented
              name="geslacht"
              legend="Geslacht (optioneel)"
              value={state.geslacht}
              onChange={(v) => set('geslacht', v)}
              options={[
                { value: 'man', label: 'Man' },
                { value: 'vrouw', label: 'Vrouw' },
              ]}
            />
          </div>
          <p class="hint">Je BMI hangt alleen af van lengte en gewicht. Leeftijd gebruiken we voor het advies bij 70-plussers en kinderen.</p>
        </div>

        <div class="calc-output">
          {result ? (
            <>
              <ResultCard
                label="Je BMI is"
                value={bmiText}
                sub={
                  <span class={`badge ${BADGE[result.category.key]}`}>
                    {result.category.label}
                  </span>
                }
              />
              <div class="scale" aria-hidden="true">
                <div class="scale-marker" style={{ left: `${pos}%` }}>
                  {bmiText}
                </div>
                <div class="scale-bar">
                  {SEGMENTS.map((s) => (
                    <span key={s.label} style={{ width: `${((s.to - s.from) / (SCALE_MAX - SCALE_MIN)) * 100}%`, background: s.color }} />
                  ))}
                </div>
                <div class="scale-legend">
                  {[18.5, 25, 30].map((t) => (
                    <span key={t} style={{ left: `${((t - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100}%` }}>
                      {formatNumber(t, 1)}
                    </span>
                  ))}
                </div>
              </div>
              <Breakdown
                label="Gezond gewicht"
                rows={[
                  { label: 'Gezond gewicht bij jouw lengte', value: `${formatNumber(result.healthyMinKg, 1)} – ${formatNumber(result.healthyMaxKg, 1)} kg` },
                  ...(result.seniorRange
                    ? [{ label: 'Advies voor 70-plussers (BMI 22–28)', value: `${formatNumber(result.seniorRange.minKg, 1)} – ${formatNumber(result.seniorRange.maxKg, 1)} kg` }]
                    : []),
                  ...(result.category.key !== 'gezond'
                    ? [
                        {
                          label: 'Verschil tot gezond bereik',
                          value: `${formatNumber(w < result.healthyMinKg ? result.healthyMinKg - w : w - result.healthyMaxKg, 1)} kg`,
                        },
                      ]
                    : []),
                ]}
              />
              {result.seniorRange && <Notice>{result.seniorRange.label}. Voor 70-plussers geldt een BMI tussen 22 en 28 als gezond.</Notice>}
              {result.isMinor && (
                <Notice kind="warn">
                  Voor kinderen en jongeren onder de 18 gelden andere grenswaarden, afhankelijk van leeftijd en geslacht. Deze uitkomst is voor jou niet goed te beoordelen.
                </Notice>
              )}
              <FormulaInline>{`${formatNumber(w, 1)} ÷ (${formatNumber(m, 2)} × ${formatNumber(m, 2)}) = ${bmiText}`}</FormulaInline>
              <ShareResult
                calculatorName={NAME}
                text={`Mijn BMI: ${bmiText} (${result.category.label}). Gezond gewicht bij mijn lengte: ${formatNumber(result.healthyMinKg, 1)}–${formatNumber(result.healthyMaxKg, 1)} kg.`}
                url={touched ? shareUrl(state) : undefined}
                onReset={reset}
              />
            </>
          ) : (
            <EmptyResult>Vul je gewicht en lengte in om je BMI te berekenen.</EmptyResult>
          )}
        </div>
      </div>
    </div>
  );
}
