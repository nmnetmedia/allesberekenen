import type { CalculatorContent } from '../types';

export const bmi: CalculatorContent = {
  slug: 'bmi-berekenen',
  name: 'BMI berekenen',
  shortName: 'BMI',
  category: 'gezondheid',
  icon: 'scale',
  description: 'Bereken je Body Mass Index en zie welk gewicht bij jouw lengte gezond is.',
  keywords: ['bmi', 'body mass index', 'bmi calculator', 'gezond gewicht', 'overgewicht', 'ondergewicht', 'obesitas', 'quetelet', 'lengte gewicht'],
  seoTitle: 'BMI berekenen – Bereken je Body Mass Index en gezond gewicht',
  metaDescription:
    'Bereken je BMI met je lengte en gewicht en zie direct je categorie en het gezonde gewichtsbereik voor jouw lengte. Met uitleg over wat BMI wel en niet zegt.',
  h1: 'BMI berekenen',
  lead: 'Vul je gewicht en lengte in en zie direct je BMI, de bijbehorende categorie en het gezonde gewicht voor jouw lengte.',
  intro: `
<p>De Body Mass Index (BMI) is een veelgebruikte maat om in te schatten of je gewicht in verhouding is tot je lengte. Met deze calculator bereken je je BMI in een paar seconden. Je ziet direct in welke categorie je valt en welk gewicht bij jouw lengte binnen het gezonde bereik ligt.</p>
<p>De BMI is bedoeld voor volwassenen vanaf 18 jaar. Vul je optioneel je leeftijd in, dan houdt de calculator rekening met het advies van het Voedingscentrum voor 70-plussers, voor wie een iets hogere BMI als gezond wordt gezien. Voor kinderen en tieners werkt de gewone BMI-indeling niet; daar gelden leeftijds- en geslachtsafhankelijke grenzen.</p>
<p>Belangrijk om te weten: de BMI is een algemene indicatie en geen medische diagnose. Hij zegt niets over je spiermassa, vetverdeling of conditie.</p>`,
  howTo: {
    id: 'hoe-bereken-je-bmi',
    title: 'Hoe bereken je je BMI?',
    html: `
<p>Je BMI bereken je door je gewicht in kilogram te delen door je lengte in meter in het kwadraat. Een kwadraat betekent: het getal met zichzelf vermenigvuldigen.</p>
<ol>
  <li>Zet je lengte om naar meter: 175 cm wordt 1,75 m.</li>
  <li>Vermenigvuldig je lengte met zichzelf: 1,75 × 1,75 = 3,0625.</li>
  <li>Deel je gewicht door die uitkomst: 70 ÷ 3,0625 = <strong>22,9</strong>.</li>
</ol>
<p>Andersom kun je ook je gezonde gewicht uitrekenen: vermenigvuldig je lengte in het kwadraat met 18,5 en met 24,9. Bij 1,75 m levert dat een gezond gewicht op tussen ongeveer 56,7 en 76,3 kg.</p>`,
  },
  formula: {
    title: 'BMI-formule',
    lines: ['BMI = gewicht (kg) ÷ (lengte (m) × lengte (m))'],
    explanation:
      'Deze formule is in de 19e eeuw bedacht door de Belgische wiskundige Adolphe Quetelet en wordt wereldwijd gebruikt, onder meer door de Wereldgezondheidsorganisatie (WHO).',
  },
  extraSections: [
    {
      id: 'bmi-tabel',
      title: 'BMI-tabel voor volwassenen',
      html: `
<div class="table-wrap"><table>
  <thead><tr><th>BMI</th><th>Categorie</th></tr></thead>
  <tbody>
    <tr><td>lager dan 18,5</td><td>Ondergewicht</td></tr>
    <tr><td>18,5 tot 25</td><td>Gezond gewicht</td></tr>
    <tr><td>25 tot 30</td><td>Overgewicht</td></tr>
    <tr><td>30 of hoger</td><td>Obesitas (ernstig overgewicht)</td></tr>
  </tbody>
</table></div>
<p>Voor mensen van 70 jaar en ouder adviseert het Voedingscentrum een BMI tussen 22 en 28. Een paar kilo extra kan op hogere leeftijd een buffer zijn bij ziekte.</p>`,
    },
    {
      id: 'wat-zegt-bmi-niet',
      title: 'Wat zegt je BMI niet?',
      html: `
<p>De BMI kijkt alleen naar lengte en gewicht. Daardoor mist hij een aantal belangrijke dingen:</p>
<ul>
  <li><strong>Spiermassa</strong>: spieren wegen meer dan vet. Een getrainde sporter kan een BMI boven 25 hebben zonder overgewicht.</li>
  <li><strong>Vetverdeling</strong>: buikvet is ongunstiger voor je gezondheid dan vet op heupen of benen. Je middelomtrek zegt daar meer over.</li>
  <li><strong>Lichaamsbouw en afkomst</strong>: bij sommige bevolkingsgroepen, bijvoorbeeld mensen van Aziatische afkomst, nemen gezondheidsrisico's al bij een lagere BMI toe.</li>
  <li><strong>Zwangerschap</strong>: tijdens een zwangerschap is de BMI niet bruikbaar.</li>
</ul>`,
    },
  ],
  examples: [
    { title: 'Iemand van 182 cm en 85 kg', text: '1,82 × 1,82 = 3,3124. 85 ÷ 3,3124 = 25,7.', answer: 'BMI 25,7: net in de categorie overgewicht.' },
    { title: 'Iemand van 165 cm en 58 kg', text: '1,65 × 1,65 = 2,7225. 58 ÷ 2,7225 = 21,3.', answer: 'BMI 21,3: gezond gewicht.' },
    { title: 'Gezond gewicht bij 190 cm', text: '1,90 × 1,90 = 3,61. 3,61 × 18,5 = 66,8 en 3,61 × 24,9 = 89,9.', answer: 'Gezond gewicht: ongeveer 66,8 tot 89,9 kg.' },
  ],
  mistakes: [
    { title: 'Lengte in centimeters invullen in de formule', text: 'Rekenen met 175 in plaats van 1,75 geeft een onzinnig kleine uitkomst. De formule werkt met meters. Onze calculator rekent centimeters automatisch om.' },
    { title: 'De BMI voor kinderen gebruiken', text: 'Voor kinderen en jongeren tot 18 jaar gelden andere grenswaarden, afhankelijk van leeftijd en geslacht. Bespreek het gewicht van je kind met het consultatiebureau, de jeugdarts of de huisarts.' },
    { title: 'BMI zien als maat voor vet', text: 'De BMI meet geen lichaamsvet. Twee mensen met dezelfde BMI kunnen een heel ander vetpercentage hebben.' },
    { title: 'Conclusies trekken uit één meting', text: 'Je gewicht schommelt gedurende de dag met een tot twee kilo. Weeg jezelf voor een eerlijke vergelijking steeds op hetzelfde moment, bijvoorbeeld \'s ochtends voor het ontbijt.' },
  ],
  faq: [
    { q: 'Wat is een gezond BMI?', a: '<p>Voor volwassenen tot 70 jaar geldt een BMI tussen 18,5 en 25 als gezond. Voor 70-plussers adviseert het Voedingscentrum een BMI tussen 22 en 28.</p>' },
    { q: 'Is de BMI voor mannen en vrouwen hetzelfde?', a: '<p>Ja, voor volwassenen gelden dezelfde grenswaarden. Vrouwen hebben bij dezelfde BMI gemiddeld wel een hoger vetpercentage dan mannen. Daarom vragen we je geslacht alleen optioneel; het verandert de BMI zelf niet.</p>' },
    { q: 'Ik sport veel en heb toch overgewicht volgens de BMI. Klopt dat?', a: '<p>Dat kan goed. Spieren zijn zwaar, waardoor gespierde mensen een hoge BMI kunnen hebben zonder overtollig vet. Een middelomtrekmeting of vetpercentagemeting geeft dan een beter beeld.</p>' },
    { q: 'Hoe meet ik mijn middelomtrek?', a: '<p>Meet halverwege je onderste rib en de bovenkant van je heupbot, na een normale uitademing. Het Voedingscentrum spreekt bij vrouwen vanaf 80 cm en bij mannen vanaf 94 cm van een verhoogd gezondheidsrisico, en vanaf 88 cm (vrouwen) en 102 cm (mannen) van een sterk verhoogd risico.</p>' },
    { q: 'Kan ik de BMI gebruiken tijdens mijn zwangerschap?', a: '<p>Nee. Tijdens de zwangerschap neemt je gewicht om goede redenen toe. Je verloskundige of gynaecoloog gebruikt je BMI van vóór de zwangerschap als uitgangspunt.</p>' },
    { q: 'Wat moet ik doen als mijn BMI te hoog of te laag is?', a: '<p>Een BMI buiten het gezonde bereik is een signaal, geen diagnose. Bespreek het met je huisarts, zeker als je ook andere klachten hebt. Een diëtist kan je helpen met persoonlijk voedingsadvies.</p>' },
  ],
  related: ['caloriebehoefte-berekenen', 'leeftijd-berekenen', 'ovulatie-berekenen'],
  sources: [
    { label: 'Voedingscentrum – Heb ik een gezond gewicht?', url: 'https://www.voedingscentrum.nl/nl/afvallen/heb-ik-een-gezond-gewicht.aspx' },
    { label: 'World Health Organization – Body mass index (BMI)', url: 'https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/body-mass-index' },
  ],
  method: 'BMI = gewicht ÷ lengte². Categorieën volgens de WHO-indeling voor volwassenen; voor 70-plussers tonen we daarnaast het bereik van 22–28 dat het Voedingscentrum aanhoudt.',
  author: null,
  reviewedBy: null,
  lastReviewed: '2026-10-04',
  disclaimer: 'health',
  appCategory: 'HealthApplication',
  popular: true,
};
