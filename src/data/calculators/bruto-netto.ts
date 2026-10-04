import type { CalculatorContent } from '../types';
import { defaultTaxConfig as cfg } from '../../config/tax';

const pct = (r: number) => `${(r * 100).toLocaleString('nl-NL', { maximumFractionDigits: 3 })}%`;
const eur = (n: number) => `€ ${n.toLocaleString('nl-NL')}`;

// Tabellen worden uit de centrale belastingconfiguratie opgebouwd, zodat tekst en berekening nooit uit elkaar lopen.
const bracketRows = cfg.brackets
  .map((b, i) => {
    const from = i === 0 ? 0 : cfg.brackets[i - 1].upTo!;
    const range = b.upTo === null ? `meer dan ${eur(from)}` : i === 0 ? `tot en met ${eur(b.upTo)}` : `${eur(from)} – ${eur(b.upTo)}`;
    return `<tr><td>Schijf ${i + 1}</td><td>${range}</td><td>${pct(b.rate)}</td></tr>`;
  })
  .join('');

const labourRows = cfg.labourCredit
  .map((s) => {
    const range = s.to === null ? `vanaf ${eur(s.from)}` : `${eur(s.from)} – ${eur(s.to)}`;
    const formula =
      s.to === null ? '€ 0' : s.base === 0 ? `${pct(s.rate)} × inkomen` : `${eur(s.base)} ${s.rate < 0 ? '−' : '+'} ${pct(Math.abs(s.rate))} × (inkomen − ${eur(s.from)})`;
    return `<tr><td>${range}</td><td>${formula}</td></tr>`;
  })
  .join('');

export const brutoNetto: CalculatorContent = {
  slug: 'bruto-netto-berekenen',
  name: 'Bruto netto berekenen',
  shortName: 'Bruto-netto',
  category: 'werk-inkomen',
  alsoIn: ['geld'],
  icon: 'wallet',
  description: `Reken je brutoloon om naar een indicatief nettoloon met de belastingtarieven van ${cfg.year}.`,
  keywords: ['bruto netto', 'netto salaris', 'nettoloon', 'brutoloon', 'salaris', 'loonheffing', 'loonbelasting', 'vakantiegeld', 'heffingskorting', 'arbeidskorting', 'bonus', 'dertiende maand', 'netto inkomen'],
  seoTitle: `Bruto netto berekenen ${cfg.year} – Wat is je nettosalaris?`,
  metaDescription: `Bereken je nettoloon uit je brutosalaris met de belastingschijven en heffingskortingen van ${cfg.year}. Inclusief vakantiegeld, bonus, 13e maand en pensioenpremie.`,
  h1: 'Bruto netto berekenen',
  lead: `Vul je brutoloon in en zie een indicatie van je nettoloon per maand en per jaar, op basis van de tarieven van ${cfg.year}.`,
  intro: `
<p>Hoeveel houd je netto over van je brutosalaris? Met deze calculator reken je je bruto maand- of jaarloon om naar een geschat nettobedrag. De berekening gebruikt de officiële belastingschijven, de algemene heffingskorting en de arbeidskorting voor ${cfg.year}, zoals gepubliceerd door de Belastingdienst.</p>
<p>Je kunt vakantiegeld, een bonus, een dertiende maand en je eigen pensioenpremie meenemen. De calculator laat niet alleen je netto maandloon zien, maar ook hoeveel netto je extra's opleveren, je gemiddelde belastingdruk en je marginale tarief. Dat laatste is handig als je wilt weten wat een loonsverhoging netto oplevert.</p>
<p>Dit is een <strong>indicatieve berekening</strong>. Je werkelijke loonstrook kan afwijken door onder meer bijtelling van een auto van de zaak, de werkkostenregeling, reiskostenvergoeding of de manier waarop je werkgever het bijzonder tarief toepast.</p>`,
  howTo: {
    id: 'hoe-bereken-je-netto',
    title: 'Hoe bereken je je nettoloon?',
    html: `
<p>Van bruto naar netto gaat in vier stappen:</p>
<ol>
  <li><strong>Bepaal je belastbaar jaarloon</strong>: je brutoloon × 12, plus vakantiegeld, bonus en eventuele dertiende maand, min je eigen pensioenpremie.</li>
  <li><strong>Bereken de loonheffing per schijf</strong>: over elk deel van je inkomen betaal je het tarief van de schijf waarin het valt.</li>
  <li><strong>Trek de heffingskortingen af</strong>: de algemene heffingskorting en de arbeidskorting verlagen de belasting die je betaalt.</li>
  <li><strong>Netto = bruto − pensioenpremie − loonheffing na kortingen.</strong></li>
</ol>
<p>De loonheffing bestaat uit loonbelasting en premies volksverzekeringen (AOW, Anw en Wlz). De werknemersverzekeringen (zoals WW en WIA) en de Zvw-bijdrage worden in de meeste gevallen door je werkgever betaald en gaan dus niet van je brutoloon af.</p>`,
  },
  formula: {
    title: 'Rekenmodel',
    lines: [
      'Belastbaar = (maandloon × 12) + vakantiegeld + bonus + 13e maand − pensioenpremie',
      'Loonheffing = Σ (deel per schijf × tarief) − algemene heffingskorting − arbeidskorting',
      'Netto per jaar = bruto − pensioenpremie − loonheffing',
    ],
    explanation:
      'Netto per maand is het netto van je vaste loon gedeeld door 12. Het netto van vakantiegeld en bonus berekenen we als wat deze bedragen extra opleveren bovenop je vaste loon. Dat benadert de werking van het bijzonder tarief.',
  },
  extraSections: [
    {
      id: 'belastingschijven',
      title: `Belastingschijven ${cfg.year}`,
      html: `
<p>Voor mensen die nog niet de AOW-leeftijd hebben bereikt, gelden in ${cfg.year} de volgende tarieven in box 1 (inclusief premies volksverzekeringen):</p>
<div class="table-wrap"><table>
  <thead><tr><th>Schijf</th><th>Belastbaar inkomen</th><th>Tarief</th></tr></thead>
  <tbody>${bracketRows}</tbody>
</table></div>`,
    },
    {
      id: 'heffingskortingen',
      title: `Heffingskortingen ${cfg.year}`,
      html: `
<h3>Algemene heffingskorting</h3>
<p>Maximaal ${eur(cfg.generalCredit.max)} bij een inkomen tot ${eur(cfg.generalCredit.phaseOutStart)}. Daarboven neemt de korting af met ${pct(cfg.generalCredit.phaseOutRate)} van het meerdere, tot nul.</p>
<h3>Arbeidskorting</h3>
<div class="table-wrap"><table>
  <thead><tr><th>Arbeidsinkomen</th><th>Arbeidskorting</th></tr></thead>
  <tbody>${labourRows}</tbody>
</table></div>
<p>Door de afbouw van beide kortingen is je marginale tarief bij middeninkomens hoger dan het schijftarief. Dat zie je terug in de calculator.</p>`,
    },
    {
      id: 'uitgangspunten',
      title: 'Uitgangspunten van deze berekening',
      html: `<ul>${cfg.assumptions.map((a) => `<li>${a}</li>`).join('')}</ul>
<p>Woon of werk je in België? De Belgische berekening, met RSZ en bedrijfsvoorheffing, is in voorbereiding. Tot die tijd is deze calculator alleen geschikt voor Nederland.</p>`,
    },
  ],
  examples: [
    { title: '€ 3.000 bruto per maand, zonder vakantiegeld', text: `Jaarloon € 36.000. Loonheffing vóór kortingen: 35,75% × € 36.000 = € 12.870. Algemene heffingskorting ± € 2.714, arbeidskorting ± € 5.498. Loonheffing na kortingen ± € 4.658.`, answer: 'Netto ongeveer € 2.612 per maand.' },
    { title: '€ 4.000 bruto per maand met 8% vakantiegeld', text: 'Jaarloon inclusief vakantiegeld € 51.840. Loonheffing na kortingen ± € 11.788.', answer: 'Netto ongeveer € 40.052 per jaar, waarvan circa € 3.179 per maand en ruim € 1.900 netto vakantiegeld.' },
    { title: 'Wat levert € 100 loonsverhoging op bij € 4.000 bruto?', text: 'Bij dit inkomen ligt het marginale tarief rond de 50%, door het schijftarief plus de afbouw van beide heffingskortingen.', answer: 'Netto ongeveer € 50 per maand extra.' },
  ],
  mistakes: [
    { title: 'Het schijftarief over je hele inkomen rekenen', text: 'Kom je in de tweede schijf, dan betaal je het hogere tarief alleen over het deel boven de grens, niet over je hele inkomen.' },
    { title: 'Vakantiegeld vergeten', text: 'De meeste werknemers krijgen 8% vakantiegeld. Dat telt mee voor je jaarinkomen en dus voor je heffingskortingen.' },
    { title: 'Verwachten dat een bonus net zo belast wordt als je salaris', text: 'Op een bonus of vakantiegeld wordt via het bijzonder tarief ingehouden. Daardoor lijkt de inhouding hoog, maar na de aangifte middelt het grotendeels uit.' },
    { title: 'Loonheffingskorting bij twee werkgevers toepassen', text: 'Pas de loonheffingskorting maar bij één werkgever toe. Anders krijg je de kortingen dubbel en moet je achteraf bijbetalen. Zet het vinkje in de calculator dan uit voor je tweede baan.' },
  ],
  faq: [
    { q: 'Hoeveel is € 3.000 bruto netto?', a: `<p>Met de tarieven van ${cfg.year} en zonder vakantiegeld komt € 3.000 bruto per maand neer op ongeveer € 2.612 netto. Vul je eigen situatie in de calculator in voor een nauwkeuriger beeld.</p>` },
    { q: 'Waarom wijkt mijn loonstrook af van de calculator?', a: '<p>Je werkgever gebruikt de officiële loonbelastingtabellen per maand, die iets anders afronden. Daarnaast kunnen bijtelling, reiskosten, onkostenvergoedingen of inhoudingen voor bijvoorbeeld een fietsplan meetellen. De calculator geeft een indicatie op jaarbasis.</p>' },
    { q: 'Wordt vakantiegeld zwaarder belast?', a: '<p>Op je vakantiegeld wordt het bijzonder tarief toegepast. Dat is gebaseerd op je jaarinkomen en kan hoger uitvallen dan je gevoel zegt. Over het hele jaar gezien betaal je echter het tarief dat bij je totale inkomen hoort.</p>' },
    { q: 'Wat is het verschil tussen loonheffing en inkomstenbelasting?', a: '<p>Loonheffing is een voorheffing: je werkgever houdt die maandelijks in. Met de aangifte inkomstenbelasting wordt na afloop van het jaar gekeken of je te veel of te weinig hebt betaald, bijvoorbeeld door aftrekposten of meerdere inkomstenbronnen.</p>' },
    { q: 'Telt pensioenpremie mee?', a: '<p>Ja. Het werknemersdeel van je pensioenpremie wordt ingehouden vóór de loonheffing. Je betaalt dus minder belasting, maar je netto loon daalt wel. Je vindt het percentage op je loonstrook.</p>' },
    { q: 'Kan ik de calculator gebruiken als ik AOW krijg?', a: '<p>Nog niet. Vanaf de AOW-leeftijd betaal je geen AOW-premie meer en gelden andere tarieven en kortingen. Deze calculator rekent met de tarieven voor mensen onder de AOW-leeftijd.</p>' },
    { q: 'Werkt deze calculator ook voor België?', a: '<p>Nog niet. De Belgische loonberekening werkt met RSZ, bedrijfsvoorheffing en gemeentebelasting. Die versie is in voorbereiding.</p>' },
  ],
  related: ['percentage-berekenen', 'hypotheek-berekenen', 'rente-op-rente-berekenen'],
  sources: cfg.sources,
  method: `Jaarberekening met de box 1-tarieven, algemene heffingskorting en arbeidskorting voor ${cfg.year} (personen onder de AOW-leeftijd). Parameters worden centraal beheerd per land en jaar, zodat ze jaarlijks eenvoudig kunnen worden bijgewerkt.`,
  author: null,
  reviewedBy: null,
  lastReviewed: cfg.checkedOn,
  disclaimer: 'finance',
  appCategory: 'FinanceApplication',
  popular: true,
};
