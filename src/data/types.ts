import type { IconName } from '../lib/icons';
import type { Source } from '../config/tax/types';

export type { Source };

export type CategoryKey = 'geld' | 'gezondheid' | 'wonen' | 'werk-inkomen' | 'datum-tijd';

export interface Category {
  key: CategoryKey;
  slug: string;
  name: string;
  icon: IconName;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  /** Korte omschrijving voor kaarten. */
  description: string;
  /** Introductie (HTML toegestaan, alleen eigen content). */
  intro: string;
  /** Subcategorieën: groepering van calculators met eigen uitleg. */
  groups: { title: string; text: string; calculators: string[] }[];
  /** Uitgebreide uitleg onderaan de categoriepagina (HTML). */
  body: { title: string; html: string }[];
}

export interface ContentSection {
  id: string;
  title: string;
  /** HTML; alleen eigen redactionele content. */
  html: string;
}

export interface Example {
  title: string;
  text: string;
  answer: string;
}

export interface Faq {
  q: string;
  /** HTML toegestaan. */
  a: string;
}

export type DisclaimerKind = 'finance' | 'health' | 'none';

export interface CalculatorContent {
  slug: string;
  /** Volledige naam, zoals "BTW berekenen". */
  name: string;
  /** Korte naam voor compacte lijsten, zoals "BTW". */
  shortName: string;
  category: CategoryKey;
  /** Extra categorieën waarin de calculator ook verschijnt. */
  alsoIn?: CategoryKey[];
  icon: IconName;
  /** Eén zin voor kaarten en zoekresultaten. */
  description: string;
  /** Zoekwoorden en synoniemen voor de interne zoekfunctie. */
  keywords: string[];
  seoTitle: string;
  metaDescription: string;
  h1: string;
  /** Korte lead direct onder de H1 (boven de calculator). */
  lead: string;
  /** Introductie onder de calculator (HTML-paragrafen). */
  intro: string;
  /** "Hoe bereken je dit?" */
  howTo: ContentSection;
  formula: { title: string; lines: string[]; explanation: string };
  /** Extra onderwerpspecifieke secties (bijv. "BTW terugrekenen"). */
  extraSections: ContentSection[];
  examples: Example[];
  mistakes: { title: string; text: string }[];
  faq: Faq[];
  related: string[];
  sources: Source[];
  /** Methodebeschrijving voor het bronblok. */
  method: string;
  /** null = redactie; vul alleen een echte, controleerbare auteur in. */
  author: string | null;
  /** null = geen externe vakinhoudelijke controle. Verzin hier niets. */
  reviewedBy: string | null;
  lastReviewed: string;
  disclaimer: DisclaimerKind;
  /** schema.org applicationCategory voor WebApplication-markup. */
  appCategory: 'FinanceApplication' | 'HealthApplication' | 'UtilitiesApplication' | 'LifestyleApplication';
  popular?: boolean;
  /** Pagina niet indexeren (bijv. tijdens opbouw). */
  noindex?: boolean;
}
