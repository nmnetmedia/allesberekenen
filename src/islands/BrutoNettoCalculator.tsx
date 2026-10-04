import { useState } from 'preact/hooks';
import { calcSalary } from '../lib/calc/salary';
import { taxConfigs, defaultTaxConfig } from '../config/tax';
import { formatEUR, formatNumber, parseNumber } from '../lib/format';
import { Checkbox, CurrencyInput, PercentageInput, Segmented, SelectField } from './ui/fields';
import { Breakdown, EmptyResult, Notice, ResultCard, Stat } from './ui/ResultCard';
import { ShareResult } from './ui/ShareResult';
import { shareUrl, useCalcState, useCompletion } from './ui/hooks';

const NAME = 'bruto-netto-berekenen';
const pct = (r: number) => `${formatNumber(r * 100, 1)}%`;

export default function BrutoNettoCalculator() {
  const { state, set, reset, touched } = useCalcState(NAME, {
    land: `${defaultTaxConfig.country}-${defaultTaxConfig.year}`,
    bruto: '3500',
    periode: 'maand',
    vakantiegeld: '1',
    vgpct: '8',
    bonus: '',
    dertiende: '0',
    pensioen: '',
    korting: '1',
  });
  const [showMore, setShowMore] = useState(false);
  const cfg = taxConfigs.find((c) => `${c.country}-${c.year}` === state.land) ?? defaultTaxConfig;

  const gross = parseNumber(state.bruto);
  const result = calcSalary(
    {
      gross,
      period: state.periode === 'jaar' ? 'jaar' : 'maand',
      holidayIncluded: state.vakantiegeld === '1',
      holidayRate: (parseNumber(state.vgpct) || 0) / 100,
      bonus: parseNumber(state.bonus) || 0,
      thirteenthMonth: state.dertiende === '1',
      pensionRate: (parseNumber(state.pensioen) || 0) / 100,
      applyCredits: state.korting === '1',
    },
    cfg,
  );
  useCompletion(NAME, touched, !!result, [state]);
  const grossErr = state.bruto.trim() && !(gross > 0) ? 'Vul een geldig brutobedrag in.' : null;

  const shareText = result
    ? `Bruto-netto indicatie (${cfg.label}):\nBruto per maand: ${formatEUR(result.monthlyGross)}\nNetto per maand: ${formatEUR(result.monthlyNet)}\nNetto per jaar (incl. extra's): ${formatEUR(result.annualNet)}`
    : '';

  return (
    <div class="calc">
      <div class="calc-grid">
        <div class="calc-inputs">
          <SelectField
            id="bn-land"
            label="Land en belastingjaar"
            value={state.land}
            onChange={(v) => set('land', v)}
            options={taxConfigs.map((c) => ({ value: `${c.country}-${c.year}`, label: c.label }))}
          />
          {cfg.available ? (
            <>
              <Segmented
                name="periode"
                legend="Brutoloon per"
                value={state.periode}
                onChange={(v) => set('periode', v)}
                options={[
                  { value: 'maand', label: 'Maand' },
                  { value: 'jaar', label: 'Jaar' },
                ]}
              />
              <CurrencyInput
                id="bn-bruto"
                label={state.periode === 'jaar' ? 'Bruto jaarsalaris (zonder vakantiegeld)' : 'Bruto maandsalaris'}
                value={state.bruto}
                onInput={(v) => set('bruto', v)}
                error={grossErr}
              />
              <Checkbox id="bn-vg" label="Ik krijg vakantiegeld" checked={state.vakantiegeld === '1'} onChange={(v) => set('vakantiegeld', v ? '1' : '0')} />
              <button type="button" class="btn btn-ghost btn-sm" style={{ justifySelf: 'start', paddingLeft: 0 }} aria-expanded={showMore} onClick={() => setShowMore((s) => !s)}>
                {showMore ? '− Minder instellingen' : '+ Meer instellingen (bonus, pensioen, 13e maand)'}
              </button>
              {showMore && (
                <>
                  <div class="field-row">
                    <PercentageInput id="bn-vgpct" label="Vakantiegeld" value={state.vgpct} onInput={(v) => set('vgpct', v)} hint="Meestal 8%" />
                    <PercentageInput id="bn-pensioen" label="Pensioenpremie" optional value={state.pensioen} onInput={(v) => set('pensioen', v)} hint="Jouw deel, zie loonstrook" />
                  </div>
                  <CurrencyInput id="bn-bonus" label="Bonus per jaar" optional value={state.bonus} onInput={(v) => set('bonus', v)} />
                  <Checkbox id="bn-13" label="Dertiende maand" checked={state.dertiende === '1'} onChange={(v) => set('dertiende', v ? '1' : '0')} />
                  <Checkbox id="bn-korting" label="Loonheffingskorting toepassen (hoofdbaan)" checked={state.korting === '1'} onChange={(v) => set('korting', v ? '1' : '0')} />
                </>
              )}
            </>
          ) : (
            <Notice>De berekening voor {cfg.label.replace(' (binnenkort)', '')} is in voorbereiding. Kies voorlopig Nederland.</Notice>
          )}
        </div>
        <div class="calc-output">
          {result ? (
            <>
              <ResultCard label="Je geschatte netto maandloon is" value={formatEUR(result.monthlyNet)} sub={`Indicatieve berekening, ${cfg.label}.`} />
              <Breakdown
                label="Per maand"
                rows={[
                  { label: 'Bruto per maand', value: formatEUR(result.monthlyGross) },
                  ...(result.monthlyPension > 0 ? [{ label: 'Pensioenpremie', value: `− ${formatEUR(result.monthlyPension)}`, variant: 'minus' as const }] : []),
                  { label: 'Geschatte loonheffing', value: `− ${formatEUR(result.monthlyTax)}`, variant: 'minus' },
                  { label: 'Geschat netto per maand', value: formatEUR(result.monthlyNet), variant: 'total' },
                ]}
              />
              <div class="stat-grid">
                <Stat label="Bruto per jaar" value={formatEUR(result.annualGross)} note={result.extrasGross > 0 ? `incl. ${formatEUR(result.extrasGross)} extra's` : undefined} />
                <Stat label="Netto per jaar" value={formatEUR(result.annualNet)} note={result.extrasNet > 0 ? `waarvan ${formatEUR(result.extrasNet)} uit extra's` : undefined} />
                <Stat label="Gemiddelde belastingdruk" value={pct(result.effectiveRate)} />
                <Stat label="Marginaal tarief" value={pct(result.marginalRate)} note="Over je volgende euro" />
              </div>
              <details class="small">
                <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Berekening op jaarbasis</summary>
                <div style={{ marginTop: '10px' }}>
                  <Breakdown
                    rows={[
                      { label: 'Vast loon (12 maanden)', value: formatEUR(result.annualRegularGross) },
                      ...(result.holidayAllowance ? [{ label: 'Vakantiegeld', value: formatEUR(result.holidayAllowance) }] : []),
                      ...(result.thirteenth ? [{ label: 'Dertiende maand', value: formatEUR(result.thirteenth) }] : []),
                      ...(result.bonus ? [{ label: 'Bonus', value: formatEUR(result.bonus) }] : []),
                      ...(result.pension ? [{ label: 'Pensioenpremie', value: `− ${formatEUR(result.pension)}`, variant: 'minus' as const }] : []),
                      { label: 'Belastbaar inkomen', value: formatEUR(result.taxable), variant: 'total' },
                      { label: 'Loonheffing vóór kortingen', value: formatEUR(result.taxGross) },
                      { label: 'Algemene heffingskorting', value: `− ${formatEUR(result.generalCredit)}`, variant: 'minus' },
                      { label: 'Arbeidskorting', value: `− ${formatEUR(result.labourCredit)}`, variant: 'minus' },
                      { label: 'Loonheffing per jaar', value: formatEUR(result.annualTax), variant: 'total' },
                    ]}
                  />
                </div>
              </details>
              <ShareResult calculatorName={NAME} text={shareText} url={touched ? shareUrl(state) : undefined} onReset={reset} />
            </>
          ) : (
            <EmptyResult>{cfg.available ? 'Vul je brutoloon in om je netto inkomen te schatten.' : 'Nog niet beschikbaar voor dit land.'}</EmptyResult>
          )}
        </div>
      </div>
    </div>
  );
}
