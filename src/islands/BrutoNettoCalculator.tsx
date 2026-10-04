import { useState } from 'preact/hooks';
import { calcSalary } from '../lib/calc/salary';
import { calcSalaryBe, type BeHousehold, type BeStatus } from '../lib/calc/salary-be';
import { taxConfigs, defaultTaxConfig, type BeTaxConfig, type NlTaxConfig } from '../config/tax';
import { formatEUR, formatNumber, parseNumber } from '../lib/format';
import { Checkbox, CurrencyInput, NumberInput, PercentageInput, Segmented, SelectField } from './ui/fields';
import { Breakdown, EmptyResult, ResultCard, Stat } from './ui/ResultCard';
import { ShareResult } from './ui/ShareResult';
import { shareUrl, useCalcState, useCompletion } from './ui/hooks';

const NAME = 'bruto-netto-berekenen';
const pct = (r: number) => `${formatNumber(r * 100, 1)}%`;
const key = (c: { country: string; year: number }) => `${c.country}-${c.year}`;

const DEFAULTS = {
  land: key(defaultTaxConfig),
  bruto: '3500',
  // België
  statuut: 'bediende',
  gezin: 'alleenstaand',
  kinderen: '0',
  alleenstaandeouder: '0',
  // Nederland
  periode: 'maand',
  vakantiegeld: '1',
  vgpct: '8',
  bonus: '',
  dertiende: '0',
  pensioen: '',
  korting: '1',
};
type State = typeof DEFAULTS;

export default function BrutoNettoCalculator() {
  const { state, set, reset, touched } = useCalcState(NAME, DEFAULTS);
  const cfg = taxConfigs.find((c) => key(c) === state.land) ?? defaultTaxConfig;
  useCompletion(NAME, touched, true, [state]);

  return (
    <div class="calc">
      <div class="calc-grid">
        {cfg.country === 'BE' ? (
          <BelgiumForm cfg={cfg} state={state} set={set} reset={reset} touched={touched} />
        ) : (
          <NetherlandsForm cfg={cfg} state={state} set={set} reset={reset} touched={touched} />
        )}
      </div>
    </div>
  );
}

interface FormProps<C> {
  cfg: C;
  state: State;
  set: <K extends keyof State>(k: K, v: State[K]) => void;
  reset: () => void;
  touched: boolean;
}

function CountrySelect({ state, set }: Pick<FormProps<unknown>, 'state' | 'set'>) {
  return (
    <SelectField
      id="bn-land"
      label="Land en jaar"
      value={state.land}
      onChange={(v) => set('land', v)}
      options={taxConfigs.map((c) => ({ value: key(c), label: c.label }))}
    />
  );
}

function BelgiumForm({ cfg, state, set, reset, touched }: FormProps<BeTaxConfig>) {
  const gross = parseNumber(state.bruto);
  const children = Math.max(0, Math.min(15, Math.round(parseNumber(state.kinderen) || 0)));
  const household = (['alleenstaand', 'partner-met-inkomen', 'partner-zonder-inkomen'].includes(state.gezin) ? state.gezin : 'alleenstaand') as BeHousehold;
  const status = (state.statuut === 'arbeider' ? 'arbeider' : 'bediende') as BeStatus;
  const r = calcSalaryBe({ gross, status, household, children, singleParent: state.alleenstaandeouder === '1' }, cfg);
  const grossErr = state.bruto.trim() && !(gross > 0) ? 'Vul een geldig brutobedrag in.' : null;

  const shareText = r
    ? `Bruto-netto (${cfg.label}, ${status}):\nBruto per maand: ${formatEUR(r.gross)}\nRSZ: ${formatEUR(r.rsz)}\nBedrijfsvoorheffing: ${formatEUR(r.withholdingTax)}\nNetto per maand: ${formatEUR(r.net)}`
    : '';

  return (
    <>
      <div class="calc-inputs">
        <CountrySelect state={state} set={set} />
        <CurrencyInput id="bn-bruto" label="Bruto maandloon" value={state.bruto} onInput={(v) => set('bruto', v)} error={grossErr} hint="Voltijds, zoals op je loonbrief of contract." />
        <Segmented
          name="statuut"
          legend="Statuut"
          value={status}
          onChange={(v) => set('statuut', v)}
          options={[
            { value: 'bediende', label: 'Bediende' },
            { value: 'arbeider', label: 'Arbeider' },
          ]}
        />
        <SelectField
          id="bn-gezin"
          label="Gezinssituatie"
          value={household}
          onChange={(v) => set('gezin', v)}
          options={[
            { value: 'alleenstaand', label: 'Alleenstaand' },
            { value: 'partner-met-inkomen', label: 'Gehuwd/samenwonend, partner heeft inkomen' },
            { value: 'partner-zonder-inkomen', label: 'Gehuwd/samenwonend, partner zonder inkomen' },
          ]}
          hint="Wettelijk samenwonenden worden gelijkgesteld met gehuwden."
        />
        <NumberInput id="bn-kinderen" label="Kinderen ten laste" mode="numeric" value={state.kinderen} onInput={(v) => set('kinderen', v)} hint="Een kind met een handicap telt voor twee." />
        {household === 'alleenstaand' && children > 0 && (
          <Checkbox id="bn-ouder" label="Ik ben een alleenstaande ouder" checked={state.alleenstaandeouder === '1'} onChange={(v) => set('alleenstaandeouder', v ? '1' : '0')} />
        )}
      </div>
      <div class="calc-output">
        {r ? (
          <>
            <ResultCard label="Je geschatte netto maandloon is" value={formatEUR(r.net)} sub={`Indicatieve berekening, ${cfg.label}.`} />
            <Breakdown
              label="Van bruto naar netto"
              rows={[
                { label: 'Bruto maandloon', value: formatEUR(r.gross) },
                { label: `RSZ ${formatNumber(cfg.rszRate * 100, 2)}%${status === 'arbeider' ? ' (op 108%)' : ''}`, value: `− ${formatEUR(r.rszGross)}`, variant: 'minus' },
                ...(r.workBonus > 0 ? [{ label: 'Sociale werkbonus', value: `+ ${formatEUR(r.workBonus)}` }] : []),
                { label: 'Belastbaar loon', value: formatEUR(r.taxableMonthly) },
                { label: 'Bedrijfsvoorheffing', value: `− ${formatEUR(r.withholdingTax)}`, variant: 'minus' },
                { label: 'Bijzondere bijdrage soc. zekerheid', value: `− ${formatEUR(r.specialContribution)}`, variant: 'minus' },
                { label: 'Netto per maand', value: formatEUR(r.net), variant: 'total' },
              ]}
            />
            <div class="stat-grid">
              <Stat label="Bruto per jaar (12 maanden)" value={formatEUR(r.annualGross)} />
              <Stat label="Netto per jaar (12 maanden)" value={formatEUR(r.annualNet)} note="Zonder vakantiegeld en eindejaarspremie" />
              <Stat label="Totale inhoudingen" value={pct(r.effectiveRate)} note="van je bruto maandloon" />
              <Stat label="Fiscale werkbonus" value={formatEUR(r.fiscalWorkBonus)} note={r.fiscalWorkBonus > 0 ? 'minder bedrijfsvoorheffing' : 'niet van toepassing'} />
            </div>
            <details class="small">
              <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Berekening bedrijfsvoorheffing (sleutelformule)</summary>
              <div style={{ marginTop: '10px' }}>
                <Breakdown
                  rows={[
                    { label: 'Belastbaar loon × 12', value: formatEUR(r.annualGrossForTax) },
                    { label: 'Forfaitaire beroepskosten', value: `− ${formatEUR(r.professionalCosts)}`, variant: 'minus' },
                    { label: 'Belastbaar netto jaarinkomen', value: formatEUR(r.annualTaxable), variant: 'total' },
                    { label: household === 'partner-zonder-inkomen' ? 'Basisbelasting (met huwelijksquotiënt)' : 'Basisbelasting na belastingvrije som', value: formatEUR(r.baseTax) },
                    ...(r.familyReductions > 0 ? [{ label: 'Vermindering gezinslasten', value: `− ${formatEUR(r.familyReductions)}`, variant: 'minus' as const }] : []),
                    { label: 'Jaarbelasting ÷ 12', value: formatEUR(r.monthlyTaxBeforeBonus) },
                    ...(r.fiscalWorkBonus > 0 ? [{ label: 'Fiscale werkbonus', value: `− ${formatEUR(r.fiscalWorkBonus)}`, variant: 'minus' as const }] : []),
                    { label: 'Bedrijfsvoorheffing per maand', value: formatEUR(r.withholdingTax), variant: 'total' },
                  ]}
                />
              </div>
            </details>
            <ShareResult calculatorName={NAME} text={shareText} url={touched ? shareUrl(state) : undefined} onReset={reset} />
          </>
        ) : (
          <EmptyResult>Vul je bruto maandloon in om je netto loon te berekenen.</EmptyResult>
        )}
      </div>
    </>
  );
}

function NetherlandsForm({ cfg, state, set, reset, touched }: FormProps<NlTaxConfig>) {
  const [showMore, setShowMore] = useState(false);
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
  const grossErr = state.bruto.trim() && !(gross > 0) ? 'Vul een geldig brutobedrag in.' : null;

  const shareText = result
    ? `Bruto-netto indicatie (${cfg.label}):\nBruto per maand: ${formatEUR(result.monthlyGross)}\nNetto per maand: ${formatEUR(result.monthlyNet)}\nNetto per jaar (incl. extra's): ${formatEUR(result.annualNet)}`
    : '';

  return (
    <>
      <div class="calc-inputs">
        <CountrySelect state={state} set={set} />
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
          <EmptyResult>Vul je brutoloon in om je netto inkomen te schatten.</EmptyResult>
        )}
      </div>
    </>
  );
}
