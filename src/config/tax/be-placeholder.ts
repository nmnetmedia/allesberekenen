import type { IncomeTaxConfig } from './types';

/**
 * België — voorbereid maar nog niet actief. De Belgische berekening werkt met
 * RSZ (13,07%), bedrijfsvoorheffing, belastingvrije som en gemeentebelasting en
 * vraagt een eigen rekenmodule. Zet `available` pas op true wanneer die module
 * en gecontroleerde parameters (met bron) zijn toegevoegd.
 */
export const bePlaceholder: IncomeTaxConfig = {
  country: 'BE',
  year: 2026,
  available: false,
  label: 'België (binnenkort)',
  currency: 'EUR',
  brackets: [],
  generalCredit: { max: 0, phaseOutStart: 0, phaseOutRate: 0 },
  labourCredit: [],
  defaults: { holidayAllowanceRate: 0 },
  assumptions: [],
  sources: [],
  checkedOn: '',
};
