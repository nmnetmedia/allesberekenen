import type { CalculatorContent } from '../types';

export const m2: CalculatorContent = {
  slug: 'm2-berekenen',
  name: 'm² berekenen',
  shortName: 'm²',
  category: 'wonen',
  icon: 'ruler',
  description: 'Bereken de oppervlakte van één of meer ruimtes in vierkante meters, inclusief snijverlies.',
  keywords: ['m2', 'm²', 'vierkante meter', 'oppervlakte', 'oppervlakte berekenen', 'laminaat', 'tegels', 'vloer', 'verf', 'behang', 'pvc', 'tapijt', 'snijverlies', 'hoeveel m2'],
  seoTitle: 'm² berekenen – Oppervlakte in vierkante meters (met snijverlies)',
  metaDescription:
    'Bereken snel hoeveel m² je kamer of vloer is. Tel meerdere ruimtes op, kies meter of centimeter en reken direct met 5, 10 of 15% snijverlies voor laminaat en tegels.',
  h1: 'm² berekenen',
  lead: 'Vul lengte en breedte in, voeg zo nodig extra ruimtes toe en zie direct hoeveel vierkante meter je nodig hebt.',
  intro: `
<p>Ga je een nieuwe vloer leggen, tegelen of schilderen? Dan wil je eerst weten hoeveel vierkante meter het om gaat. Met deze m²-calculator vul je de lengte en breedte van een ruimte in en zie je direct de oppervlakte. Je kunt meerdere ruimtes toevoegen, zoals de woonkamer, de gang en de keuken, en de calculator telt alles bij elkaar op.</p>
<p>Omdat je bij het leggen van laminaat, pvc of tegels altijd materiaal verliest door zagen en passen, kun je direct een percentage snijverlies meerekenen. Zo bestel je in één keer genoeg. Meet je liever in centimeters? Ook dat kan; de calculator rekent het automatisch om naar m².</p>`,
  howTo: {
    id: 'hoe-bereken-je-m2',
    title: 'Hoe bereken je vierkante meters?',
    html: `
<p>De oppervlakte van een rechthoekige ruimte is lengte maal breedte. Meet beide in meters en vermenigvuldig ze. Een kamer van 5 m lang en 4 m breed is 5 × 4 = <strong>20 m²</strong>.</p>
<p>Meet je in centimeters, deel dan eerst beide maten door 100. 350 × 280 cm wordt 3,5 × 2,8 m = 9,8 m². Let op: deel je pas achteraf, dan moet je door 10.000 delen, omdat je twee keer omrekent.</p>
<h3>L-vormige of onregelmatige ruimtes</h3>
<p>Deel de ruimte op in rechthoeken. Een L-vormige woonkamer splits je bijvoorbeeld in twee delen. Bereken elk deel apart en tel ze op. In de calculator voeg je daarvoor gewoon een extra ruimte toe.</p>`,
  },
  formula: {
    title: 'Oppervlakteformule',
    lines: ['Oppervlakte (m²) = lengte (m) × breedte (m)', 'Totaal met snijverlies = oppervlakte × (1 + snijverlies ÷ 100)'],
    explanation: 'Voor centimeters geldt: oppervlakte (m²) = lengte (cm) × breedte (cm) ÷ 10.000.',
  },
  extraSections: [
    {
      id: 'snijverlies',
      title: 'Hoeveel snijverlies moet je rekenen?',
      html: `
<div class="table-wrap"><table>
  <thead><tr><th>Situatie</th><th>Snijverlies</th></tr></thead>
  <tbody>
    <tr><td>Rechthoekige ruimte, recht gelegd laminaat of pvc</td><td>5%</td></tr>
    <tr><td>Ruimte met hoeken, nissen of leidingen; tegels recht gelegd</td><td>10%</td></tr>
    <tr><td>Visgraat, diagonaal leggen, grote tegels of veel schuine wanden</td><td>15%</td></tr>
    <tr><td>Verven (geen snijverlies, wel een tweede laag)</td><td>0% (reken × aantal lagen)</td></tr>
  </tbody>
</table></div>
<p>Houd de verpakkingsgrootte in de gaten. Zit er 2,22 m² in een pak laminaat en heb je 22 m² nodig, dan heb je 10 pakken nodig (22 ÷ 2,22 = 9,9, naar boven afgerond).</p>`,
    },
    {
      id: 'muren-en-plafonds',
      title: 'Muren en plafonds berekenen',
      html: `
<p>Voor verf of behang op een muur bereken je breedte maal hoogte. Een muur van 4 m breed en 2,6 m hoog is 10,4 m². Trek ramen en deuren eraf: een deur is ongeveer 0,9 × 2,1 m = 1,9 m². Voor een plafond gebruik je dezelfde maten als de vloer.</p>
<p>Op de verpakking van verf staat hoeveel m² je per liter kunt schilderen, bijvoorbeeld 10 m² per liter. Voor 30 m² in twee lagen heb je dan 6 liter nodig.</p>`,
    },
  ],
  examples: [
    { title: 'Woonkamer van 6,2 × 4,1 meter, laminaat met 5% snijverlies', text: '6,2 × 4,1 = 25,42 m². 25,42 × 1,05 = 26,69 m².', answer: 'Bestel minimaal 26,7 m² laminaat.' },
    { title: 'Badkamervloer van 240 × 180 cm, tegels met 10%', text: '2,4 × 1,8 = 4,32 m². 4,32 × 1,10 = 4,75 m².', answer: 'Je hebt ongeveer 4,75 m² tegels nodig.' },
    { title: 'L-vormige kamer: 5 × 4 m plus 3 × 2 m', text: '20 m² + 6 m² = 26 m².', answer: 'Totale vloeroppervlakte: 26 m².' },
  ],
  mistakes: [
    { title: 'Centimeters en meters door elkaar gebruiken', text: 'Een kamer van 450 cm bij 3,2 m is 4,5 × 3,2 = 14,4 m². Zet eerst alles om naar dezelfde eenheid.' },
    { title: 'Te krap bestellen', text: 'Zonder snijverlies kom je vrijwel altijd tekort. Een nabestelling kan uit een andere productiebatch komen met een net andere kleur.' },
    { title: 'Op één plek meten', text: 'Muren zijn zelden helemaal recht. Meet op twee of drie plekken en gebruik de grootste maat.' },
    { title: 'Vaste kasten of keukens vergeten', text: 'Komt er een vaste kast op de vloer, dan hoef je daar meestal geen vloer onder te leggen. Bij een zwevende vloer geldt dat juist niet altijd; check het advies van de fabrikant.' },
  ],
  faq: [
    { q: 'Hoe reken ik cm om naar m²?', a: '<p>Vermenigvuldig lengte en breedte in centimeters en deel de uitkomst door 10.000. 300 × 250 cm = 75.000 cm² = 7,5 m².</p>' },
    { q: 'Hoeveel pakken laminaat heb ik nodig?', a: '<p>Deel het totaal inclusief snijverlies door de inhoud van één pak (staat op de verpakking) en rond naar boven af. Bij 26,7 m² en 2,22 m² per pak heb je 13 pakken nodig.</p>' },
    { q: 'Hoe bereken ik de oppervlakte van een ronde ruimte?', a: '<p>Gebruik π × straal². Een ronde erker met een doorsnede van 3 m (straal 1,5 m) is 3,14 × 1,5 × 1,5 = 7,07 m². Vul in de calculator dan bijvoorbeeld 7,07 × 1 in.</p>' },
    { q: 'Wat is het verschil tussen m² en m³?', a: '<p>m² is een oppervlakte (lengte × breedte), m³ een inhoud (lengte × breedte × hoogte). Voor vloeren en muren gebruik je m², voor bijvoorbeeld zand, beton of de inhoud van een kamer m³.</p>' },
    { q: 'Telt snijverlies ook bij verf?', a: '<p>Nee, bij verf speelt zaagafval geen rol. Reken wel met het aantal lagen en een kleine reserve voor bijwerken.</p>' },
  ],
  related: ['hypotheek-berekenen', 'percentage-berekenen', 'btw-berekenen'],
  sources: [],
  method: 'Oppervlakte = lengte × breedte per ruimte, opgeteld over alle ruimtes. Snijverlies wordt als percentage over het totaal berekend. Centimeters worden vooraf omgerekend naar meters.',
  author: null,
  reviewedBy: null,
  lastReviewed: '2026-10-04',
  disclaimer: 'none',
  appCategory: 'UtilitiesApplication',
};
