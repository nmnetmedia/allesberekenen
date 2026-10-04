import { nl2026 } from './nl-2026';
import { bePlaceholder } from './be-placeholder';
import type { IncomeTaxConfig } from './types';

/** Alle bekende landen/jaren. De eerste beschikbare is de standaard. */
export const taxConfigs: IncomeTaxConfig[] = [nl2026, bePlaceholder];
export const defaultTaxConfig = nl2026;
export type { IncomeTaxConfig };
