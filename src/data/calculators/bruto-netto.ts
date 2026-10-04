import type { CalculatorContent } from '../types';
import { defaultBeConfig as be, defaultNlConfig as nl } from '../../config/tax';

const pct = (r: number) => `${(r * 100).toLocaleString('nl-NL', { maximumFractionDigits: 3 })}%`;
const eur = (n: number) => `€ ${n.toLocaleString('nl-NL', { maximumFractionDigits: 2 })}`;

// Tabellen worden uit de centrale belastingconfiguratie opgebouwd, zodat tekst en berekening nooit uit elkaar lopen.
function bracketRows(brackets: { upTo: number | null; rate: number }[]) {
  return brackets
    .map((b, i) => {
      const from = i === 0 ? 0 : brackets[i - 1].upTo!;
      const range = b.upTo === null ? `meer dan ${eur(from)}` : i === 0 ? `tot ${eur(b.upTo)}` : `${eur(from)} – ${eur(b.upTo)}`;
      return `<tr><td>${range}</td><td>${pct(b.rate)}</td></tr>`;
    })
    .join('');
}

const nlLabourRows = nl.labourCredit
  .map((s) => {
    const range = s.to === null ? `vanaf ${eur(s.from)}` : `${eur(s.from)} – ${eur(s.to)}`;
    const formula =
      s.to === null ? '€ 0' : s.base === 0 ? `${pct(s.rate)} × inkomen` : `${eur(s.base)} ${s.rate < 0 ? '−' : '+'} ${pct(Math.abs(s.rate))} × (inkomen − ${eur(s.from)})`;
    return `<tr><td>${range}</td><td>${formula}</td></tr>`;
  })
  .join('');

const childRows = be.childReductions
  .slice(1)
  .map((v, i) => `<tr><td>${i + 1}</td><td>${eur(v)}</td></tr>`)
  .join('');

const wbB = be.workBonus.bediende;

export const brutoNetto: CalculatorContent = {
  slug: 'bruto-netto-berekenen',
  name: 'Bruto netto berekenen',
  shortName: 'Bruto-netto',
  category: 'werk-inkomen',
  alsoIn: ['geld'],
  icon: 'wallet',
  description: `Bereken je nettoloon uit je brutoloon met de officiële regels van ${be.year} voor België en Nederland.`,
  keywords: ['bruto netto', 'netto loon', 'nettoloon', 'brutoloon', 'salaris', 'bedrijfsvoorheffing', 'rsz', 'werkbonus', 'loonbrief', 'bediende', 'arbeider', 'loonheffing', 'vakantiegeld', 'belgie', 'nederland'],
  seoTitle: `Bruto netto berekenen ${be.year} – Nettoloon België & Nederland`,
  metaDescription: `Bereken je nettoloon in België met RSZ, werkbonus en de officiële sleutelformule bedrijfsvoorheffing ${be.year}. Voor bedienden en arbeiders, met gezinssituatie en kinderen. Ook voor Nederland.`,
  h1: 'Bruto netto berekenen',
  lead: `Vul je bruto maandloon in en zie direct je netto loon, berekend volgens de officiële regels van ${be.year}.`,
  intro: `
<p>Hoeveel houd je netto over van je brutoloon? Met deze calculator zie je het in een paar seconden. Voor België rekenen we je loon stap voor stap om, net zoals je werkgever of sociaal secretariaat dat doet: eerst de persoonlijke RSZ-bijdrage van ${pct(be.rszRate)}, eventueel verminderd met de werkbonus, daarna de bedrijfsvoorheffing volgens de officiële sleutelformule van de FOD Financiën en tot slot de bijzondere bijdrage voor de sociale zekerheid.</p>
<p>Je kiest of je bediende of arbeider bent, wat je gezinssituatie is en hoeveel kinderen je ten laste hebt. Dat heeft allemaal invloed op je netto loon. Werk je in Nederland? Kies dan bovenaan “Nederland ${nl.year}”: dan rekent de calculator met de Nederlandse loonheffing en heffingskortingen.</p>
<p>Dit is een <strong>indicatieve berekening</strong>. Je loonbrief kan afwijken door bijvoorbeeld maaltijdcheques, een bedrijfswagen, groepsverzekering of woon-werkvergoeding. De definitieve belasting volgt pas via je aangifte personenbelasting.</p>`,
  howTo: {
    id: 'hoe-bereken-je-netto',
    title: 'Hoe bereken je je nettoloon in België?',
    html: `
<p>Van bruto naar netto gaat in België in drie stappen.</p>
<h3>1. Persoonlijke RSZ-bijdrage</h3>
<p>Op je brutoloon wordt ${pct(be.rszRate)} sociale zekerheid ingehouden. Voor arbeiders gebeurt dat op 108% van het brutoloon, omdat hun vakantiegeld anders wordt geregeld. Heb je een laag of bescheiden loon, dan krijg je de <strong>sociale werkbonus</strong>: een korting op die RSZ-bijdrage. Voor een bediende is die maximaal ${eur(wbB.a.amount + wbB.b.amount)} per maand en verdwijnt hij geleidelijk tot een brutoloon van ${eur(wbB.a.zero)}.</p>
<h3>2. Bedrijfsvoorheffing</h3>
<p>Op het loon na RSZ houdt je werkgever een voorschot op je personenbelasting in: de bedrijfsvoorheffing. Die wordt berekend met de sleutelformule van de FOD Financiën:</p>
<ol>
  <li>Belastbaar maandloon × 12 = bruto jaarinkomen.</li>
  <li>Min forfaitaire beroepskosten: ${pct(be.professionalCosts.rate)}, maximaal ${eur(be.professionalCosts.max)}.</li>
  <li>Belasting volgens de schaal hieronder, min de belasting op de belastingvrije som van ${eur(be.taxFreeAllowance.amount)}.</li>
  <li>Min verminderingen voor kinderen ten laste en andere gezinslasten.</li>
  <li>Gedeeld door 12, min de fiscale werkbonus.</li>
</ol>
<h3>3. Bijzondere bijdrage voor de sociale zekerheid</h3>
<p>Tot slot wordt een kleine bijdrage ingehouden die afhangt van je loon en gezinssituatie, voor een alleenstaande maximaal ${eur(be.specialContribution.individualMax.amount)} per maand.</p>`,
  },
  formula: {
    title: 'Rekenmodel België',
    lines: [
      `RSZ = brutoloon × ${pct(be.rszRate)} − sociale werkbonus`,
      'Belastbaar loon = brutoloon − RSZ',
      'Bedrijfsvoorheffing = sleutelformule (jaarbasis) ÷ 12 − fiscale werkbonus',
      'Netto = brutoloon − RSZ − bedrijfsvoorheffing − bijzondere bijdrage',
    ],
    explanation: `De basisschaal van de bedrijfsvoorheffing bevat al een opslag van 7% voor de gemeentebelasting. Daardoor zijn de percentages iets hoger dan de wettelijke tarieven van de personenbelasting.`,
  },
  extraSections: [
    {
      id: 'schaal-bedrijfsvoorheffing',
      title: `Schaal bedrijfsvoorheffing ${be.year}`,
      html: `
<p>De sleutelformule gebruikt deze basisschaal op het belastbaar netto jaarinkomen (na aftrek van de beroepskosten):</p>
<div class="table-wrap"><table>
  <thead><tr><th>Belastbaar netto jaarinkomen</th><th>Tarief</th></tr></thead>
  <tbody>${bracketRows(be.brackets)}</tbody>
</table></div>
<p>Van de uitkomst gaat ${eur(be.taxFreeAllowance.tax)} af: de belasting op de belastingvrije som van ${eur(be.taxFreeAllowance.amount)}. Heeft je partner geen beroepsinkomen, dan wordt ${pct(be.marriageQuotient.rate)} van je inkomen (maximaal ${eur(be.marriageQuotient.max)}) fiscaal aan je partner toegewezen: het huwelijksquotiënt. Dat verlaagt de belasting flink.</p>`,
    },
    {
      id: 'kinderen-ten-laste',
      title: 'Vermindering voor kinderen ten laste',
      html: `
<div class="table-wrap"><table>
  <thead><tr><th>Aantal kinderen</th><th>Vermindering per jaar</th></tr></thead>
  <tbody>${childRows}</tbody>
</table></div>
<p>Boven acht kinderen komt er ${eur(be.childReductionExtra)} per extra kind bij. Een kind met een handicap telt voor twee. Ben je een alleenstaande ouder, dan krijg je nog eens ${eur(be.singleParentReduction)} extra vermindering. Bij tweeverdieners krijgt meestal één partner de vermindering voor de kinderen; vul de kinderen dan alleen in bij die partner.</p>`,
    },
    {
      id: 'vakantiegeld-eindejaarspremie',
      title: 'Vakantiegeld en eindejaarspremie',
      html: `
<p>In de calculator zie je je gewone netto maandloon. Daarnaast krijg je als werknemer in België meestal:</p>
<ul>
  <li><strong>Dubbel vakantiegeld</strong>: voor bedienden ongeveer 92% van een maandloon, meestal in mei of juni. Arbeiders krijgen hun vakantiegeld via de vakantiekas.</li>
  <li><strong>Eindejaarspremie</strong> (dertiende maand): afhankelijk van je paritair comité, meestal in december.</li>
</ul>
<p>Op deze bedragen wordt bedrijfsvoorheffing ingehouden volgens aparte, hogere percentages (de schaal voor exceptionele vergoedingen). Daarom houd je er netto relatief minder van over, en daarom tellen ze niet mee in het netto jaarbedrag van deze calculator.</p>`,
    },
    {
      id: 'nederland',
      title: `Bruto netto in Nederland (${nl.year})`,
      html: `
<p>Werk je in Nederland, kies dan bovenaan “Nederland ${nl.year}”. De calculator rekent dan met de loonheffing (loonbelasting en premies volksverzekeringen) en de heffingskortingen van de Belastingdienst, inclusief vakantiegeld, bonus, dertiende maand en pensioenpremie.</p>
<div class="table-wrap"><table>
  <thead><tr><th>Belastbaar inkomen (box 1)</th><th>Tarief</th></tr></thead>
  <tbody>${bracketRows(nl.brackets)}</tbody>
</table></div>
<p><strong>Algemene heffingskorting</strong>: maximaal ${eur(nl.generalCredit.max)}, afbouw met ${pct(nl.generalCredit.phaseOutRate)} vanaf ${eur(nl.generalCredit.phaseOutStart)}.</p>
<div class="table-wrap"><table>
  <thead><tr><th>Arbeidsinkomen</th><th>Arbeidskorting</th></tr></thead>
  <tbody>${nlLabourRows}</tbody>
</table></div>`,
    },
    {
      id: 'uitgangspunten',
      title: 'Uitgangspunten van deze berekening',
      html: `<h3>België</h3><ul>${be.assumptions.map((a) => `<li>${a}</li>`).join('')}</ul>
<h3>Nederland</h3><ul>${nl.assumptions.map((a) => `<li>${a}</li>`).join('')}</ul>`,
    },
  ],
  examples: [
    { title: '€ 3.500 bruto, bediende, alleenstaand, geen kinderen', text: 'RSZ € 457,45. Belastbaar € 3.042,55. Bedrijfsvoorheffing € 617,41. Bijzondere bijdrage € 24,74.', answer: 'Netto ongeveer € 2.400,40 per maand.' },
    { title: '€ 2.200 bruto, bediende, alleenstaand', text: 'De werkbonus (€ 287,54) valt even hoog uit als de RSZ-bijdrage, dus er wordt geen RSZ ingehouden. Dankzij de fiscale werkbonus daalt ook de bedrijfsvoorheffing, tot € 126,28.', answer: 'Netto ongeveer € 2.063,28 per maand.' },
    { title: '€ 4.000 bruto, partner zonder inkomen, 2 kinderen', text: 'Door het huwelijksquotiënt en € 1.656 vermindering voor 2 kinderen bedraagt de bedrijfsvoorheffing slechts € 269,18.', answer: 'Netto ongeveer € 3.173,67 per maand.' },
  ],
  mistakes: [
    { title: 'Het netto van een collega vergelijken', text: 'Gezinssituatie, kinderen ten laste en je statuut maken een groot verschil. Twee mensen met hetzelfde brutoloon kunnen honderden euro\'s netto verschil hebben.' },
    { title: 'Bedrijfsvoorheffing zien als je definitieve belasting', text: 'De bedrijfsvoorheffing is een voorschot. Via je aangifte personenbelasting krijg je terug of betaal je bij, bijvoorbeeld door kinderopvang, giften of een woonlening.' },
    { title: 'Vakantiegeld en eindejaarspremie meetellen in je maandloon', text: 'Die worden apart en zwaarder belast. Reken je ze gewoon mee als extra maandloon, dan overschat je je netto inkomen.' },
    { title: 'Maaltijdcheques en extralegale voordelen vergeten', text: 'Maaltijdcheques, ecocheques en een bedrijfswagen staan niet in je netto loon, maar zijn wel deel van je verloning. Een bedrijfswagen verhoogt bovendien je belastbaar loon (voordeel alle aard).' },
  ],
  faq: [
    { q: 'Hoeveel is € 3.500 bruto netto in België?', a: `<p>Voor een alleenstaande bediende zonder kinderen ongeveer € 2.400 netto per maand, volgens de regels van ${be.year}. Heb je kinderen ten laste of een partner zonder inkomen, dan ligt je netto loon hoger.</p>` },
    { q: 'Wat is het verschil tussen bediende en arbeider?', a: '<p>Voor arbeiders wordt de RSZ-bijdrage berekend op 108% van het brutoloon. Dat compenseert het feit dat hun vakantiegeld via de vakantiekas wordt uitbetaald in plaats van door de werkgever. Bij hetzelfde brutoloon houdt een arbeider per maand daardoor iets minder netto over.</p>' },
    { q: 'Wat is de werkbonus?', a: `<p>Een korting op de RSZ-bijdrage voor lage en bescheiden lonen (sociale werkbonus), aangevuld met een korting op de bedrijfsvoorheffing (fiscale werkbonus). Voor een voltijdse bediende verdwijnt de werkbonus vanaf een brutoloon van ${eur(wbB.a.zero)} per maand.</p>` },
    { q: 'Waarom wijkt mijn loonbrief af?', a: '<p>Je loonbrief kan extra inhoudingen of vergoedingen bevatten, zoals groepsverzekering, maaltijdcheques (eigen bijdrage), woon-werkverkeer, thuiswerkvergoeding of het voordeel van een bedrijfswagen. Ook bij deeltijds werk of een onvolledige maand verandert de berekening.</p>' },
    { q: 'Kan ik via de calculator mijn belastingteruggave voorspellen?', a: '<p>Nee. De calculator berekent de bedrijfsvoorheffing die maandelijks wordt ingehouden. Je uiteindelijke personenbelasting hangt af van je totale inkomen, je gemeentebelasting en fiscale aftrekken zoals kinderopvang en giften.</p>' },
    { q: 'Werkt de calculator ook voor Nederland?', a: `<p>Ja. Kies bovenaan “Nederland ${nl.year}”. Dan rekent de calculator met de Nederlandse belastingschijven, de algemene heffingskorting en de arbeidskorting, inclusief vakantiegeld en bonus.</p>` },
    { q: 'Is dit geschikt voor zelfstandigen?', a: '<p>Nee. Zelfstandigen betalen sociale bijdragen via een sociaal verzekeringsfonds en voorafbetalingen in plaats van bedrijfsvoorheffing. Deze calculator is bedoeld voor werknemers in loondienst.</p>' },
  ],
  related: ['percentage-berekenen', 'hypotheek-berekenen', 'rente-op-rente-berekenen'],
  sources: [...be.sources, ...nl.sources],
  method: `België: persoonlijke RSZ (${pct(be.rszRate)}), sociale en fiscale werkbonus (bedragen vanaf 1 september ${be.year}), bedrijfsvoorheffing volgens de officiële sleutelformule ${be.year} en bijzondere bijdrage sociale zekerheid. Nederland: box 1-tarieven, algemene heffingskorting en arbeidskorting ${nl.year}. Alle parameters worden centraal per land en jaar beheerd.`,
  author: null,
  reviewedBy: null,
  lastReviewed: be.checkedOn,
  disclaimer: 'finance',
  appCategory: 'FinanceApplication',
  popular: true,
};
