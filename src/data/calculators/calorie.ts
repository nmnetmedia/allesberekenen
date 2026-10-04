import type { CalculatorContent } from '../types';

export const calorie: CalculatorContent = {
  slug: 'caloriebehoefte-berekenen',
  name: 'Caloriebehoefte berekenen',
  shortName: 'Caloriebehoefte',
  category: 'gezondheid',
  icon: 'flame',
  description: 'Schat je dagelijkse caloriebehoefte (BMR en TDEE) om op gewicht te blijven, af te vallen of aan te komen.',
  keywords: ['calorie', 'calorieën', 'kcal', 'caloriebehoefte', 'bmr', 'tdee', 'ruststofwisseling', 'energiebehoefte', 'afvallen', 'aankomen', 'mifflin', 'hoeveel calorieën per dag'],
  seoTitle: 'Caloriebehoefte berekenen – Hoeveel calorieën per dag heb je nodig?',
  metaDescription:
    'Bereken je dagelijkse caloriebehoefte met de Mifflin-St Jeor-formule. Zie je BMR, TDEE en richtwaarden om op gewicht te blijven, rustig af te vallen of aan te komen.',
  h1: 'Caloriebehoefte berekenen',
  lead: 'Vul je gegevens en activiteitsniveau in en zie direct hoeveel calorieën je lichaam per dag ongeveer verbruikt.',
  intro: `
<p>Hoeveel calorieën heb je per dag nodig? Dat hangt af van je lichaam en van hoe actief je bent. Deze calculator schat eerst je <strong>BMR</strong> (Basal Metabolic Rate): de energie die je lichaam in volledige rust verbruikt voor ademhaling, hartslag en lichaamstemperatuur. Daarna vermenigvuldigen we die met een activiteitsfactor tot je <strong>TDEE</strong> (Total Daily Energy Expenditure): je totale verbruik op een gemiddelde dag.</p>
<p>Op basis daarvan zie je richtwaarden voor gewicht behouden, rustig of sneller afvallen en aankomen. We gebruiken de Mifflin-St Jeor-formule, die in onderzoek bij gezonde volwassenen tot de nauwkeurigste schattingsformules behoort. Het blijft een schatting: je werkelijke verbruik kan enkele honderden calorieën afwijken. De calculator is bedoeld voor gezonde volwassenen en niet voor zwangeren, mensen die borstvoeding geven of mensen met een medische aandoening.</p>`,
  howTo: {
    id: 'hoe-bereken-je-caloriebehoefte',
    title: 'Hoe bereken je je caloriebehoefte?',
    html: `
<p>De berekening bestaat uit twee stappen.</p>
<h3>Stap 1: je ruststofwisseling (BMR)</h3>
<p>Met de Mifflin-St Jeor-formule:</p>
<ul>
  <li><strong>Mannen</strong>: 10 × gewicht (kg) + 6,25 × lengte (cm) − 5 × leeftijd + 5</li>
  <li><strong>Vrouwen</strong>: 10 × gewicht (kg) + 6,25 × lengte (cm) − 5 × leeftijd − 161</li>
</ul>
<h3>Stap 2: je activiteitsniveau (TDEE)</h3>
<p>Vermenigvuldig je BMR met een factor die past bij hoe actief je bent:</p>
<div class="table-wrap"><table>
  <thead><tr><th>Activiteitsniveau</th><th>Factor</th></tr></thead>
  <tbody>
    <tr><td>Weinig actief: zittend werk, nauwelijks sport</td><td>1,2</td></tr>
    <tr><td>Licht actief: 1–3 keer per week licht sporten</td><td>1,375</td></tr>
    <tr><td>Gemiddeld actief: 3–5 keer per week matig sporten</td><td>1,55</td></tr>
    <tr><td>Zeer actief: 6–7 keer per week intensief of zwaar werk</td><td>1,725</td></tr>
  </tbody>
</table></div>`,
  },
  formula: {
    title: 'Mifflin-St Jeor',
    lines: [
      'BMR (man) = 10 × kg + 6,25 × cm − 5 × leeftijd + 5',
      'BMR (vrouw) = 10 × kg + 6,25 × cm − 5 × leeftijd − 161',
      'TDEE = BMR × activiteitsfactor',
    ],
    explanation:
      'De formule is in 1990 gepubliceerd door Mifflin, St Jeor en collega\'s in The American Journal of Clinical Nutrition. De activiteitsfactoren zijn algemeen gebruikte richtwaarden.',
  },
  extraSections: [
    {
      id: 'afvallen-en-aankomen',
      title: 'Afvallen of aankomen: hoeveel calorieën minder of meer?',
      html: `
<p>Een kilo lichaamsvet bevat ongeveer 7.000 kcal. Eet je elke dag 500 kcal minder dan je verbruikt, dan val je in theorie ongeveer een halve kilo per week af. In de praktijk gaat het vaak wat langzamer, omdat je lichaam zich aanpast.</p>
<ul>
  <li><strong>Rustig afvallen (−250 kcal)</strong>: goed vol te houden, ongeveer 0,25 kg per week.</li>
  <li><strong>Sneller afvallen (−500 kcal)</strong>: ongeveer 0,5 kg per week. Ga niet structureel onder je BMR zitten zonder begeleiding.</li>
  <li><strong>Aankomen (+300 kcal)</strong>: geleidelijk, bijvoorbeeld bij krachttraining of ondergewicht.</li>
</ul>
<p>Wil je flink afvallen of heb je een medische aandoening? Laat je dan begeleiden door je huisarts of een diëtist.</p>`,
    },
  ],
  examples: [
    { title: 'Man, 30 jaar, 80 kg, 180 cm, gemiddeld actief', text: 'BMR = 800 + 1.125 − 150 + 5 = 1.780 kcal. TDEE = 1.780 × 1,55 = 2.759 kcal.', answer: 'Ongeveer 2.760 kcal per dag om op gewicht te blijven.' },
    { title: 'Vrouw, 30 jaar, 65 kg, 168 cm, weinig actief', text: 'BMR = 650 + 1.050 − 150 − 161 = 1.389 kcal. TDEE = 1.389 × 1,2 = 1.667 kcal.', answer: 'Ongeveer 1.670 kcal per dag; rustig afvallen kan met zo\'n 1.420 kcal.' },
    { title: 'Vrouw, 55 jaar, 72 kg, 165 cm, licht actief', text: 'BMR = 720 + 1.031,25 − 275 − 161 = 1.315 kcal. TDEE = 1.315 × 1,375 = 1.808 kcal.', answer: 'Ongeveer 1.810 kcal per dag.' },
  ],
  mistakes: [
    { title: 'Je activiteitsniveau overschatten', text: 'Drie keer per week een uur sporten met verder een zittend leven is meestal “licht actief”, niet “zeer actief”. Kies bij twijfel het lagere niveau.' },
    { title: 'Onder je BMR gaan eten', text: 'Heel weinig eten kan leiden tot spierverlies, vermoeidheid en tekorten aan voedingsstoffen. Een groot tekort is ook lastiger vol te houden.' },
    { title: 'De uitkomst als exact getal zien', text: 'Elke formule is een gemiddelde. Houd je gewicht een paar weken bij en stel je inname bij als je anders reageert dan verwacht.' },
    { title: 'Calorieën verbranden dubbel tellen', text: 'De activiteitsfactor bevat je sport al. Tel de calorieën van een sporthorloge niet nog eens extra op bij je TDEE.' },
  ],
  faq: [
    { q: 'Hoeveel calorieën heb ik per dag nodig?', a: '<p>Gemiddeld hebben volwassen vrouwen zo\'n 2.000 kcal en mannen zo\'n 2.500 kcal per dag nodig, maar dit verschilt sterk per persoon. Vul je eigen gegevens in voor een persoonlijke schatting.</p>' },
    { q: 'Wat is het verschil tussen BMR en TDEE?', a: '<p>Je BMR is wat je lichaam in volledige rust verbruikt. Je TDEE is je totale verbruik inclusief bewegen, sporten en het verteren van eten. Om af te vallen kijk je naar je TDEE.</p>' },
    { q: 'Waarom Mifflin-St Jeor en niet Harris-Benedict?', a: '<p>De Harris-Benedict-formule stamt uit 1919 en overschat het verbruik bij veel mensen. Vergelijkend onderzoek laat zien dat Mifflin-St Jeor bij gezonde volwassenen gemiddeld dichter bij het gemeten verbruik ligt.</p>' },
    { q: 'Is deze calculator geschikt als ik zwanger ben?', a: '<p>Nee. Tijdens de zwangerschap en bij borstvoeding verandert je energiebehoefte. Bespreek dit met je verloskundige of een diëtist.</p>' },
    { q: 'Ik ben gespierd. Klopt de uitkomst dan?', a: '<p>Mifflin-St Jeor houdt geen rekening met je spiermassa. Bij een hoog spierpercentage kan je werkelijke verbruik hoger liggen dan de schatting.</p>' },
    { q: 'Hoe snel mag ik afvallen?', a: '<p>Een tempo van een kwart tot een halve kilo per week is voor de meeste mensen goed vol te houden. Sneller afvallen vergroot de kans op spierverlies en het jojo-effect.</p>' },
  ],
  related: ['bmi-berekenen', 'leeftijd-berekenen', 'percentage-berekenen'],
  sources: [
    { label: 'Mifflin MD, St Jeor ST e.a. (1990). A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr 51(2):241–247', url: 'https://doi.org/10.1093/ajcn/51.2.241' },
    { label: 'Voedingscentrum – Hoeveel calorieën heb ik nodig?', url: 'https://www.voedingscentrum.nl/nl/service/vraag-en-antwoord/gezonde-voeding-en-voedingsstoffen/hoeveel-calorieen-heb-ik-nodig-.aspx' },
  ],
  method: 'BMR volgens Mifflin-St Jeor (1990), vermenigvuldigd met gangbare activiteitsfactoren (1,2 tot 1,725). Doelwaarden zijn de TDEE min 250 of 500 kcal, of plus 300 kcal. We waarschuwen als een doelwaarde onder je BMR uitkomt.',
  author: null,
  reviewedBy: null,
  lastReviewed: '2026-10-04',
  disclaimer: 'health',
  appCategory: 'HealthApplication',
};
