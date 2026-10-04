import type { CalculatorContent } from '../types';

export const percentage: CalculatorContent = {
  slug: 'percentage-berekenen',
  name: 'Percentage berekenen',
  shortName: 'Percentage',
  category: 'geld',
  alsoIn: ['werk-inkomen'],
  icon: 'percent',
  description: 'Bereken X% van een getal, procentuele stijging of daling, verschil en korting.',
  keywords: ['procent', 'percentage', 'procent berekenen', 'procentuele stijging', 'procentuele daling', 'korting berekenen', 'percentage verschil', 'hoeveel procent', 'groei', 'afname', 'loonsverhoging'],
  seoTitle: 'Percentage berekenen – Procent, stijging, daling en korting',
  metaDescription:
    'Percentage berekenen in zes varianten: X% van Y, hoeveel procent, procentuele stijging en daling, verschil tussen twee getallen en korting. Met formule.',
  h1: 'Percentage berekenen',
  lead: 'Kies wat je wilt weten, vul twee getallen in en zie direct het antwoord met de bijbehorende formule.',
  intro: `
<p>Procenten kom je overal tegen: bij kortingen in de winkel, een loonsverhoging, de groei van je spaargeld of het verschil tussen twee offertes. Deze calculator bundelt de zes meest gebruikte procentberekeningen op één plek. Je kiest bovenaan wat je wilt weten en vult twee getallen in. De uitkomst en de formule verschijnen terwijl je typt.</p>
<p>Zo zie je niet alleen het antwoord, maar ook hoe het tot stand komt. Handig als je het later zelf wilt narekenen, of als je een kind helpt met huiswerk. De calculator accepteert zowel een komma als een punt als decimaalteken.</p>`,
  howTo: {
    id: 'hoe-bereken-je-een-percentage',
    title: 'Hoe bereken je een percentage?',
    html: `
<p>Procent betekent letterlijk “per honderd”. 15% is dus 15 per 100, oftewel 0,15. Bijna elke procentberekening komt neer op één van deze drie stappen:</p>
<ol>
  <li><strong>Een deel uitrekenen</strong>: vermenigvuldig het getal met het percentage gedeeld door 100. 15% van 80 = 80 × 0,15 = 12.</li>
  <li><strong>Een aandeel uitrekenen</strong>: deel het deel door het geheel en vermenigvuldig met 100. 30 van 120 = 30 ÷ 120 × 100 = 25%.</li>
  <li><strong>Een verandering uitrekenen</strong>: deel het verschil door de oude waarde en vermenigvuldig met 100. Van 80 naar 100 = 20 ÷ 80 × 100 = 25% stijging.</li>
</ol>`,
  },
  formula: {
    title: 'Procentformules',
    lines: [
      'X% van Y = Y × X ÷ 100',
      'X is hoeveel % van Y = X ÷ Y × 100',
      'Stijging % = (nieuw − oud) ÷ oud × 100',
      'Daling % = (oud − nieuw) ÷ oud × 100',
      'Verschil % = |A − B| ÷ ((A + B) ÷ 2) × 100',
      'Prijs na korting = prijs × (1 − korting ÷ 100)',
    ],
    explanation:
      'Bij stijging en daling is de oude waarde altijd het uitgangspunt. Bij het procentuele verschil vergelijk je twee gelijkwaardige getallen en neem je hun gemiddelde als basis.',
  },
  extraSections: [
    {
      id: 'stijging-en-daling',
      title: 'Procentuele stijging en daling berekenen',
      html: `
<p>Een prijs stijgt van € 40 naar € 50. Het verschil is € 10. Ten opzichte van de oude prijs is dat 10 ÷ 40 × 100 = <strong>25% stijging</strong>. Daalt de prijs daarna weer van € 50 naar € 40, dan is dat 10 ÷ 50 × 100 = <strong>20% daling</strong>.</p>
<p>Een stijging en daling van hetzelfde percentage heffen elkaar dus niet op. Stijgt een aandeel 50% en daalt het daarna 50%, dan houd je 75% van je oorspronkelijke inleg over.</p>`,
    },
    {
      id: 'procent-of-procentpunt',
      title: 'Procent of procentpunt?',
      html: `
<p>Gaat de hypotheekrente van 3% naar 4%, dan is de rente met <strong>1 procentpunt</strong> gestegen. In procenten uitgedrukt is dat een stijging van <strong>33,3%</strong> (1 ÷ 3 × 100). Beide zijn correct, maar ze betekenen iets anders. In nieuwsberichten worden ze geregeld door elkaar gehaald.</p>`,
    },
    {
      id: 'korting-berekenen',
      title: 'Korting berekenen',
      html: `
<p>Bij 30% korting betaal je 70% van de prijs. Een jas van € 129,90 kost dan € 129,90 × 0,70 = € 90,93. Je bespaart € 38,97.</p>
<p>Krijg je twee kortingen na elkaar, zoals 20% en daarna nog eens 10% extra? Dan is de totale korting geen 30%, maar 28%: je betaalt 0,80 × 0,90 = 0,72 van de prijs.</p>`,
    },
  ],
  examples: [
    { title: 'Fooi van 10% op een rekening van € 68', text: '€ 68 × 10 ÷ 100 = € 6,80.', answer: 'De fooi is € 6,80.' },
    { title: 'Loonsverhoging van € 3.200 naar € 3.350', text: 'Verschil € 150. € 150 ÷ € 3.200 × 100 = 4,69%.', answer: 'Je salaris stijgt met 4,69%.' },
    { title: '18 van de 24 vragen goed', text: '18 ÷ 24 × 100 = 75%.', answer: 'Je score is 75%.' },
    { title: 'Twee offertes: € 4.500 en € 5.200', text: 'Verschil € 700, gemiddelde € 4.850. € 700 ÷ € 4.850 × 100 = 14,43%.', answer: 'De offertes verschillen 14,43%. Ten opzichte van de goedkoopste is de duurste 15,56% hoger.' },
  ],
  mistakes: [
    { title: 'De verkeerde basis kiezen', text: 'Een stijging van 80 naar 100 is 25%, maar een daling van 100 naar 80 is 20%. Deel altijd door de oorspronkelijke waarde.' },
    { title: 'Procenten bij elkaar optellen', text: 'Twee kortingen van 20% en 10% geven samen 28% korting, niet 30%. Opeenvolgende percentages vermenigvuldig je.' },
    { title: 'Procent en procentpunt door elkaar halen', text: 'Van 2% naar 3% is 1 procentpunt, maar wel 50% stijging.' },
    { title: 'Terugrekenen met hetzelfde percentage', text: 'Een prijs inclusief 25% opslag haal je niet terug door 25% af te trekken. Deel in plaats daarvan door 1,25.' },
  ],
  faq: [
    { q: 'Hoe bereken ik hoeveel procent iets is?', a: '<p>Deel het deel door het geheel en vermenigvuldig met 100. 45 van de 180 is 45 ÷ 180 × 100 = 25%.</p>' },
    { q: 'Hoe reken ik een percentage van een bedrag uit?', a: '<p>Vermenigvuldig het bedrag met het percentage en deel door 100. 7% van € 1.250 is € 1.250 × 7 ÷ 100 = € 87,50.</p>' },
    { q: 'Wat is het verschil tussen procentuele stijging en procentueel verschil?', a: '<p>Bij een stijging vergelijk je een nieuwe waarde met een oude, en is de oude waarde de basis. Bij het procentuele verschil zijn beide getallen gelijkwaardig en gebruik je hun gemiddelde als basis. Dat is handig om bijvoorbeeld twee prijzen of meetwaarden te vergelijken.</p>' },
    { q: 'Kan een stijging meer dan 100% zijn?', a: '<p>Ja. Verdubbelt een bedrag van 50 naar 100, dan is dat 100% stijging. Van 50 naar 150 is 200% stijging. Een daling kan daarentegen nooit meer dan 100% zijn, behalve als een waarde negatief wordt.</p>' },
    { q: 'Hoe bereken ik de oorspronkelijke prijs vóór korting?', a: '<p>Deel de prijs na korting door (1 − korting ÷ 100). Betaal je € 60 na 25% korting, dan was de oorspronkelijke prijs € 60 ÷ 0,75 = € 80.</p>' },
    { q: 'Wat doet de calculator bij delen door nul?', a: '<p>Een percentage ten opzichte van nul bestaat niet. De calculator laat in dat geval een melding zien in plaats van een uitkomst.</p>' },
  ],
  related: ['btw-berekenen', 'bruto-netto-berekenen', 'rente-op-rente-berekenen'],
  sources: [],
  method: 'De calculator gebruikt de standaard wiskundige procentformules zoals hierboven beschreven. Uitkomsten worden op maximaal vier decimalen getoond.',
  author: null,
  reviewedBy: null,
  lastReviewed: '2026-10-04',
  disclaimer: 'none',
  appCategory: 'UtilitiesApplication',
  popular: true,
};
