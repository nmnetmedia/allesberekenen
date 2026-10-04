import type { CalculatorContent } from '../types';

export const rente: CalculatorContent = {
  slug: 'rente-op-rente-berekenen',
  name: 'Rente op rente berekenen',
  shortName: 'Rente op rente',
  category: 'geld',
  icon: 'trendingUp',
  description: 'Zie hoe je spaargeld of belegging groeit door samengestelde rente, met grafiek en tabel per jaar.',
  keywords: ['rente op rente', 'samengestelde rente', 'rente berekenen', 'rendement', 'sparen', 'beleggen', 'vermogen', 'eindkapitaal', 'compound interest', 'maandelijkse inleg', 'spaarrente'],
  seoTitle: 'Rente op rente berekenen – Samengestelde rente calculator',
  metaDescription:
    'Bereken hoe je vermogen groeit met rente op rente. Vul je startbedrag, maandelijkse inleg, rendement en looptijd in en zie je eindkapitaal, grafiek en tabel per jaar.',
  h1: 'Rente op rente berekenen',
  lead: 'Vul je startbedrag, maandelijkse inleg, verwacht rendement en looptijd in en zie hoe je vermogen jaar na jaar groeit.',
  intro: `
<p>Rente op rente, ook wel samengestelde rente, is het effect dat je niet alleen rendement krijgt over je inleg, maar ook over het rendement dat je eerder al hebt ontvangen. In het begin lijkt dat weinig uit te maken. Na tien, twintig of dertig jaar wordt het verschil echter enorm.</p>
<p>Met deze calculator zie je precies hoe dat werkt. Vul een startbedrag in, een vast bedrag dat je elke maand inlegt, het verwachte jaarrendement en de looptijd. Je ziet direct je totale inleg, het totale rendement en je eindkapitaal. Een grafiek en een tabel per jaar maken zichtbaar hoe het rendement steeds harder gaat meetellen.</p>
<p>De calculator werkt voor sparen en voor beleggen. Bedenk wel dat beleggingsrendementen niet vastliggen: de uitkomst is een rekenvoorbeeld bij een gelijkmatig rendement en geen voorspelling.</p>`,
  howTo: {
    id: 'hoe-werkt-rente-op-rente',
    title: 'Hoe bereken je rente op rente?',
    html: `
<p>Zonder maandelijkse inleg is de formule eenvoudig: <strong>eindbedrag = startbedrag × (1 + r)<sup>n</sup></strong>, waarbij r het rendement per jaar is (als decimaal) en n het aantal jaren.</p>
<p>€ 10.000 tegen 7% per jaar groeit in tien jaar tot € 10.000 × 1,07<sup>10</sup> = € 19.671,51. Je verdient dus € 9.671,51, terwijl 7% van € 10.000 maal tien jaar maar € 7.000 zou zijn. Dat verschil van ruim € 2.600 is de rente op rente.</p>
<p>Leg je elke maand iets in, dan rekenen we per maand. Het jaarrendement wordt omgerekend naar een gelijkwaardig maandrendement, waarna elke maand eerst het rendement wordt bijgeschreven en daarna je inleg wordt toegevoegd.</p>`,
  },
  formula: {
    title: 'Samengestelde rente',
    lines: [
      'Maandrendement = (1 + jaarrendement)^(1/12) − 1',
      'Waarde na een maand = waarde × (1 + maandrendement) + maandinleg',
      'Zonder inleg: eindbedrag = start × (1 + r)^jaren',
    ],
    explanation:
      'Door het jaarrendement om te rekenen naar een gelijkwaardig maandrendement groeit je startbedrag precies met het opgegeven percentage per jaar. De maandelijkse inleg wordt aan het einde van elke maand gestort.',
  },
  extraSections: [
    {
      id: 'regel-van-72',
      title: 'De regel van 72',
      html: `
<p>Wil je snel weten hoe lang het duurt voordat je geld verdubbelt? Deel 72 door het rendement in procenten. Bij 6% rendement verdubbelt je vermogen in ongeveer 72 ÷ 6 = <strong>12 jaar</strong>. Bij 3% duurt het zo'n 24 jaar. Het is een vuistregel, maar hij zit voor gangbare rendementen verrassend dicht bij de werkelijkheid.</p>`,
    },
    {
      id: 'tijd-is-belangrijker',
      title: 'Waarom vroeg beginnen zo veel uitmaakt',
      html: `
<p>Leg je 30 jaar lang € 100 per maand in tegen 6% rendement, dan heb je € 36.000 ingelegd en eindig je met ongeveer € 97.450. Begin je tien jaar later en leg je 20 jaar lang € 100 per maand in, dan eindig je met ongeveer € 45.340. Je legt maar € 12.000 minder in, maar je eindbedrag is ruim de helft lager.</p>
<p>Dat komt doordat het rendement in de laatste jaren het grootst is. Tijd is bij rente op rente dus vaak belangrijker dan het bedrag dat je inlegt.</p>`,
    },
    {
      id: 'inflatie-en-belasting',
      title: 'Houd rekening met inflatie, kosten en belasting',
      html: `
<p>De calculator rekent met een nominaal rendement. In werkelijkheid verlaagt inflatie de koopkracht van je eindbedrag, en betaal je bij beleggen vaak kosten. In Nederland kan er daarnaast vermogensbelasting in box 3 verschuldigd zijn. Wil je een realistischer beeld? Vul dan een rendement in na aftrek van kosten en inflatie, bijvoorbeeld 4% in plaats van 7%.</p>`,
    },
  ],
  examples: [
    { title: '€ 10.000 eenmalig, 7% per jaar, 10 jaar', text: '€ 10.000 × 1,07¹⁰ = € 19.671,51.', answer: 'Eindkapitaal € 19.671,51, waarvan € 9.671,51 rendement.' },
    { title: '€ 100 per maand, 6% per jaar, 30 jaar', text: 'Totale inleg 360 × € 100 = € 36.000.', answer: 'Eindkapitaal ongeveer € 97.451, waarvan € 61.451 rendement.' },
    { title: '€ 5.000 start plus € 200 per maand, 5% per jaar, 20 jaar', text: 'Totale inleg € 5.000 + 240 × € 200 = € 53.000.', answer: 'Eindkapitaal ongeveer € 94.427.' },
  ],
  mistakes: [
    { title: 'Een te optimistisch rendement kiezen', text: 'Een hoog verwacht rendement maakt de uitkomst spectaculair, maar beleggingsrendementen schommelen. Reken voor de zekerheid ook met een lager scenario.' },
    { title: 'Rendement per jaar delen door 12', text: '7% ÷ 12 per maand geeft over een jaar 7,23% in plaats van 7%. Wij rekenen met het gelijkwaardige maandrendement, zodat een jaar precies het opgegeven rendement oplevert.' },
    { title: 'Inflatie vergeten', text: '€ 100.000 over dertig jaar is veel minder waard dan € 100.000 vandaag. Bij 2% inflatie per jaar is de koopkracht ongeveer € 55.000 in huidige euro\'s.' },
    { title: 'Kosten en belasting negeren', text: 'Een jaarlijkse kostenpost van 1% lijkt klein, maar over dertig jaar scheelt het al snel tienduizenden euro\'s.' },
  ],
  faq: [
    { q: 'Wat is rente op rente?', a: '<p>Rente op rente betekent dat het rendement dat je ontvangt wordt toegevoegd aan je vermogen, zodat je in de volgende periode ook rendement krijgt over dat rendement. Je vermogen groeit daardoor steeds sneller.</p>' },
    { q: 'Wat is het verschil tussen enkelvoudige en samengestelde rente?', a: '<p>Bij enkelvoudige rente krijg je elk jaar alleen rente over je oorspronkelijke inleg. Bij samengestelde rente ook over de eerder ontvangen rente. € 10.000 tegen 5% levert na 20 jaar enkelvoudig € 10.000 rente op, samengesteld ruim € 16.500.</p>' },
    { q: 'Welk rendement moet ik invullen?', a: '<p>Voor een spaarrekening vul je de actuele spaarrente in. Voor beleggen is het verstandig om met meerdere scenario\'s te rekenen. Historische rendementen bieden geen garantie voor de toekomst.</p>' },
    { q: 'Wanneer wordt de maandelijkse inleg gestort?', a: '<p>De calculator gaat uit van een storting aan het einde van elke maand. Stort je aan het begin van de maand, dan valt je eindbedrag iets hoger uit.</p>' },
    { q: 'Kan ik ook een negatief rendement invullen?', a: '<p>Ja. Zo zie je bijvoorbeeld wat inflatie doet met spaargeld dat geen rente oplevert: vul dan een rendement van −2% in.</p>' },
    { q: 'Houdt de calculator rekening met box 3?', a: '<p>Nee. Vermogensbelasting hangt af van je totale vermogen, je fiscale partner en de regels van het betreffende jaar. Vul eventueel een rendement in na belasting.</p>' },
  ],
  related: ['hypotheek-berekenen', 'percentage-berekenen', 'bruto-netto-berekenen'],
  sources: [],
  method: 'Maandelijkse berekening met een maandrendement van (1 + r)^(1/12) − 1 en inleg aan het einde van elke maand. Geen kosten, inflatie of belasting meegerekend.',
  author: null,
  reviewedBy: null,
  lastReviewed: '2026-10-04',
  disclaimer: 'finance',
  appCategory: 'FinanceApplication',
};
