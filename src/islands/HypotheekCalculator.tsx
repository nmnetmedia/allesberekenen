import { calcMortgage, type MortgageType } from '../lib/calc/mortgage';
import { formatEUR, formatEUR0, formatNumber, parseNumber } from '../lib/format';
import { CurrencyInput, NumberInput, PercentageInput, Segmented } from './ui/fields';
import { Breakdown, EmptyResult, Notice, ResultCard } from './ui/ResultCard';
import { ShareResult } from './ui/ShareResult';
import { StackedBars } from './ui/StackedBars';
import { shareUrl, useCalcState, useCompletion } from './ui/hooks';

const NAME = 'hypotheek-berekenen';
const compact = (v: number) => (v >= 1000 ? `€${formatNumber(v / 1000, 0)}k` : `€${formatNumber(v, 0)}`);

export default function HypotheekCalculator() {
  // "lening" leeg = automatisch aankoopprijs − eigen inbreng.
  const { state, set, reset, touched } = useCalcState(NAME, { prijs: '400000', inbreng: '40000', lening: '', rente: '4', jaren: '30', vorm: 'annuitair' });
  const price = parseNumber(state.prijs);
  const own = state.inbreng.trim() ? parseNumber(state.inbreng) : 0;
  const autoLoan = Math.max(0, (price || 0) - (own || 0));
  const loan = state.lening.trim() ? parseNumber(state.lening) : autoLoan;
  const rate = parseNumber(state.rente);
  const years = parseNumber(state.jaren);
  const type = (state.vorm === 'lineair' ? 'lineair' : 'annuitair') as MortgageType;
  const result = calcMortgage(loan, rate, Math.round(years), type);
  useCompletion(NAME, touched, !!result, [state]);

  const rateErr = state.rente.trim() && !(rate >= 0 && rate < 30) ? 'Vul een rente tussen 0 en 30% in.' : null;
  const yearsErr = state.jaren.trim() && !(years >= 1 && years <= 50) ? 'Kies 1 tot 50 jaar.' : null;
  const ownErr = own > price ? 'Je eigen inbreng is hoger dan de aankoopprijs.' : null;
  const interestShare = result ? result.totalInterest / result.totalPaid : 0;

  return (
    <div class="calc">
      <div class="calc-grid">
        <div class="calc-inputs">
          <div class="field-row">
            <CurrencyInput id="hy-prijs" label="Aankoopprijs" value={state.prijs} onInput={(v) => set('prijs', v)} />
            <CurrencyInput id="hy-inbreng" label="Eigen inbreng" value={state.inbreng} onInput={(v) => set('inbreng', v)} error={ownErr} />
          </div>
          <CurrencyInput
            id="hy-lening"
            label="Leenbedrag"
            value={state.lening}
            placeholder={formatNumber(autoLoan, 0)}
            onInput={(v) => set('lening', v)}
            hint={state.lening.trim() ? 'Zelf ingevuld. Maak leeg om automatisch te rekenen.' : 'Automatisch: aankoopprijs − eigen inbreng. Je kunt het ook zelf invullen.'}
          />
          <div class="field-row">
            <PercentageInput id="hy-rente" label="Hypotheekrente" value={state.rente} onInput={(v) => set('rente', v)} error={rateErr} />
            <NumberInput id="hy-jaren" label="Looptijd" suffix="jaar" mode="numeric" value={state.jaren} onInput={(v) => set('jaren', v)} error={yearsErr} />
          </div>
          <Segmented
            name="vorm"
            legend="Hypotheekvorm"
            value={type}
            onChange={(v) => set('vorm', v)}
            options={[
              { value: 'annuitair', label: 'Annuïtair' },
              { value: 'lineair', label: 'Lineair' },
            ]}
          />
        </div>
        <div class="calc-output">
          {result ? (
            <>
              <ResultCard
                label={type === 'annuitair' ? 'Je geschatte bruto maandlast is' : 'Je bruto maandlast in de eerste maand is'}
                value={formatEUR(result.monthlyPayment)}
                sub={type === 'lineair' ? `Dalend naar ${formatEUR(result.lastPayment)} in de laatste maand.` : `Elke maand gelijk, ${result.months} maanden lang.`}
              />
              <Breakdown
                rows={[
                  { label: 'Leenbedrag', value: formatEUR0(loan) },
                  { label: 'Totale rente', value: formatEUR0(result.totalInterest) },
                  { label: 'Totaal terugbetaald', value: formatEUR0(result.totalPaid), variant: 'total' },
                ]}
              />
              <div aria-hidden="true">
                <div style={{ display: 'flex', height: '10px', borderRadius: '999px', overflow: 'hidden', gap: '2px' }}>
                  <span style={{ width: `${(1 - interestShare) * 100}%`, background: 'var(--accent)' }} />
                  <span style={{ width: `${interestShare * 100}%`, background: 'var(--series-2)' }} />
                </div>
                <div class="chart-legend" style={{ marginTop: '8px', fontSize: '0.8rem' }}>
                  <span>
                    <i style={{ background: 'var(--accent)' }} /> Aflossing {formatNumber((1 - interestShare) * 100, 0)}%
                  </span>
                  <span>
                    <i style={{ background: 'var(--series-2)' }} /> Rente {formatNumber(interestShare * 100, 0)}%
                  </span>
                </div>
              </div>
              <Notice>Dit is een indicatieve berekening en geen financieel advies. Bruto maandlasten, zonder hypotheekrenteaftrek en kosten koper.</Notice>
              <ShareResult
                calculatorName={NAME}
                text={`Hypotheek ${formatEUR0(loan)}, ${formatNumber(rate, 2)}% rente, ${Math.round(years)} jaar ${type}: ${formatEUR(result.monthlyPayment)} bruto per maand${type === 'lineair' ? ' (eerste maand)' : ''}. Totale rente ${formatEUR0(result.totalInterest)}.`}
                url={touched ? shareUrl(state) : undefined}
                onReset={reset}
              />
            </>
          ) : (
            <EmptyResult>Vul een aankoopprijs of leenbedrag, rente en looptijd in.</EmptyResult>
          )}
        </div>
      </div>
      {result && (
        <div class="calc-section" style={{ display: 'grid', gap: '16px' }}>
          <h3 style={{ fontSize: '1rem' }}>Rente en aflossing per jaar</h3>
          <StackedBars
            data={result.rows.map((r) => ({ label: String(r.year), a: r.principal, b: r.interest }))}
            seriesA={{ name: 'Aflossing', color: 'var(--accent)' }}
            seriesB={{ name: 'Rente', color: 'var(--series-2)' }}
            format={formatEUR0}
            formatAxis={compact}
            totalLabel="Betaald in dit jaar"
            ariaLabel={`Staafgrafiek van rente en aflossing per jaar over ${result.rows.length} jaar. De tabel hieronder bevat alle waarden.`}
          />
          <div class="data-table-wrap">
            <table class="data-table">
              <caption class="visually-hidden">Aflossingsschema per jaar</caption>
              <thead>
                <tr>
                  <th scope="col">Jaar</th>
                  <th scope="col">Rente</th>
                  <th scope="col">Aflossing</th>
                  <th scope="col">Restschuld</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((r) => (
                  <tr key={r.year}>
                    <td>{r.year}</td>
                    <td>{formatEUR0(r.interest)}</td>
                    <td>{formatEUR0(r.principal)}</td>
                    <td>{formatEUR0(r.balance)}</td>
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
