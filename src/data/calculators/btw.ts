import type { CalculatorContent } from '../types';

export const btw: CalculatorContent = {
  slug: 'btw-berekenen',
  name: 'BTW berekenen',
  shortName: 'BTW',
  category: 'geld',
  icon: 'receipt',
  description: 'Reken een bedrag om van exclusief naar inclusief BTW, of haal de BTW uit een bedrag.',
  keywords: ['btw', 'btw calculator', 'btw terugrekenen', 'btw uit bedrag halen', '21 procent', '9 procent', 'inclusief', 'exclusief', 'omzetbelasting', 'vat', 'factuur'],
  seoTitle: 'BTW berekenen – Inclusief & exclusief BTW calculator',
  metaDescription:
    'BTW berekenen of terugrekenen in één klik. Reken met 21%, 9%, 0% of een eigen tarief van exclusief naar inclusief BTW en andersom. Met formule en voorbeelden.',
  h1: 'BTW berekenen',
  lead: 'Vul een bedrag in, kies of het inclusief of exclusief BTW is en zie direct het BTW-bedrag en de omgerekende prijs.',
  intro: `
<p>Met deze BTW-calculator reken je een bedrag in een paar seconden om van exclusief naar inclusief BTW, of je haalt de BTW juist uit een totaalbedrag. Je kiest zelf het tarief: 21%, 9%, 0% of een eigen percentage, bijvoorbeeld de Belgische tarieven van 6% of 12%.</p>
<p>De calculator is handig voor zzp'ers en ondernemers die een offerte of factuur opstellen, maar ook voor particulieren die willen weten hoeveel BTW er in een aankoop zit. Het resultaat verschijnt terwijl je typt en wordt op de cent nauwkeurig afgerond. Daarbij is het BTW-bedrag altijd precies het verschil tussen het bedrag inclusief en exclusief BTW, zodat je cijfers op een factuur altijd sluitend zijn.</p>`,
  howTo: {
    id: 'hoe-bereken-je-btw',
    title: 'Hoe bereken je BTW?',
    html: `
<p>BTW is een percentage van de prijs <strong>exclusief</strong> BTW. Dat is de sleutel tot elke berekening. Wil je van exclusief naar inclusief, dan vermenigvuldig je met 1 plus het tarief. Wil je terug van inclusief naar exclusief, dan deel je door datzelfde getal.</p>
<ul>
  <li><strong>Exclusief → inclusief (21%)</strong>: bedrag × 1,21</li>
  <li><strong>Inclusief → exclusief (21%)</strong>: bedrag ÷ 1,21</li>
  <li><strong>BTW-bedrag uit een bedrag inclusief BTW halen</strong>: bedrag − (bedrag ÷ 1,21), of korter: bedrag × 21 ÷ 121</li>
</ul>
<p>Voor 9% gebruik je 1,09 en voor 6% gebruik je 1,06. Het principe blijft hetzelfde.</p>`,
  },
  formula: {
    title: 'BTW-formules',
    lines: [
      'Inclusief = Exclusief × (1 + tarief / 100)',
      'Exclusief = Inclusief ÷ (1 + tarief / 100)',
      'BTW-bedrag = Inclusief − Exclusief',
    ],
    explanation:
      'Het tarief is een percentage van de prijs exclusief BTW. Daarom mag je bij terugrekenen niet simpelweg 21% van het bedrag inclusief BTW aftrekken.',
  },
  extraSections: [
    {
      id: 'btw-terugrekenen',
      title: 'BTW terugrekenen: de BTW uit een bedrag halen',
      html: `
<p>Heb je een bonnetje of factuur met een totaalbedrag en wil je weten hoeveel BTW erin zit? Dan reken je terug. Neem een bedrag van € 242 inclusief 21% BTW:</p>
<ul>
  <li>Exclusief BTW: € 242 ÷ 1,21 = <strong>€ 200</strong></li>
  <li>BTW-bedrag: € 242 − € 200 = <strong>€ 42</strong></li>
</ul>
<p>Een handig ezelsbruggetje: bij 21% is het BTW-deel altijd 21/121 van het totaal, ongeveer 17,36%. Bij 9% is dat 9/109, ongeveer 8,26%. Kies in de calculator hierboven “Inclusief → exclusief” om dit automatisch te laten uitrekenen.</p>`,
    },
    {
      id: 'btw-tarieven',
      title: 'Welke BTW-tarieven zijn er?',
      html: `
<p>In Nederland gelden drie tarieven. Welk tarief van toepassing is, hangt af van het product of de dienst.</p>
<div class="table-wrap"><table>
  <thead><tr><th>Tarief</th><th>Voor onder meer</th></tr></thead>
  <tbody>
    <tr><td><strong>21%</strong></td><td>Het algemene tarief: de meeste producten en diensten, zoals elektronica, kleding, meubels en de meeste zakelijke diensten.</td></tr>
    <tr><td><strong>9%</strong></td><td>Het verlaagde tarief: onder meer de meeste levensmiddelen, geneesmiddelen, boeken en bepaalde arbeidsintensieve diensten.</td></tr>
    <tr><td><strong>0%</strong></td><td>Vooral export buiten de EU en bepaalde internationale leveringen. Dit is iets anders dan een vrijstelling.</td></tr>
  </tbody>
</table></div>
<p>België kent de tarieven 21%, 12%, 6% en 0%. Die kun je in de calculator invullen via “Eigen tarief”. Twijfel je over het juiste tarief voor jouw product of dienst? Raadpleeg dan de Belastingdienst (Nederland) of de FOD Financiën (België).</p>`,
    },
  ],
  examples: [
    {
      title: '€ 100 exclusief 21% BTW',
      text: 'Je stuurt een factuur voor € 100 aan werkzaamheden. Daar komt 21% BTW bij: € 100 × 0,21 = € 21.',
      answer: 'Totaal inclusief BTW: € 121,00',
    },
    {
      title: 'Boodschappen van € 54,50 inclusief 9% BTW',
      text: 'Je wilt weten hoeveel BTW er in een boodschappenbon zit. € 54,50 ÷ 1,09 = € 50,00 exclusief BTW.',
      answer: 'Er zit € 4,50 BTW in het bedrag.',
    },
    {
      title: 'Laptop van € 899 inclusief 21% BTW',
      text: 'Voor je administratie wil je het bedrag exclusief BTW weten: € 899 ÷ 1,21 = € 742,98 (afgerond). Het BTW-bedrag is € 899 − € 742,98.',
      answer: 'BTW-bedrag: € 156,02',
    },
  ],
  mistakes: [
    {
      title: '21% van het bedrag inclusief BTW aftrekken',
      text: '€ 121 − 21% geeft € 95,59 en niet € 100. De BTW is berekend over het bedrag exclusief BTW, dus je moet delen door 1,21.',
    },
    {
      title: 'Afronden per stap in plaats van aan het eind',
      text: 'Wie eerst het BTW-bedrag afrondt en daarna ook het totaal, kan een cent verschil krijgen. Laat het BTW-bedrag altijd het verschil zijn tussen inclusief en exclusief.',
    },
    {
      title: 'Het verkeerde tarief gebruiken',
      text: 'Niet alles valt onder 21%. Levensmiddelen en boeken vallen bijvoorbeeld meestal onder het verlaagde tarief. Controleer het tarief voordat je een factuur verstuurt.',
    },
    {
      title: '0% verwarren met vrijgesteld',
      text: 'Bij het 0%-tarief mag je de voorbelasting meestal wel aftrekken, bij een vrijstelling niet. Op de factuur vermeld je dit ook anders.',
    },
  ],
  faq: [
    {
      q: 'Hoe reken ik 21% BTW uit?',
      a: '<p>Vermenigvuldig het bedrag exclusief BTW met 0,21 voor het BTW-bedrag, of met 1,21 voor het totaal inclusief BTW. € 250 exclusief BTW wordt zo € 302,50 inclusief BTW.</p>',
    },
    {
      q: 'Hoe haal ik de BTW uit een bedrag?',
      a: '<p>Deel het bedrag inclusief BTW door 1,21 (bij 21%) of 1,09 (bij 9%). Het verschil met het oorspronkelijke bedrag is de BTW. Bij € 60,50 inclusief 21% is dat € 50 exclusief en € 10,50 BTW.</p>',
    },
    {
      q: 'Waarom is de BTW geen 21% van het bedrag inclusief BTW?',
      a: '<p>Omdat het tarief altijd wordt berekend over de prijs zonder BTW. Van een bedrag inclusief 21% BTW is het BTW-deel 21/121, ongeveer 17,36%.</p>',
    },
    {
      q: 'Kan ik ook met Belgische BTW-tarieven rekenen?',
      a: '<p>Ja. Kies “Eigen tarief” en vul 6 of 12 in. Het Belgische standaardtarief is net als in Nederland 21%.</p>',
    },
    {
      q: 'Hoe wordt er afgerond?',
      a: '<p>We ronden af op hele centen. Het BTW-bedrag is altijd het verschil tussen het afgeronde bedrag inclusief en exclusief BTW, zodat de bedragen op je factuur precies optellen.</p>',
    },
    {
      q: 'Moet ik BTW rekenen als zzp\'er?',
      a: '<p>In de meeste gevallen wel. Maak je gebruik van de kleineondernemersregeling (KOR), dan bereken je geen BTW. Of die regeling voor jou geschikt is, hangt af van je omzet en klanten. Kijk hiervoor op de website van de Belastingdienst.</p>',
    },
  ],
  related: ['percentage-berekenen', 'bruto-netto-berekenen', 'rente-op-rente-berekenen'],
  sources: [
    { label: 'Belastingdienst – Btw-tarieven en vrijstellingen', url: 'https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/tarieven_en_vrijstellingen/' },
    { label: 'FOD Financiën – Btw (België)', url: 'https://financien.belgium.be/nl/ondernemingen/btw' },
  ],
  method: 'De calculator rekent met de wiskundige BTW-formules hierboven en rondt af op hele centen. De tarieven zijn gecontroleerd aan de hand van de websites van de Belastingdienst en de FOD Financiën.',
  author: null,
  reviewedBy: null,
  lastReviewed: '2026-10-04',
  disclaimer: 'finance',
  appCategory: 'FinanceApplication',
  popular: true,
};
