import type { NlTaxConfig } from './types';

/**
 * Nederland, belastingjaar 2026 — personen jonger dan de AOW-leeftijd.
 * Bron: Belastingdienst, "Voorlopige aanslag 2026: gebruikte tarieven en heffingskortingen".
 * Werk deze waarden bij zodra de tarieven voor een nieuw jaar definitief zijn,
 * en pas `checkedOn` aan.
 */
export const nl2026: NlTaxConfig = {
  country: 'NL',
  year: 2026,
  available: true,
  label: 'Nederland 2026',
  currency: 'EUR',
  brackets: [
    { upTo: 38883, rate: 0.3575 },
    { upTo: 78426, rate: 0.3756 },
    { upTo: null, rate: 0.495 },
  ],
  generalCredit: { max: 3115, phaseOutStart: 29736, phaseOutRate: 0.06398 },
  labourCredit: [
    { from: 0, to: 11965, base: 0, rate: 0.08324 },
    { from: 11965, to: 25845, base: 996, rate: 0.31009 },
    { from: 25845, to: 45592, base: 5300, rate: 0.0195 },
    { from: 45592, to: 132920, base: 5685, rate: -0.0651 },
    { from: 132920, to: null, base: 0, rate: 0 },
  ],
  defaults: { holidayAllowanceRate: 0.08 },
  assumptions: [
    'Je bent jonger dan de AOW-leeftijd en woont in Nederland.',
    'Je werkgever past de loonheffingskorting toe (bij één werkgever is dat gebruikelijk).',
    'Er wordt gerekend op jaarbasis met de schijven en heffingskortingen van 2026; de werkelijke inhouding via de loonstrook (witte tabel, bijzonder tarief) kan per maand iets afwijken.',
    'Bijtelling auto, toeslagen, aftrekposten, de 30%-regeling en de inkomensafhankelijke bijdrage Zvw voor zelfstandigen zijn niet meegenomen.',
  ],
  sources: [
    {
      label: 'Belastingdienst – Voorlopige aanslag 2026: gebruikte tarieven en heffingskortingen',
      url: 'https://www.belastingdienst.nl/wps/wcm/connect/nl/voorlopige-aanslag/content/voorlopige-aanslag-tarieven-en-heffingskortingen',
    },
  ],
  checkedOn: '2026-10-04',
};
