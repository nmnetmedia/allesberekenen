import type { CalculatorContent } from '../types';

export const hypotheek: CalculatorContent = {
  slug: 'hypotheek-berekenen',
  name: 'Hypotheek berekenen',
  shortName: 'Hypotheek',
  category: 'geld',
  alsoIn: ['wonen'],
  icon: 'home',
  description: 'Schat je bruto maandlasten, totale rente en het aflossingsverloop van een hypotheek.',
  keywords: ['hypotheek', 'maandlasten', 'hypotheek berekenen', 'annuïteitenhypotheek', 'lineaire hypotheek', 'hypotheekrente', 'lening', 'aflossing', 'huis kopen', 'eigen inbreng', 'woning'],
  seoTitle: 'Hypotheek berekenen – Maandlasten en totale rente',
  metaDescription:
    'Bereken je bruto maandlasten voor een annuïteiten- of lineaire hypotheek. Zie direct je maandbedrag, totale rente en wat je in totaal terugbetaalt. Indicatief en gratis.',
  h1: 'Hypotheek berekenen',
  lead: 'Vul de aankoopprijs, je eigen inbreng, de rente en looptijd in en zie direct je geschatte maandlasten en totale rente.',
  intro: `
<p>Wat kost een hypotheek per maand, en hoeveel rente betaal je in totaal? Met deze calculator krijg je in een paar seconden een eerste beeld. Vul de aankoopprijs van de woning en je eigen inbreng in; de calculator rekent het leenbedrag uit. Je kunt het leenbedrag ook direct aanpassen.</p>
<p>Kies tussen een <strong>annuïteitenhypotheek</strong>, waarbij je elke maand hetzelfde bruto bedrag betaalt, en een <strong>lineaire hypotheek</strong>, waarbij je elke maand een vast bedrag aflost en de maandlasten in de loop der jaren dalen. Je ziet je maandbedrag, het totaal dat je terugbetaalt, de totale rente en een overzicht per jaar.</p>
<p>Let op: dit is een indicatieve berekening en geen financieel advies. De calculator zegt niets over hoeveel je maximaal mag lenen en rekent met bruto maandlasten, dus zonder hypotheekrenteaftrek.</p>`,
  howTo: {
    id: 'hoe-bereken-je-maandlasten',
    title: 'Hoe bereken je je hypotheeklasten?',
    html: `
<h3>Annuïteitenhypotheek</h3>
<p>Bij een annuïteitenhypotheek betaal je elke maand hetzelfde bruto bedrag. In het begin bestaat dat bedrag vooral uit rente, aan het eind vooral uit aflossing. Het maandbedrag bereken je met de annuïteitenformule:</p>
<p><strong>maandlast = L × i ÷ (1 − (1 + i)<sup>−n</sup>)</strong></p>
<p>Daarin is L het leenbedrag, i de rente per maand (jaarrente ÷ 12) en n het aantal maanden.</p>
<h3>Lineaire hypotheek</h3>
<p>Bij een lineaire hypotheek los je elke maand hetzelfde bedrag af: leenbedrag ÷ aantal maanden. Daarbovenop betaal je rente over de schuld die nog openstaat. Je maandlasten zijn in het begin dus hoger, maar dalen elke maand. In totaal betaal je minder rente dan bij een annuïteitenhypotheek.</p>`,
  },
  formula: {
    title: 'Hypotheekformules',
    lines: [
      'Annuïteit per maand = L × i ÷ (1 − (1 + i)^−n)',
      'Lineair, eerste maand = L ÷ n + L × i',
      'i = jaarrente ÷ 12   ·   n = looptijd in jaren × 12',
    ],
    explanation:
      'Totaal terugbetaald = leenbedrag + totale rente. De berekening gaat uit van een gelijkblijvende rente gedurende de hele looptijd.',
  },
  extraSections: [
    {
      id: 'annuitair-of-lineair',
      title: 'Annuïteitenhypotheek of lineaire hypotheek?',
      html: `
<div class="table-wrap"><table>
  <thead><tr><th></th><th>Annuïtair</th><th>Lineair</th></tr></thead>
  <tbody>
    <tr><td>Maandlast bij start</td><td>Lager</td><td>Hoger</td></tr>
    <tr><td>Verloop maandlast (bruto)</td><td>Gelijk</td><td>Dalend</td></tr>
    <tr><td>Totale rente</td><td>Hoger</td><td>Lager</td></tr>
    <tr><td>Voorbeeld € 300.000, 4%, 30 jaar</td><td>€ 1.432 per maand, € 215.609 rente</td><td>€ 1.833 dalend naar € 836, € 180.500 rente</td></tr>
  </tbody>
</table></div>
<p>Netto kan het beeld anders zijn, omdat je in Nederland onder voorwaarden hypotheekrente mag aftrekken. Bij een annuïteitenhypotheek daalt het renteaandeel langzamer, waardoor de netto maandlast in de loop der jaren stijgt.</p>`,
    },
    {
      id: 'bijkomende-kosten',
      title: 'Kosten die niet in deze berekening zitten',
      html: `
<p>Bij het kopen van een huis komen er naast de hypotheek nog kosten bij. In Nederland noem je die de kosten koper, in België de aankoopkosten. Denk aan:</p>
<ul>
  <li>overdrachtsbelasting (Nederland) of registratierechten (België);</li>
  <li>notariskosten voor de leverings- en hypotheekakte;</li>
  <li>taxatiekosten en advies- en afsluitkosten van de hypotheek;</li>
  <li>eventueel de kosten van een Nationale Hypotheek Garantie (NHG).</li>
</ul>
<p>Deze kosten kun je in Nederland meestal niet meefinancieren en betaal je dus uit eigen middelen. We werken aan aparte calculators voor aankoopkosten en de maximale hypotheek.</p>`,
    },
  ],
  examples: [
    { title: '€ 300.000 annuïtair, 4% rente, 30 jaar', text: 'i = 0,04 ÷ 12 = 0,00333. n = 360. Maandlast = 300.000 × 0,00333 ÷ (1 − 1,00333⁻³⁶⁰).', answer: '€ 1.432,25 per maand; totaal € 515.609, waarvan € 215.609 rente.' },
    { title: '€ 300.000 lineair, 4% rente, 30 jaar', text: 'Aflossing per maand € 300.000 ÷ 360 = € 833,33. Rente eerste maand € 1.000.', answer: 'Eerste maand € 1.833,33, laatste maand € 836,11; totale rente € 180.500.' },
    { title: 'Wat doet 1% hogere rente?', text: 'Dezelfde lening van € 300.000 annuïtair tegen 5% in plaats van 4%.', answer: '€ 1.610,46 per maand: € 178 meer per maand en ruim € 64.000 meer rente.' },
  ],
  mistakes: [
    { title: 'Alleen naar de maandlast kijken', text: 'Een langere looptijd of annuïteitenhypotheek verlaagt je maandlast, maar verhoogt de totale rente flink. Vergelijk beide getallen.' },
    { title: 'Kosten koper vergeten', text: 'Overdrachtsbelasting, notaris, taxatie en advies tellen al snel op tot enkele procenten van de koopsom. Die moet je meestal zelf betalen.' },
    { title: 'Bruto en netto door elkaar halen', text: 'Deze calculator toont bruto maandlasten. Door hypotheekrenteaftrek kan je netto maandlast lager zijn, maar dat voordeel neemt in de loop der jaren af.' },
    { title: 'Ervan uitgaan dat de rente gelijk blijft', text: 'Na afloop van je rentevaste periode wordt de rente opnieuw vastgesteld. Reken voor de zekerheid ook een scenario met een hogere rente door.' },
  ],
  faq: [
    { q: 'Hoeveel hypotheek kan ik krijgen?', a: '<p>Dat hangt af van je inkomen, je financiële verplichtingen, de rente en de energiezuinigheid van de woning. Deze calculator berekent de maandlasten van een gekozen leenbedrag, niet je maximale hypotheek. Een erkend hypotheekadviseur kan je maximale leenbedrag precies berekenen.</p>' },
    { q: 'Wat is beter: annuïtair of lineair?', a: '<p>Dat hangt af van je situatie. Lineair is in totaal goedkoper, maar heeft hogere maandlasten in het begin. Annuïtair geeft meer ruimte in je budget aan het begin. Vergelijk beide met de calculator.</p>' },
    { q: 'Rekent de calculator met hypotheekrenteaftrek?', a: '<p>Nee, de calculator toont bruto maandlasten. De hypotheekrenteaftrek hangt af van je inkomen, de voorwaarden van het betreffende jaar en je WOZ-waarde (eigenwoningforfait).</p>' },
    { q: 'Wat is eigen inbreng?', a: '<p>Het deel van de woning dat je zelf betaalt uit spaargeld of een schenking. Hoe hoger je eigen inbreng, hoe minder je hoeft te lenen en hoe lager je maandlasten en totale rente.</p>' },
    { q: 'Kan ik een looptijd korter dan 30 jaar kiezen?', a: '<p>Ja, je kunt elke looptijd tussen 1 en 50 jaar invullen. Een kortere looptijd betekent hogere maandlasten, maar veel minder rente in totaal.</p>' },
    { q: 'Geldt deze berekening ook in België?', a: '<p>De annuïteiten- en lineaire formules zijn in België hetzelfde. Wel gelden andere aankoopkosten, zoals registratierechten, en andere fiscale regels. Die zitten niet in deze berekening.</p>' },
  ],
  related: ['rente-op-rente-berekenen', 'bruto-netto-berekenen', 'm2-berekenen'],
  sources: [
    { label: 'Rijksoverheid – Hypotheek en eigen woning', url: 'https://www.rijksoverheid.nl/onderwerpen/huis-kopen' },
  ],
  method: 'Annuïteitenformule met maandrente = jaarrente ÷ 12, of lineaire aflossing van leenbedrag ÷ aantal maanden. Gelijkblijvende rente over de hele looptijd; bruto maandlasten zonder fiscale effecten of bijkomende kosten.',
  author: null,
  reviewedBy: null,
  lastReviewed: '2026-10-04',
  disclaimer: 'finance',
  appCategory: 'FinanceApplication',
  popular: true,
};
