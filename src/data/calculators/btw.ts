import type { CalculatorContent } from '../types';

export const btw: CalculatorContent = {
  slug: 'btw-berekenen',
  name: 'BTW berekenen',
  shortName: 'BTW',
  category: 'geld',
  icon: 'receipt',
  description: 'Reken een bedrag om van exclusief naar inclusief BTW, of haal de BTW uit een bedrag.',
  keywords: ['btw', 'btw calculator', 'btw terugrekenen', 'btw uit bedrag halen', '21 procent', '12 procent', '6 procent', 'btw belgië', 'inclusief', 'exclusief', 'omzetbelasting', 'vat', 'factuur'],
  seoTitle: 'BTW berekenen – Inclusief & exclusief BTW calculator',
  metaDescription:
    'BTW berekenen of terugrekenen in één klik. Reken met de Belgische tarieven 21%, 12%, 6% en 0% of een eigen tarief van exclusief naar inclusief BTW en andersom. Met formule en voorbeelden.',
  h1: 'BTW berekenen',
  lead: 'Vul een bedrag in, kies of het inclusief of exclusief BTW is en zie direct het BTW-bedrag en de omgerekende prijs.',
  intro: `
<p>Met deze BTW-calculator reken je een bedrag in een paar seconden om van exclusief naar inclusief BTW, of je haalt de BTW juist uit een totaalbedrag. Je kiest zelf het tarief: de Belgische tarieven 21%, 12%, 6% en 0%, of een eigen percentage, zoals het Nederlandse verlaagde tarief van 9%.</p>
<p>De calculator is handig voor zelfstandigen en ondernemers die een offerte of factuur opstellen, maar ook voor particulieren die willen weten hoeveel BTW er in een aankoop zit. Het resultaat verschijnt terwijl je typt en wordt op de cent nauwkeurig afgerond. Daarbij is het BTW-bedrag altijd precies het verschil tussen het bedrag inclusief en exclusief BTW, zodat je cijfers op een factuur altijd sluitend zijn.</p>`,
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
<p>Voor 12% gebruik je 1,12 en voor 6% gebruik je 1,06. Het principe blijft hetzelfde.</p>`,
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
<p>Een handig ezelsbruggetje: bij 21% is het BTW-deel altijd 21/121 van het totaal, ongeveer 17,36%. Bij 6% is dat 6/106, ongeveer 5,66%, en bij 12% is het 12/112, ongeveer 10,71%. Kies in de calculator hierboven “Inclusief → exclusief” om dit automatisch te laten uitrekenen.</p>`,
    },
    {
      id: 'btw-tarieven',
      title: 'Welke BTW-tarieven zijn er?',
      html: `
<p>In België gelden vier btw-tarieven. Welk tarief van toepassing is, hangt af van het product of de dienst.</p>
<div class="table-wrap"><table>
  <thead><tr><th>Tarief</th><th>Voor onder meer</th></tr></thead>
  <tbody>
    <tr><td><strong>21%</strong></td><td>Het normale tarief: de meeste producten en diensten, zoals elektronica, kleding, meubels en de meeste zakelijke diensten.</td></tr>
    <tr><td><strong>12%</strong></td><td>Het tussentarief: onder meer restaurant- en cateringdiensten (zonder dranken) en bepaalde sociale huisvesting.</td></tr>
    <tr><td><strong>6%</strong></td><td>Het verlaagde tarief: onder meer de meeste voedingsmiddelen, water, geneesmiddelen, boeken en renovatie van woningen ouder dan tien jaar.</td></tr>
    <tr><td><strong>0%</strong></td><td>Onder meer export buiten de EU, intracommunautaire leveringen en bepaalde dag- en weekbladen. Dit is iets anders dan een vrijstelling.</td></tr>
  </tbody>
</table></div>
<p>De lijst van welke goederen en diensten onder welk tarief vallen, wordt af en toe aangepast. Twijfel je over het juiste tarief? Raadpleeg dan de FOD Financiën of je boekhouder.</p>
<p>In Nederland gelden 21%, 9% en 0%. Voor het Nederlandse verlaagde tarief kies je “Eigen tarief” en vul je 9 in.</p>`,
    },
  ],
  examples: [
    {
      title: '€ 100 exclusief 21% BTW',
      text: 'Je stuurt een factuur voor € 100 aan werkzaamheden. Daar komt 21% BTW bij: € 100 × 0,21 = € 21.',
      answer: 'Totaal inclusief BTW: € 121,00',
    },
    {
      title: 'Boodschappen van € 53,00 inclusief 6% BTW',
      text: 'Je wilt weten hoeveel BTW er in een boodschappenticket zit. € 53,00 ÷ 1,06 = € 50,00 exclusief BTW.',
      answer: 'Er zit € 3,00 BTW in het bedrag.',
    },
    {
      title: 'Restaurantrekening van € 84,00 inclusief 12% BTW',
      text: 'Voor de maaltijd (zonder dranken) geldt 12%. € 84,00 ÷ 1,12 = € 75,00 exclusief BTW.',
      answer: 'Er zit € 9,00 BTW in het bedrag.',
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
      text: 'Niet alles valt onder 21%. Voedingsmiddelen en boeken vallen bijvoorbeeld meestal onder 6%, restaurantmaaltijden onder 12%. Controleer het tarief voordat je een factuur verstuurt.',
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
      a: '<p>Deel het bedrag inclusief BTW door 1,21 (bij 21%), 1,12 (bij 12%) of 1,06 (bij 6%). Het verschil met het oorspronkelijke bedrag is de BTW. Bij € 60,50 inclusief 21% is dat € 50 exclusief en € 10,50 BTW.</p>',
    },
    {
      q: 'Waarom is de BTW geen 21% van het bedrag inclusief BTW?',
      a: '<p>Omdat het tarief altijd wordt berekend over de prijs zonder BTW. Van een bedrag inclusief 21% BTW is het BTW-deel 21/121, ongeveer 17,36%.</p>',
    },
    {
      q: 'Kan ik ook met Nederlandse BTW-tarieven rekenen?',
      a: '<p>Ja. Het Nederlandse standaardtarief is net als in België 21%. Voor het Nederlandse verlaagde tarief kies je “Eigen tarief” en vul je 9 in.</p>',
    },
    {
      q: 'Hoe wordt er afgerond?',
      a: '<p>We ronden af op hele centen. Het BTW-bedrag is altijd het verschil tussen het afgeronde bedrag inclusief en exclusief BTW, zodat de bedragen op je factuur precies optellen.</p>',
    },
    {
      q: 'Moet ik BTW rekenen als zelfstandige?',
      a: '<p>In de meeste gevallen wel. Valt je jaaromzet onder de grens van de vrijstellingsregeling voor kleine ondernemingen, dan kun je kiezen om geen btw aan te rekenen. Of die regeling voor jou geschikt is, hangt af van je omzet en klanten. Kijk hiervoor op de website van de FOD Financiën of vraag het je boekhouder.</p>',
    },
  ],
  related: ['percentage-berekenen', 'bruto-netto-berekenen', 'rente-op-rente-berekenen'],
  sources: [
    { label: 'FOD Financiën – Btw (België)', url: 'https://financien.belgium.be/nl/ondernemingen/btw' },
    { label: 'Belastingdienst – Btw-tarieven en vrijstellingen (Nederland)', url: 'https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/tarieven_en_vrijstellingen/' },
  ],
  method: 'De calculator rekent met de wiskundige BTW-formules hierboven en rondt af op hele centen. De tarieven zijn gecontroleerd aan de hand van de websites van de Belastingdienst en de FOD Financiën.',
  author: null,
  reviewedBy: null,
  lastReviewed: '2026-11-09',
  disclaimer: 'finance',
  appCategory: 'FinanceApplication',
  popular: true,
};
