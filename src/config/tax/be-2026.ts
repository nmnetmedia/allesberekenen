import type { BeTaxConfig } from './types';

/**
 * België, inkomsten 2026 — werknemers in de privésector, rijksinwoners.
 *
 * Bronnen:
 * - Bedrijfsvoorheffing: FOD Financiën, "Sleutelformule vanaf 1 januari 2026" (BEO-DR/2025-0928).
 *   De basisschaal bevat al de verhoging van 7% voor de aanvullende gemeentebelasting.
 * - Werkbonus: RSZ, administratieve instructies, bedragen vanaf 1 september 2026.
 * - Bijzondere bijdrage sociale zekerheid: RSZ, administratieve instructies.
 *
 * Bij een wijziging (indexering, nieuwe sleutelformule, aangepaste werkbonus): pas de
 * bedragen hier aan, werk `checkedOn` bij en draai `npm test`.
 */
export const be2026: BeTaxConfig = {
  country: 'BE',
  year: 2026,
  available: true,
  label: 'België 2026',
  currency: 'EUR',

  rszRate: 0.1307,
  workerRszBase: 1.08,

  workBonus: {
    bediende: {
      a: { amount: 127.54, full: 2937.93, zero: 3403.62, slope: 0.2739 },
      b: { amount: 171.99, full: 2300.62, zero: 2937.93, slope: 0.2699 },
    },
    arbeider: {
      a: { amount: 137.74, full: 2937.93, zero: 3403.62, slope: 0.2958 },
      b: { amount: 185.75, full: 2300.62, zero: 2937.93, slope: 0.2915 },
    },
  },
  fiscalWorkBonus: { a: 0.3314, b: 0.5254 },

  professionalCosts: { rate: 0.3, max: 6070 },
  brackets: [
    { upTo: 16710, rate: 0.2675 },
    { upTo: 29500, rate: 0.428 },
    { upTo: 51050, rate: 0.4815 },
    { upTo: null, rate: 0.535 },
  ],
  taxFreeAllowance: { amount: 11170, tax: 2987.98 },
  marriageQuotient: { rate: 0.3, max: 13790 },
  childReductions: [0, 624, 1656, 4404, 7620, 11100, 14592, 18120, 21996],
  childReductionExtra: 3864,
  singleParentReduction: 624,

  specialContribution: {
    // Alleenstaanden (individuele aanslag), op het brutomaandloon.
    individual: [
      { from: 1945.38, base: 0, rate: 0.0422 },
      { from: 2190.18, base: 10.33, rate: 0.011 },
      { from: 3737.0, base: 27.35, rate: 0.0338 },
      { from: 4100.0, base: 39.61, rate: 0.011 },
    ],
    individualMax: { from: 6038.82, amount: 60.94 },
    jointWithIncome: { min: 5.15, minFrom: 1095.1, rateFrom: 1945.38, rate: 0.059, stepFrom: 2190.18, stepBase: 14.44, stepRate: 0.011, max: 51.64 },
    jointWithoutIncome: { rateFrom: 1945.38, rate: 0.059, stepFrom: 2190.18, stepBase: 14.44, stepRate: 0.011, max: 60.94 },
  },

  assumptions: [
    'Je werkt voltijds als werknemer in de privésector en woont in België.',
    'De berekening volgt de officiële sleutelformule voor de bedrijfsvoorheffing 2026 en toont het netto loon zoals dat op je maandelijkse loonbrief staat.',
    'Werkbonus volgens de bedragen die gelden vanaf 1 september 2026.',
    'Dubbel vakantiegeld en eindejaarspremie worden anders belast en zitten niet in het netto maandloon; de definitieve belasting volgt via je aangifte personenbelasting.',
    'Groepsverzekering, maaltijdcheques, bedrijfswagen, woon-werkvergoedingen en andere extralegale voordelen zijn niet meegenomen.',
  ],
  sources: [
    {
      label: 'FOD Financiën – Sleutelformule bedrijfsvoorheffing vanaf 1 januari 2026',
      url: 'https://financien.belgium.be/nl/ondernemingen/personeel_en_loon/bedrijfsvoorheffing/berekening',
    },
    {
      label: 'RSZ – Administratieve instructies: werkbonus',
      url: 'https://www.socialsecurity.be/employer/instructions/dmfa/nl/latest/instructions/deductions/workers_reductions/workbonus.html',
    },
    {
      label: 'RSZ – Administratieve instructies: bijzondere bijdrage sociale zekerheid',
      url: 'https://www.socialsecurity.be/employer/instructions/dmfa/nl/latest/instructions/special_contributions/other_specialcontributions/specialsocialsecuritycontribution.html',
    },
  ],
  checkedOn: '2026-10-04',
};
