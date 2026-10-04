import { calcCompound } from '../lib/calc/compound';
import { formatEUR, formatEUR0, formatNumber, parseNumber } from '../lib/format';
import { CurrencyInput, NumberInput, PercentageInput } from './ui/fields';
import { Breakdown, EmptyResult, ResultCard } from './ui/ResultCard';
import { ShareResult } from './ui/ShareResult';
import { StackedBars } from './ui/StackedBars';
import { shareUrl, useCalcState, useCompletion } from './ui/hooks';

const NAME = 'rente-op-rente-berekenen';

function compactEUR(v: number) {
  if (v >= 1_000_000) return `€${formatNumber(v / 1_000_000, 1)}M`;
  if (v >= 1_000) return `€${formatNumber(v / 1_000, 0)}k`;
  return `€${formatNumber(v, 0)}`;
}

export default function RenteCalculator() {
  const { state, set, reset, touched } = useCalcState(NAME, { start: '10000', inleg: '250', rendement: '6', jaren: '20' });
  const start = state.start.trim() ? parseNumber(state.start) : 0;
  const monthly = state.inleg.trim() ? parseNumber(state.inleg) : 0;
  const rate = parseNumber(state.rendement);
  const years = parseNumber(state.jaren);
  const result = calcCompound(start, monthly, rate, Math.round(years));
  useCompletion(NAME, touched, !!result, [state.start, state.inleg, state.rendement, state.jaren]);

  const yearsErr = state.jaren.trim() && !(years >= 1 && years <= 100) ? 'Kies een looptijd van 1 tot 100 jaar.' : null;
  const rateErr = state.rendement.trim() && !(rate > -100 && rate <= 100) ? 'Vul een rendement tussen −99 en 100% in.' : null;
  const share = result ? result.totalInterest / result.endValue : 0;

  return (
    <div class="calc">
      <div class="calc-grid">
        <div class="calc-inputs">
          <CurrencyInput id="rr-start" label="Startbedrag" value={state.start} onInput={(v) => set('start', v)} error={!(start >= 0) ? 'Ongeldig bedrag' : null} />
          <CurrencyInput id="rr-inleg" label="Maandelijkse inleg" value={state.inleg} onInput={(v) => set('inleg', v)} error={!(monthly >= 0) ? 'Ongeldig bedrag' : null} />
          <div class="field-row">
            <PercentageInput id="rr-rendement" label="Rendement per jaar" value={state.rendement} onInput={(v) => set('rendement', v)} error={rateErr} />
            <NumberInput id="rr-jaren" label="Looptijd" suffix="jaar" mode="numeric" value={state.jaren} onInput={(v) => set('jaren', v)} error={yearsErr} />
          </div>
          <p class="hint">Inleg aan het einde van elke maand. Geen kosten, belasting of inflatie meegerekend.</p>
        </div>
        <div class="calc-output">
          {result ? (
            <>
              <ResultCard
                label={`Na ${result.rows.length} jaar heb je ongeveer`}
                value={formatEUR0(result.endValue)}
                sub={result.totalInterest >= 0 ? `${formatNumber(share * 100, 0)}% daarvan is rendement.` : 'Je eindbedrag is lager dan je inleg.'}
              />
              <Breakdown
                rows={[
                  { label: 'Totale inleg', value: formatEUR(result.totalContributions) },
                  { label: 'Totaal rendement', value: formatEUR(result.totalInterest) },
                  { label: 'Eindkapitaal', value: formatEUR(result.endValue), variant: 'total' },
                ]}
              />
              <ShareResult
                calculatorName={NAME}
                text={`Rente op rente: ${formatEUR0(start)} start + ${formatEUR0(monthly)} per maand, ${formatNumber(rate, 2)}% per jaar, ${result.rows.length} jaar → eindkapitaal ${formatEUR0(result.endValue)} (inleg ${formatEUR0(result.totalContributions)}, rendement ${formatEUR0(result.totalInterest)}).`}
                url={touched ? shareUrl(state) : undefined}
                onReset={reset}
              />
            </>
          ) : (
            <EmptyResult>Vul een startbedrag of maandelijkse inleg, een rendement en een looptijd in.</EmptyResult>
          )}
        </div>
      </div>
      {result && (
        <div class="calc-section" style={{ display: 'grid', gap: '16px' }}>
          <h3 style={{ fontSize: '1rem' }}>Groei per jaar</h3>
          <StackedBars
            data={result.rows.map((r) => ({ label: String(r.year), a: r.contributions, b: r.interest }))}
            seriesA={{ name: 'Inleg', color: 'var(--accent)' }}
            seriesB={{ name: 'Rendement', color: 'var(--series-2)' }}
            format={formatEUR0}
            formatAxis={compactEUR}
            ariaLabel={`Staafgrafiek van de groei over ${result.rows.length} jaar: eindkapitaal ${formatEUR0(result.endValue)}, waarvan ${formatEUR0(result.totalInterest)} rendement. De tabel hieronder bevat alle waarden.`}
            totalLabel="Totale waarde"
          />
          <div class="data-table-wrap">
            <table class="data-table">
              <caption class="visually-hidden">Ontwikkeling per jaar</caption>
              <thead>
                <tr>
                  <th scope="col">Jaar</th>
                  <th scope="col">Inleg</th>
                  <th scope="col">Rendement</th>
                  <th scope="col">Totale waarde</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((r) => (
                  <tr key={r.year}>
                    <td>{r.year}</td>
                    <td>{formatEUR0(r.contributions)}</td>
                    <td>{formatEUR0(r.interest)}</td>
                    <td>
                      <strong>{formatEUR0(r.value)}</strong>
                    </td>
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
