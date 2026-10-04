import { calcPercentage, type PercentageMode } from '../lib/calc/percentage';
import { formatNumber, parseNumber } from '../lib/format';
import { NumberInput, Segmented } from './ui/fields';
import { EmptyResult, FormulaInline, ResultCard } from './ui/ResultCard';
import { ShareResult } from './ui/ShareResult';
import { shareUrl, useCalcState, useCompletion } from './ui/hooks';

const NAME = 'percentage-berekenen';

interface ModeDef {
  value: PercentageMode;
  tab: string;
  aLabel: string;
  bLabel: string;
  aSuffix?: string;
  defaults: [string, string];
}

const MODES: ModeDef[] = [
  { value: 'deel', tab: 'X% van Y', aLabel: 'Percentage', bLabel: 'van getal', aSuffix: '%', defaults: ['15', '80'] },
  { value: 'aandeel', tab: 'Hoeveel %', aLabel: 'Getal', bLabel: 'is hoeveel procent van', defaults: ['30', '120'] },
  { value: 'stijging', tab: 'Stijging', aLabel: 'Oude waarde', bLabel: 'Nieuwe waarde', defaults: ['80', '100'] },
  { value: 'daling', tab: 'Daling', aLabel: 'Oude waarde', bLabel: 'Nieuwe waarde', defaults: ['100', '80'] },
  { value: 'verschil', tab: 'Verschil', aLabel: 'Getal A', bLabel: 'Getal B', defaults: ['100', '80'] },
  { value: 'korting', tab: 'Korting', aLabel: 'Korting', bLabel: 'Oorspronkelijke prijs', aSuffix: '%', defaults: ['25', '80'] },
];

const n = (v: number, d = 4) => formatNumber(v, d);

export default function PercentageCalculator() {
  const { state, set, reset, touched } = useCalcState(NAME, { modus: 'deel', a: '15', b: '80' });
  const mode = MODES.find((m) => m.value === state.modus) ?? MODES[0];
  const a = parseNumber(state.a);
  const b = parseNumber(state.b);
  const filled = state.a.trim() !== '' && state.b.trim() !== '';
  const result = filled ? calcPercentage(mode.value, a, b) : null;
  useCompletion(NAME, touched, !!result, [state.modus, state.a, state.b]);

  const switchMode = (m: PercentageMode) => {
    const def = MODES.find((x) => x.value === m)!;
    set('modus', m);
    set('a', def.defaults[0]);
    set('b', def.defaults[1]);
  };

  let label = '';
  let value = '';
  let sub = '';
  let formula = '';
  if (result) {
    const r = result.value;
    switch (mode.value) {
      case 'deel':
        label = `${n(a)}% van ${n(b)} is`;
        value = n(r);
        formula = `${n(b)} × ${n(a)} ÷ 100 = ${n(r)}`;
        break;
      case 'aandeel':
        label = `${n(a)} is van ${n(b)}`;
        value = `${n(r, 2)}%`;
        formula = `${n(a)} ÷ ${n(b)} × 100 = ${n(r)}%`;
        break;
      case 'stijging':
        label = r >= 0 ? `Van ${n(a)} naar ${n(b)} is een stijging van` : `Van ${n(a)} naar ${n(b)} is een daling van`;
        value = `${n(Math.abs(r), 2)}%`;
        sub = `Absoluut verschil: ${n(result.secondary!)}`;
        formula = `(${n(b)} − ${n(a)}) ÷ ${n(a)} × 100 = ${n(r)}%`;
        break;
      case 'daling':
        label = r >= 0 ? `Van ${n(a)} naar ${n(b)} is een daling van` : `Van ${n(a)} naar ${n(b)} is een stijging van`;
        value = `${n(Math.abs(r), 2)}%`;
        sub = `Absoluut verschil: ${n(result.secondary!)}`;
        formula = `(${n(a)} − ${n(b)}) ÷ ${n(a)} × 100 = ${n(r)}%`;
        break;
      case 'verschil':
        label = `Het procentuele verschil tussen ${n(a)} en ${n(b)} is`;
        value = `${n(r, 2)}%`;
        sub = `Absoluut verschil ${n(result.secondary!)}, gemiddelde ${n((a + b) / 2)}`;
        formula = `|${n(a)} − ${n(b)}| ÷ ((${n(a)} + ${n(b)}) ÷ 2) × 100 = ${n(r)}%`;
        break;
      case 'korting':
        label = `Prijs na ${n(a)}% korting`;
        value = n(r, 2);
        sub = `Je bespaart ${n(result.secondary!, 2)}`;
        formula = `${n(b)} × (1 − ${n(a)} ÷ 100) = ${n(r)}`;
        break;
    }
  }

  return (
    <div class="calc">
      <div class="calc-inputs" style={{ paddingBottom: 0 }}>
        <Segmented name="modus" legend="Wat wil je berekenen?" value={mode.value} onChange={switchMode} options={MODES.map((m) => ({ value: m.value, label: m.tab }))} tabs />
      </div>
      <div class="calc-grid">
        <div class="calc-inputs">
          <div class="field-row">
            <NumberInput id="pct-a" label={mode.aLabel} value={state.a} onInput={(v) => set('a', v)} suffix={mode.aSuffix} error={state.a.trim() !== '' && !Number.isFinite(a) ? 'Ongeldig getal' : null} />
            <NumberInput id="pct-b" label={mode.bLabel} value={state.b} onInput={(v) => set('b', v)} error={state.b.trim() !== '' && !Number.isFinite(b) ? 'Ongeldig getal' : null} />
          </div>
          <p class="hint">Komma of punt als decimaalteken werkt allebei.</p>
        </div>
        <div class="calc-output">
          {result ? (
            <>
              <ResultCard label={label} value={value} sub={sub || undefined} />
              <FormulaInline>{formula}</FormulaInline>
              <ShareResult calculatorName={NAME} text={`${label} ${value}\n${formula}`} url={touched ? shareUrl(state) : undefined} onReset={reset} />
            </>
          ) : (
            <EmptyResult>{filled ? 'Met deze getallen is geen percentage te berekenen (delen door nul).' : 'Vul beide velden in.'}</EmptyResult>
          )}
        </div>
      </div>
    </div>
  );
}
