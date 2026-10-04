import { nl2026 } from './nl-2026';
import { be2026 } from './be-2026';
import type { BeTaxConfig, NlTaxConfig, TaxConfig } from './types';

/** Alle landen/jaren die de bruto-nettocalculator kent. De eerste is de standaard. */
export const taxConfigs: TaxConfig[] = [be2026, nl2026];
export const defaultTaxConfig: TaxConfig = be2026;
export const defaultNlConfig: NlTaxConfig = nl2026;
export const defaultBeConfig: BeTaxConfig = be2026;
export type { TaxConfig, NlTaxConfig, BeTaxConfig };
/** @deprecated */
export type IncomeTaxConfig = NlTaxConfig;
