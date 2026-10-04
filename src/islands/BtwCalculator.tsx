import { calcBtw, type BtwDirection } from '../lib/calc/btw';
import { formatEUR, formatNumber, parseNumber } from '../lib/format';
import { CurrencyInput, PercentageInput, Segmented } from './ui/fields';
import { Breakdown, EmptyResult, FormulaInline, ResultCard } from './ui/ResultCard';
import { ShareResult } from './ui/ShareResult';
import { shareUrl, useCalcState, useCompletion } from './ui/hooks';

const NAME = 'btw-berekenen';

export default function BtwCalculator() {
  const { state, set, reset, touched } = useCalcState(NAME, { bedrag: '100', richting: 'excl', tarief: '21', eigen: '' });
  const direction: BtwDirection = state.richting === 'incl' ? 'incl-to-excl' : 'excl-to-incl';
  const amount = parseNumber(state.bedrag);
  const rate = state.tarief === 'eigen' ? parseNumber(state.eigen) : Number(state.tarief);
  const result = state.bedrag.trim() === '' ? null : calcBtw(amount, rate, direction);
  const amountError = state.bedrag.trim() !== '' && !Number.isFinite(amount) ? 'Vul een geldig bedrag in, bijvoorbeeld 125,50.' : null;
  const rateError = state.tarief === 'eigen' && state.eigen.trim() !== '' && !(rate >= 0 && rate <= 100) ? 'Vul een percentage tussen 0 en 100 in.' : null;
  useCompletion(NAME, touched, !!result, [state.bedrag, state.tarief, state.richting, state.eigen]);

  const factor = 1 + rate / 100;
  const rateLabel = `${formatNumber(rate, 2)}%`;
  const toIncl = direction === 'excl-to-incl';

  const shareText = result
    ? `BTW berekend (${rateLabel}):\nExclusief BTW: ${formatEUR(result.excl)}\nBTW: ${formatEUR(result.vat)}\nInclusief BTW: ${formatEUR(result.incl)}`
    : '';

  return (
    <div class="calc">
      <div class="calc-grid">
        <div class="calc-inputs">
          <Segmented
            name="richting"
            legend="Wat wil je berekenen?"
            value={state.richting}
            onChange={(v) => set('richting', v)}
            options={[
              { value: 'excl', label: 'Exclusief → inclusief' },
              { value: 'incl', label: 'Inclusief → exclusief' },
            ]}
          />
          <CurrencyInput
            id="btw-bedrag"
            label={toIncl ? 'Bedrag exclusief BTW' : 'Bedrag inclusief BTW'}
            value={state.bedrag}
            onInput={(v) => set('bedrag', v)}
            placeholder="0,00"
            error={amountError}
          />
          <Segmented
            name="tarief"
            legend="BTW-tarief"
            value={state.tarief}
            onChange={(v) => set('tarief', v)}
            options={[
              { value: '21', label: '21%' },
              { value: '9', label: '9%' },
              { value: '0', label: '0%' },
              { value: 'eigen', label: 'Eigen tarief' },
            ]}
          />
          {state.tarief === 'eigen' && (
            <PercentageInput id="btw-eigen" label="Eigen BTW-percentage" value={state.eigen} onInput={(v) => set('eigen', v)} placeholder="bijv. 6" hint="Bijvoorbeeld 6 of 12 voor België." error={rateError} />
          )}
        </div>

        <div class="calc-output">
          {result ? (
            <>
              <ResultCard
                label={toIncl ? 'Je bedrag inclusief BTW is' : 'Je bedrag exclusief BTW is'}
                value={formatEUR(toIncl ? result.incl : result.excl)}
                sub={`Waarvan ${formatEUR(result.vat)} BTW (${rateLabel}).`}
              />
              <Breakdown
                label="Overzicht"
                rows={[
                  { label: 'Exclusief BTW', value: formatEUR(result.excl) },
                  { label: `BTW ${rateLabel}`, value: formatEUR(result.vat) },
                  { label: 'Inclusief BTW', value: formatEUR(result.incl), variant: 'total' },
                ]}
              />
              <FormulaInline>
                {toIncl
                  ? `${formatEUR(result.excl)} × ${formatNumber(factor, 4)} = ${formatEUR(result.incl)}`
                  : `${formatEUR(result.incl)} ÷ ${formatNumber(factor, 4)} = ${formatEUR(result.excl)}`}
              </FormulaInline>
              <ShareResult calculatorName={NAME} text={shareText} url={touched ? shareUrl(state) : undefined} onReset={reset} />
            </>
          ) : (
            <EmptyResult>Vul een bedrag en tarief in om de BTW te berekenen.</EmptyResult>
          )}
        </div>
      </div>
    </div>
  );
}
