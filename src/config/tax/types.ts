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

interface TaxConfigBase {
  year: number;
  /** false = land/jaar is voorbereid maar nog niet rekenbaar. */
  available: boolean;
  label: string;
  currency: 'EUR';
  assumptions: string[];
  sources: Source[];
  checkedOn: string;
}

/** Nederland: loonheffing via box 1-schijven en heffingskortingen. */
export interface NlTaxConfig extends TaxConfigBase {
  country: 'NL';
  brackets: TaxBracket[];
  /** Algemene heffingskorting. */
  generalCredit: { max: number; phaseOutStart: number; phaseOutRate: number };
  /** Arbeidskorting. */
  labourCredit: CreditSegment[];
  defaults: { holidayAllowanceRate: number };
}

/** Lineair afbouwende vermindering: volledig tot `full`, daarna − slope × (S − full), nul vanaf `zero`. */
export interface TaperedReduction {
  amount: number;
  full: number;
  zero: number;
  slope: number;
}

/** België: RSZ, werkbonus, bedrijfsvoorheffing (sleutelformule) en bijzondere bijdrage sociale zekerheid. */
export interface BeTaxConfig extends TaxConfigBase {
  country: 'BE';
  /** Persoonlijke RSZ-bijdrage werknemer. */
  rszRate: number;
  /** Arbeiders worden aangegeven op 108% van het brutoloon. */
  workerRszBase: number;
  /** Sociale werkbonus (vermindering persoonlijke RSZ), per statuut. */
  workBonus: {
    bediende: { a: TaperedReduction; b: TaperedReduction };
    arbeider: { a: TaperedReduction; b: TaperedReduction };
  };
  /** Fiscale werkbonus: percentage van luik A en luik B dat van de BV mag worden afgetrokken. */
  fiscalWorkBonus: { a: number; b: number };
  /** Forfaitaire beroepskosten werknemers. */
  professionalCosts: { rate: number; max: number };
  /** Basisschaal bedrijfsvoorheffing (inclusief 7% aanvullende gemeentebelasting). */
  brackets: TaxBracket[];
  /** Belasting op de belastingvrije som (wordt van de basisbelasting afgetrokken). */
  taxFreeAllowance: { amount: number; tax: number };
  /** Huwelijksquotiënt bij partner zonder beroepsinkomsten. */
  marriageQuotient: { rate: number; max: number };
  /** Vermindering voor kinderen ten laste, index = aantal kinderen (1–8). */
  childReductions: number[];
  /** Extra per kind boven het achtste. */
  childReductionExtra: number;
  /** Vermindering alleenstaande ouder met kinderen ten laste (bijlage 4). */
  singleParentReduction: number;
  /** Bijzondere bijdrage sociale zekerheid, maandelijkse inhouding. */
  specialContribution: {
    individual: { from: number; base: number; rate: number }[];
    individualMax: { from: number; amount: number };
    jointWithIncome: { min: number; minFrom: number; rateFrom: number; rate: number; stepFrom: number; stepBase: number; stepRate: number; max: number };
    jointWithoutIncome: { rateFrom: number; rate: number; stepFrom: number; stepBase: number; stepRate: number; max: number };
  };
}

export type TaxConfig = NlTaxConfig | BeTaxConfig;
/** @deprecated gebruik NlTaxConfig */
export type IncomeTaxConfig = NlTaxConfig;
