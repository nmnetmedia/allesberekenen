export interface Source {
  label: string;
  url: string;
}

export interface TaxBracket {
  /** Bovengrens van de schijf (inclusief). `null` = geen bovengrens. */
  upTo: number | null;
  rate: number;
}

export interface CreditSegment {
  from: number;
  to: number | null;
  /** Korting = base + rate × (inkomen − from). Rate kan negatief zijn (afbouw). */
  base: number;
  rate: number;
}

export interface IncomeTaxConfig {
  country: 'NL' | 'BE';
  year: number;
  /** false = land/jaar is voorbereid maar nog niet rekenbaar. */
  available: boolean;
  label: string;
  currency: 'EUR';
  brackets: TaxBracket[];
  /** Algemene heffingskorting (NL). */
  generalCredit: { max: number; phaseOutStart: number; phaseOutRate: number };
  /** Arbeidskorting (NL). */
  labourCredit: CreditSegment[];
  defaults: { holidayAllowanceRate: number };
  assumptions: string[];
  sources: Source[];
  checkedOn: string;
}
