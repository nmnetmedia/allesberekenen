import type { CalculatorContent, CategoryKey } from '../types';
import { btw } from './btw';
import { percentage } from './percentage';
import { bmi } from './bmi';
import { leeftijd } from './leeftijd';
import { m2 } from './m2';
import { calorie } from './calorie';
import { brutoNetto } from './bruto-netto';
import { ovulatie } from './ovulatie';
import { rente } from './rente';
import { hypotheek } from './hypotheek';

/**
 * Centrale lijst van alle calculators. Een nieuwe calculator toevoegen:
 * 1. maak een contentbestand in deze map;
 * 2. voeg het hier toe;
 * 3. maak een island in src/islands en koppel het in src/islands/registry.ts.
 * Pagina, sitemap, zoekfunctie, categorieoverzichten en interne links volgen automatisch.
 */
export const calculators: CalculatorContent[] = [btw, percentage, bmi, leeftijd, brutoNetto, hypotheek, rente, calorie, m2, ovulatie];

export const calculatorBySlug = (slug: string) => calculators.find((c) => c.slug === slug);

export const calculatorsInCategory = (key: CategoryKey) =>
  calculators.filter((c) => c.category === key || c.alsoIn?.includes(key));

export const popularCalculators = () => calculators.filter((c) => c.popular);

export function relatedCalculators(calc: CalculatorContent) {
  return calc.related.map((s) => calculatorBySlug(s)).filter((c): c is CalculatorContent => Boolean(c));
}

/** Compacte index voor de client-side zoekfunctie. */
export const searchIndex = calculators.map((c) => ({
  slug: c.slug,
  name: c.name,
  description: c.description,
  icon: c.icon,
  keywords: c.keywords.join(' '),
}));
export type SearchItem = (typeof searchIndex)[number];
