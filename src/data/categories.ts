import type { Category, CategoryKey } from './types';

export const categories: Category[] = [
  {
    key: 'geld',
    slug: 'geld',
    name: 'Geld',
    icon: 'coins',
    seoTitle: 'Geld berekenen – BTW, percentages, rente en hypotheek',
    metaDescription:
      'Gratis geldcalculators: reken BTW om, bereken percentages en kortingen, zie hoe rente op rente groeit en schat je hypotheeklasten. Direct resultaat.',
    h1: 'Geld berekenen',
    description: 'BTW, percentages, kortingen, rente op rente en hypotheeklasten.',
    intro:
      '<p>Of je nu een factuur opstelt, een korting checkt of wilt weten wat je spaargeld over twintig jaar waard is: bij geldzaken telt elke komma. Op deze pagina vind je onze calculators voor alledaagse en grotere financiële vragen. Ze rekenen direct terwijl je typt, laten de gebruikte formule zien en werken net zo prettig op je telefoon als op een laptop.</p><p>De uitkomsten zijn bedoeld om snel inzicht te krijgen. Voor beslissingen met grote gevolgen, zoals het afsluiten van een hypotheek, blijft persoonlijk advies van een erkend adviseur belangrijk.</p>',
    groups: [
      {
        title: 'Belasting en prijzen',
        text: 'Reken bedragen om tussen inclusief en exclusief BTW, of bereken wat een korting of prijsstijging in procenten betekent.',
        calculators: ['btw-berekenen', 'percentage-berekenen'],
      },
      {
        title: 'Sparen en beleggen',
        text: 'Zie hoe een startbedrag en maandelijkse inleg door samengestelde rente groeien, jaar voor jaar.',
        calculators: ['rente-op-rente-berekenen'],
      },
      {
        title: 'Lenen en wonen',
        text: 'Schat de maandlasten, totale rente en het aflossingsverloop van een annuïteiten- of lineaire hypotheek.',
        calculators: ['hypotheek-berekenen'],
      },
    ],
    body: [
      {
        title: 'Waarom zelf narekenen loont',
        html: '<p>Een prijs “inclusief BTW” of een rendement “per jaar” klinkt eenvoudig, maar kleine verschillen in uitgangspunten maken grote verschillen in de uitkomst. Rekent een webshop korting over de prijs met of zonder BTW? Wordt rente per maand of per jaar bijgeschreven? Door het zelf na te rekenen, weet je precies waar een bedrag vandaan komt.</p><p>Bij iedere calculator leggen we daarom uit welke formule we gebruiken, met een uitgewerkt rekenvoorbeeld dat je met de hand kunt controleren.</p>',
      },
      {
        title: 'Indicatief, niet bindend',
        html: '<p>Onze geldcalculators rekenen met de gegevens die jij invult en met openbare tarieven waar dat van toepassing is. Ze kennen jouw volledige financiële situatie niet. Gebruik de uitkomst als startpunt voor een gesprek met je boekhouder, bank of financieel adviseur, niet als vervanging daarvan.</p>',
      },
    ],
  },
  {
    key: 'gezondheid',
    slug: 'gezondheid',
    name: 'Gezondheid',
    icon: 'heart',
    seoTitle: 'Gezondheid berekenen – BMI, caloriebehoefte en ovulatie',
    metaDescription:
      'Bereken je BMI en gezond gewicht, je dagelijkse caloriebehoefte met de Mifflin-St Jeor-formule of je vruchtbare dagen. Gratis, snel en met uitleg.',
    h1: 'Gezondheid berekenen',
    description: 'BMI, caloriebehoefte en een schatting van je vruchtbare dagen.',
    intro:
      '<p>Cijfers over je lichaam geven houvast, zolang je weet wat ze wel en niet zeggen. Met deze calculators bereken je snel je BMI en gezonde gewichtsbereik, hoeveel energie je lichaam per dag ongeveer verbruikt en wanneer je eisprong waarschijnlijk plaatsvindt.</p><p>Bij elke calculator leggen we uit op welke formule of richtlijn de berekening is gebaseerd en waar de grenzen van die methode liggen. Geen enkele uitkomst is een medische diagnose: twijfel je over je gezondheid, gewicht of vruchtbaarheid, neem dan contact op met je huisarts.</p>',
    groups: [
      {
        title: 'Gewicht en lichaam',
        text: 'Bereken je Body Mass Index en zie welk gewicht bij jouw lengte binnen het gezonde bereik valt.',
        calculators: ['bmi-berekenen'],
      },
      {
        title: 'Voeding en energie',
        text: 'Schat je ruststofwisseling (BMR) en totale dagelijkse energieverbruik (TDEE), met richtwaarden voor afvallen of aankomen.',
        calculators: ['caloriebehoefte-berekenen'],
      },
      {
        title: 'Cyclus en zwangerschapswens',
        text: 'Bereken je geschatte eisprong, vruchtbare periode en volgende menstruatie in een overzichtelijke kalender.',
        calculators: ['ovulatie-berekenen'],
      },
    ],
    body: [
      {
        title: 'Een indicatie, geen diagnose',
        html: '<p>Formules als de BMI en Mifflin-St Jeor zijn ontwikkeld om op groepsniveau bruikbare schattingen te maken. Voor een individu kunnen ze afwijken: een gespierde sporter heeft al snel een “te hoge” BMI, en twee mensen met dezelfde lengte en hetzelfde gewicht kunnen een heel verschillend energieverbruik hebben.</p><p>Zie de uitkomsten daarom als een eerste indicatie. Voor persoonlijk advies over gewicht, voeding of vruchtbaarheid kun je terecht bij je huisarts, een diëtist of verloskundige.</p>',
      },
      {
        title: 'Waar baseren we ons op?',
        html: '<p>We gebruiken internationaal gangbare formules en, waar beschikbaar, Nederlandse richtlijnen van organisaties als het Voedingscentrum. Bij elke calculator staat een bronvermelding en de datum waarop we de inhoud voor het laatst hebben gecontroleerd. Lees op <a href="/werkwijze">onze werkwijze</a> hoe we dat doen.</p>',
      },
    ],
  },
  {
    key: 'wonen',
    slug: 'wonen',
    name: 'Wonen',
    icon: 'home',
    seoTitle: 'Wonen berekenen – m² en hypotheek calculators',
    metaDescription:
      'Bereken de oppervlakte van je kamers in m² inclusief snijverlies, of schat de maandlasten van je hypotheek. Handig bij verbouwen, verhuizen en kopen.',
    h1: 'Wonen berekenen',
    description: 'Oppervlakte in m², materiaal met snijverlies en hypotheeklasten.',
    intro:
      '<p>Een nieuwe vloer, een likje verf of een huis kopen: bij wonen draait veel om twee vragen. Hoeveel heb ik nodig, en wat gaat het kosten? Met de m²-calculator bereken je in een paar tellen de oppervlakte van één of meerdere ruimtes, inclusief een marge voor snijverlies. De hypotheekcalculator geeft een eerste beeld van je maandlasten en de totale rente over de looptijd.</p><p>Beide tools rekenen direct terwijl je typt en werken prima op je telefoon, ook als je met een rolmaat in de hand in de kamer staat.</p>',
    groups: [
      {
        title: 'Verbouwen en inrichten',
        text: 'Bereken vloeroppervlakte voor laminaat, tegels, pvc of tapijt, en tel meerdere kamers bij elkaar op.',
        calculators: ['m2-berekenen'],
      },
      {
        title: 'Huis kopen',
        text: 'Schat de bruto maandlasten van een annuïteiten- of lineaire hypotheek en zie hoeveel rente je in totaal betaalt.',
        calculators: ['hypotheek-berekenen'],
      },
    ],
    body: [
      {
        title: 'Meet twee keer, bestel één keer',
        html: '<p>De meest voorkomende fout bij klussen is te krap bestellen. Een pak laminaat of een doos tegels uit een andere productiebatch kan net een andere kleur hebben. Reken daarom altijd met snijverlies: 5% voor eenvoudige rechthoekige ruimtes, 10% of meer bij visgraatpatronen, schuine wanden of veel hoekjes.</p>',
      },
      {
        title: 'Hypotheek: begin met een indicatie',
        html: '<p>Een hypotheekberekening op internet helpt je om bedragen te vergelijken, maar zegt nog niets over hoeveel je mag lenen. Dat hangt af van je inkomen, je verplichtingen, de energiezuinigheid van de woning en de regels van het moment. Laat je voor een definitieve keuze adviseren door een erkend hypotheekadviseur.</p>',
      },
    ],
  },
  {
    key: 'werk-inkomen',
    slug: 'werk-inkomen',
    name: 'Werk & inkomen',
    icon: 'briefcase',
    seoTitle: 'Werk & inkomen – bruto netto en salaris berekenen',
    metaDescription:
      'Bereken je nettoloon uit je brutosalaris op basis van de belastingtarieven van 2026, inclusief vakantiegeld en bonus. Plus handige rekentools rond werk.',
    h1: 'Werk & inkomen berekenen',
    description: 'Van bruto naar netto, vakantiegeld en procentuele loonsverhoging.',
    intro:
      '<p>Wat houd je over van je brutosalaris? Wat levert een loonsverhoging van 3% echt op? En hoeveel netto vakantiegeld komt er in mei op je rekening? Op deze pagina vind je calculators die je helpen om je inkomen te begrijpen.</p><p>De bruto-nettocalculator rekent met de officiële belastingschijven en heffingskortingen voor 2026. Omdat ieders situatie anders is, blijft de uitkomst een indicatie: je loonstrook en de jaarlijkse aangifte zijn leidend.</p>',
    groups: [
      {
        title: 'Salaris',
        text: 'Reken je bruto maand- of jaarsalaris om naar een geschat netto bedrag, inclusief vakantiegeld, bonus en pensioenpremie.',
        calculators: ['bruto-netto-berekenen'],
      },
      {
        title: 'Loonsverhoging en vergelijken',
        text: 'Bereken hoeveel procent je salaris stijgt of hoeveel procent het ene aanbod hoger is dan het andere.',
        calculators: ['percentage-berekenen'],
      },
    ],
    body: [
      {
        title: 'Waarom netto niet simpelweg bruto min belasting is',
        html: '<p>In Nederland betaal je loonheffing over je loon, maar je krijgt ook heffingskortingen: de algemene heffingskorting en de arbeidskorting. Beide hangen af van je inkomen. Daardoor stijgt je netto loon niet in hetzelfde tempo als je brutoloon. Rond bepaalde inkomens houd je van elke extra euro bruto zelfs minder dan de helft over.</p><p>De bruto-nettocalculator laat daarom niet alleen je netto bedrag zien, maar ook je gemiddelde belastingdruk en je marginale tarief: wat je ongeveer betaalt over je volgende verdiende euro.</p>',
      },
      {
        title: 'België komt eraan',
        html: '<p>De Belgische loonberekening werkt met RSZ-bijdragen, bedrijfsvoorheffing en gemeentebelasting en verschilt dus wezenlijk van de Nederlandse. We werken aan een aparte, gecontroleerde Belgische versie. Tot die tijd rekent de calculator alleen met Nederlandse tarieven.</p>',
      },
    ],
  },
  {
    key: 'datum-tijd',
    slug: 'datum-tijd',
    name: 'Datum & tijd',
    icon: 'clock',
    seoTitle: 'Datum & tijd berekenen – leeftijd en dagen tellen',
    metaDescription:
      'Bereken je exacte leeftijd in jaren, maanden, weken, dagen en uren, het aantal dagen tot je verjaardag en op welke dag je geboren bent.',
    h1: 'Datum & tijd berekenen',
    description: 'Exacte leeftijd, dagen tot je verjaardag en je geboortedag.',
    intro:
      '<p>Rekenen met datums lijkt makkelijk, tot je rekening moet houden met maanden van 28, 30 en 31 dagen en met schrikkeljaren. Onze datumcalculators doen dat foutloos voor je. Bereken je leeftijd tot op de dag nauwkeurig, ontdek op welke dag van de week je geboren bent of tel af naar je volgende verjaardag.</p><p>Alle berekeningen gebeuren direct in je browser; we slaan geen geboortedatums op.</p>',
    groups: [
      {
        title: 'Leeftijd en verjaardagen',
        text: 'Je leeftijd in jaren, maanden en dagen, plus het totaal in weken, dagen en uren en de dagen tot je volgende verjaardag.',
        calculators: ['leeftijd-berekenen'],
      },
      {
        title: 'Cyclus en planning',
        text: 'Plan vooruit met een kalender van je verwachte eisprong, vruchtbare dagen en volgende menstruatie.',
        calculators: ['ovulatie-berekenen'],
      },
    ],
    body: [
      {
        title: 'Hoe tel je maanden en dagen?',
        html: '<p>Er bestaan verschillende manieren om het verschil tussen twee datums uit te drukken. Wij tellen eerst zoveel mogelijk hele maanden vanaf de begindatum en daarna de resterende dagen. Valt de begindatum op een dag die in een maand niet bestaat (zoals 31 januari naar februari), dan nemen we de laatste dag van die maand. Zo blijft de uitkomst logisch en controleerbaar.</p>',
      },
    ],
  },
];

export const categoryByKey = (key: CategoryKey) => categories.find((c) => c.key === key)!;
