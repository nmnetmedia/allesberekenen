import type { CalculatorContent } from '../types';

export const ovulatie: CalculatorContent = {
  slug: 'ovulatie-berekenen',
  name: 'Ovulatie berekenen',
  shortName: 'Ovulatie',
  category: 'gezondheid',
  alsoIn: ['datum-tijd'],
  icon: 'calendarHeart',
  description: 'Schat je eisprong, vruchtbare dagen en volgende menstruatie in een overzichtelijke kalender.',
  keywords: ['ovulatie', 'eisprong', 'vruchtbare dagen', 'vruchtbaar', 'zwanger worden', 'menstruatie', 'cyclus', 'ovulatiekalender', 'kinderwens', 'ongesteld'],
  seoTitle: 'Ovulatie berekenen – Eisprong en vruchtbare dagen kalender',
  metaDescription:
    'Bereken wanneer je eisprong waarschijnlijk is, welke dagen je het meest vruchtbaar bent en wanneer je volgende menstruatie verwacht wordt. Met kalender voor drie cycli.',
  h1: 'Ovulatie berekenen',
  lead: 'Vul de eerste dag van je laatste menstruatie en je gemiddelde cyclusduur in en zie je geschatte eisprong en vruchtbare dagen.',
  intro: `
<p>Probeer je zwanger te worden, of wil je je cyclus beter leren kennen? Met deze ovulatiecalculator zie je wanneer je eisprong (ovulatie) waarschijnlijk plaatsvindt, welke dagen je het meest vruchtbaar bent en wanneer je volgende menstruatie wordt verwacht. De uitkomst zie je in een kalender voor de komende drie cycli.</p>
<p>De calculator gebruikt de kalendermethode: de eisprong valt gemiddeld zo'n 14 dagen vóór de volgende menstruatie. Dat werkt het best bij een regelmatige cyclus. Is je cyclus onregelmatig, dan is de schatting minder betrouwbaar.</p>
<p><strong>Belangrijk:</strong> deze berekening is een schatting. Ze is niet geschikt als anticonceptiemethode en is geen medische diagnose. Heb je vragen over je cyclus of vruchtbaarheid, neem dan contact op met je huisarts of verloskundige.</p>`,
  howTo: {
    id: 'hoe-bereken-je-je-eisprong',
    title: 'Hoe bereken je je eisprong?',
    html: `
<p>Een menstruatiecyclus begint op de eerste dag van je menstruatie en eindigt de dag vóór je volgende menstruatie. De tweede helft van de cyclus, na de eisprong, duurt bij de meeste vrouwen redelijk constant zo'n 12 tot 16 dagen; gemiddeld 14. Daarom tel je vanaf je verwachte volgende menstruatie terug:</p>
<ol>
  <li>Volgende menstruatie = eerste dag laatste menstruatie + cyclusduur.</li>
  <li>Eisprong ≈ volgende menstruatie − 14 dagen.</li>
  <li>Vruchtbare periode ≈ 5 dagen vóór tot 1 dag na de eisprong.</li>
</ol>
<p>Bij een cyclus van 28 dagen valt de eisprong dus rond dag 14. Bij een cyclus van 32 dagen rond dag 18.</p>`,
  },
  formula: {
    title: 'Kalendermethode',
    lines: [
      'Volgende menstruatie = eerste dag laatste menstruatie + cyclusduur',
      'Geschatte eisprong = volgende menstruatie − 14 dagen',
      'Vruchtbare periode = eisprong − 5 dagen t/m eisprong + 1 dag',
    ],
    explanation:
      'Zaadcellen kunnen tot ongeveer vijf dagen overleven, een eicel ongeveer 12 tot 24 uur na de eisprong. Daarom ben je al enkele dagen vóór de eisprong vruchtbaar.',
  },
  extraSections: [
    {
      id: 'signalen-eisprong',
      title: 'Signalen van je eisprong',
      html: `
<p>De kalender geeft een schatting. Je lichaam kan je aanvullende aanwijzingen geven:</p>
<ul>
  <li><strong>Baarmoederhalsslijm</strong>: rond de eisprong wordt het helderder, rekbaarder en glibberiger, vergelijkbaar met rauw eiwit.</li>
  <li><strong>Lichaamstemperatuur</strong>: na de eisprong stijgt je temperatuur in rust met zo'n 0,2 tot 0,5 graad. Je ziet dit pas achteraf.</li>
  <li><strong>Ovulatietests</strong>: deze meten de LH-piek in je urine, die 24 tot 36 uur vóór de eisprong optreedt.</li>
  <li><strong>Lichte pijn in de onderbuik</strong>: sommige vrouwen voelen de eisprong aan één kant.</li>
</ul>`,
    },
    {
      id: 'onregelmatige-cyclus',
      title: 'Wat als je cyclus onregelmatig is?',
      html: `
<p>Varieert je cyclus van maand tot maand meer dan een paar dagen, dan is de kalendermethode minder betrouwbaar. Houd dan een paar maanden bij hoe lang je cycli zijn en vul het gemiddelde in. Combineer de schatting met ovulatietests of het bijhouden van je temperatuur.</p>
<p>Is je cyclus korter dan 21 of langer dan 35 dagen, blijft je menstruatie uit of ben je al een jaar zonder succes zwanger aan het proberen (of zes maanden als je 35 jaar of ouder bent)? Bespreek dit dan met je huisarts.</p>`,
    },
  ],
  examples: [
    { title: 'Cyclus van 28 dagen, laatste menstruatie op 1 januari', text: 'Volgende menstruatie op 29 januari. Eisprong 14 dagen eerder: 15 januari.', answer: 'Vruchtbare periode: 10 tot en met 16 januari.' },
    { title: 'Cyclus van 32 dagen, laatste menstruatie op 1 maart', text: 'Volgende menstruatie op 2 april. Eisprong rond 19 maart.', answer: 'Vruchtbare periode: 14 tot en met 20 maart.' },
    { title: 'Cyclus van 25 dagen', text: 'De eisprong valt rond dag 11 van de cyclus.', answer: 'Je vruchtbare dagen beginnen dus al rond dag 6.' },
  ],
  mistakes: [
    { title: 'Vanaf het einde van je menstruatie tellen', text: 'Je cyclus begint op de eerste dag van je menstruatie, niet de laatste. Tel altijd vanaf de eerste dag met echt bloedverlies.' },
    { title: 'Denken dat iedereen op dag 14 ovuleert', text: 'Dag 14 geldt alleen bij een cyclus van precies 28 dagen. Bij een langere cyclus valt de eisprong later.' },
    { title: 'De kalender als anticonceptie gebruiken', text: 'Een eisprong kan verschuiven door stress, ziekte of reizen. Een kalenderberekening is daarom geen betrouwbare manier om zwangerschap te voorkomen.' },
    { title: 'Alleen op de dag van de eisprong gemeenschap hebben', text: 'De kans op zwangerschap is het grootst in de dagen vlak vóór en op de dag van de eisprong. Wacht dus niet tot de geschatte eisprong zelf.' },
  ],
  faq: [
    { q: 'Hoe lang ben ik vruchtbaar per cyclus?', a: '<p>Ongeveer zes dagen: de vijf dagen vóór de eisprong en de dag van de eisprong zelf. De kans op zwangerschap is het grootst in de twee à drie dagen vlak vóór en op de dag van de eisprong.</p>' },
    { q: 'Is deze calculator betrouwbaar?', a: '<p>Bij een regelmatige cyclus geeft hij een redelijke schatting. De werkelijke eisprong kan echter enkele dagen afwijken. Voor meer zekerheid kun je ovulatietests gebruiken.</p>' },
    { q: 'Kan ik dit gebruiken om zwangerschap te voorkomen?', a: '<p>Nee. Deze calculator is geen anticonceptiemethode. Wil je zwangerschap voorkomen, bespreek dan betrouwbare anticonceptie met je huisarts.</p>' },
    { q: 'Wat is een normale cyclusduur?', a: '<p>Een cyclus van 21 tot 35 dagen geldt als normaal. Gemiddeld is een cyclus ongeveer 28 dagen, maar veel vrouwen hebben een kortere of langere cyclus.</p>' },
    { q: 'Wanneer kan ik een zwangerschapstest doen?', a: '<p>De meeste tests zijn betrouwbaar vanaf de dag dat je menstruatie uitblijft. Een vroege test kan soms al enkele dagen eerder iets aangeven, maar is dan minder betrouwbaar.</p>' },
    { q: 'Worden mijn gegevens opgeslagen?', a: '<p>Nee. De berekening gebeurt volledig in je browser. We slaan je datums niet op en sturen ze niet door.</p>' },
  ],
  related: ['leeftijd-berekenen', 'bmi-berekenen', 'caloriebehoefte-berekenen'],
  sources: [
    { label: 'Thuisarts.nl (NHG) – Ik wil zwanger worden', url: 'https://www.thuisarts.nl/zwanger-worden/ik-wil-zwanger-worden' },
    { label: 'Wilcox AJ, Weinberg CR, Baird DD (1995). Timing of sexual intercourse in relation to ovulation. N Engl J Med 333:1517–1521', url: 'https://doi.org/10.1056/NEJM199512073332301' },
  ],
  method: 'Kalendermethode: eisprong = verwachte volgende menstruatie − 14 dagen; vruchtbare periode van 5 dagen vóór tot 1 dag na de geschatte eisprong. Berekend voor drie opeenvolgende cycli.',
  author: null,
  reviewedBy: null,
  lastReviewed: '2026-10-04',
  disclaimer: 'health',
  appCategory: 'HealthApplication',
};
