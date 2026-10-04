import type { CalculatorContent } from '../types';

export const leeftijd: CalculatorContent = {
  slug: 'leeftijd-berekenen',
  name: 'Leeftijd berekenen',
  shortName: 'Leeftijd',
  category: 'datum-tijd',
  icon: 'cake',
  description: 'Je exacte leeftijd in jaren, maanden, weken, dagen en uren, plus je volgende verjaardag.',
  keywords: ['leeftijd', 'hoe oud ben ik', 'geboortedatum', 'verjaardag', 'dagen oud', 'weken oud', 'geboren op welke dag', 'aftellen verjaardag', 'datum verschil'],
  seoTitle: 'Leeftijd berekenen – Hoe oud ben je in jaren, dagen en uren?',
  metaDescription:
    'Bereken je exacte leeftijd vanaf je geboortedatum: in jaren, maanden, weken, dagen en uren. Zie ook op welke dag je geboren bent en hoe lang het nog is tot je verjaardag.',
  h1: 'Leeftijd berekenen',
  lead: 'Vul je geboortedatum in en zie precies hoe oud je bent, tot op de dag en het uur.',
  intro: `
<p>Hoe oud ben je eigenlijk precies? Met deze leeftijdscalculator zie je het meteen: in jaren, maanden en dagen, maar ook het totaal aantal weken, dagen en uren dat je al leeft. Daarnaast laat de calculator zien op welke dag van de week je geboren bent en hoeveel dagen het nog duurt tot je volgende verjaardag.</p>
<p>Je kunt ook een andere peildatum kiezen. Zo bereken je bijvoorbeeld hoe oud iemand was op een bepaalde datum, of hoe oud je bent op de dag van een examen, bruiloft of pensioen. De calculator houdt automatisch rekening met schrikkeljaren en maanden van verschillende lengte. Je geboortedatum wordt alleen in je eigen browser gebruikt en niet opgeslagen.</p>`,
  howTo: {
    id: 'hoe-bereken-je-leeftijd',
    title: 'Hoe bereken je je leeftijd?',
    html: `
<p>Je leeftijd in jaren is het verschil tussen het huidige jaar en je geboortejaar, min één als je dit jaar nog niet jarig bent geweest. Voor een nauwkeuriger antwoord in maanden en dagen gaan we zo te werk:</p>
<ol>
  <li>Tel vanaf je geboortedatum zoveel mogelijk hele maanden tot aan de peildatum.</li>
  <li>Deel dat aantal maanden door 12: het hele getal zijn je jaren, de rest zijn je maanden.</li>
  <li>Tel de dagen die daarna nog overblijven tot de peildatum.</li>
</ol>
<p>Het totaal aantal dagen is simpelweg het aantal kalenderdagen tussen beide datums. Weken zijn dat aantal gedeeld door 7, uren dat aantal maal 24.</p>`,
  },
  formula: {
    title: 'Rekenmethode',
    lines: [
      'Totaal dagen = peildatum − geboortedatum (in kalenderdagen)',
      'Weken = totaal dagen ÷ 7 (naar beneden afgerond)',
      'Uren = totaal dagen × 24',
    ],
    explanation:
      'Bestaat je geboortedag niet in een bepaalde maand, zoals 31 januari in februari, dan rekenen we met de laatste dag van die maand. Wie op 29 februari is geboren, is in gewone jaren op 28 februari jarig.',
  },
  extraSections: [
    {
      id: 'geboren-op-welke-dag',
      title: 'Op welke dag ben je geboren?',
      html: `
<p>Een week heeft zeven dagen en een gewoon jaar 365 dagen: dat is 52 weken en één dag. Daardoor schuift je verjaardag elk jaar één dag van de week op, en in een schrikkeljaar zelfs twee. De calculator rekent terug in de kalender en laat precies zien op welke weekdag je bent geboren.</p>`,
    },
    {
      id: 'schrikkeljaren',
      title: 'Hoe werkt het met schrikkeljaren?',
      html: `
<p>Een jaar is een schrikkeljaar als het deelbaar is door 4, behalve eeuwjaren die niet deelbaar zijn door 400. 2000 was dus wel een schrikkeljaar, 1900 niet. 2028 is het eerstvolgende schrikkeljaar. De calculator verwerkt dit automatisch, waardoor het totaal aantal dagen altijd klopt.</p>`,
    },
  ],
  examples: [
    { title: 'Geboren op 15 mei 1990, peildatum 4 oktober 2026', text: 'Van 15 mei 1990 tot 15 september 2026 zijn 36 jaar en 4 maanden. Daarna nog 19 dagen tot 4 oktober.', answer: '36 jaar, 4 maanden en 19 dagen.' },
    { title: 'Geboren op 31 januari 2000, peildatum 1 maart 2025', text: '25 jaar en 1 maand brengt je op 28 februari 2025 (februari heeft geen 31e). Daarna nog 1 dag.', answer: '25 jaar, 1 maand en 1 dag.' },
    { title: 'Een jaar in dagen', text: 'Van 1 januari tot en met 31 december 2026 tellen we 364 dagen verschil, want 2026 is geen schrikkeljaar.', answer: '364 dagen, oftewel 52 weken.' },
  ],
  mistakes: [
    { title: 'Alleen jaartallen van elkaar aftrekken', text: '2026 − 1990 = 36, maar wie in november jarig is, is in oktober nog 35. Kijk altijd of de verjaardag dit jaar al geweest is.' },
    { title: 'Elke maand als 30 dagen rekenen', text: 'Maanden hebben 28 tot 31 dagen. Wie met 30 dagen per maand rekent, zit er na een paar jaar al flink naast.' },
    { title: 'Schrikkeljaren vergeten', text: 'Iedere vier jaar komt er een dag bij. Over 40 jaar zijn dat ongeveer tien extra dagen.' },
    { title: 'Tijdzones en zomertijd meetellen', text: 'Voor je leeftijd in dagen tellen alleen kalenderdagen. Uren rekenen we als dagen × 24, zonder het uur van geboorte.' },
  ],
  faq: [
    { q: 'Hoeveel dagen oud ben ik?', a: '<p>Vul je geboortedatum in de calculator in. Je ziet direct het totaal aantal dagen, weken en uren dat je leeft.</p>' },
    { q: 'Wanneer ben ik jarig als ik op 29 februari ben geboren?', a: '<p>In een schrikkeljaar gewoon op 29 februari. In andere jaren rekent deze calculator met 28 februari. Sommige mensen vieren het liever op 1 maart; voor officiële zaken kan dat per land en instantie verschillen.</p>' },
    { q: 'Kan ik iemands leeftijd op een datum in het verleden berekenen?', a: '<p>Ja. Zet een andere datum bij “Leeftijd op datum”. Zo zie je bijvoorbeeld hoe oud je opa was toen hij trouwde.</p>' },
    { q: 'Waarom komt het aantal weken niet precies uit?', a: '<p>Omdat het totaal aantal dagen zelden precies deelbaar is door 7. De calculator toont het aantal hele weken en de dagen die daarna overblijven.</p>' },
    { q: 'Wordt mijn geboortedatum opgeslagen?', a: '<p>Nee. De berekening gebeurt volledig in je browser. We sturen je geboortedatum niet naar een server en slaan hem niet op.</p>' },
  ],
  related: ['ovulatie-berekenen', 'bmi-berekenen', 'caloriebehoefte-berekenen'],
  sources: [],
  method: 'Kalenderberekening op basis van de gregoriaanse kalender, uitgevoerd in UTC zodat zomer- en wintertijd geen invloed hebben. Maanden worden geteld als hele kalendermaanden vanaf de geboortedatum.',
  author: null,
  reviewedBy: null,
  lastReviewed: '2026-10-04',
  disclaimer: 'none',
  appCategory: 'UtilitiesApplication',
  popular: true,
};
