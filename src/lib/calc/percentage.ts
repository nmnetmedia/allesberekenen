export type PercentageMode = 'deel' | 'aandeel' | 'stijging' | 'daling' | 'verschil' | 'korting';

export interface PercentageResult {
  value: number;
  /** Extra waarde, bijv. het absolute verschil of het kortingsbedrag. */
  secondary?: number;
}

/**
 * - deel:     X% van Y             → Y × X / 100
 * - aandeel:  X is hoeveel % van Y → X / Y × 100
 * - stijging: van A naar B         → (B − A) / A × 100
 * - daling:   van A naar B         → (A − B) / A × 100
 * - verschil: tussen A en B        → |A − B| / ((A + B) / 2) × 100
 * - korting:  X% korting op Y      → Y × (1 − X / 100)
 */
export function calcPercentage(mode: PercentageMode, a: number, b: number): PercentageResult | null {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
  switch (mode) {
    case 'deel':
      return { value: (b * a) / 100 };
    case 'aandeel':
      if (b === 0) return null;
      return { value: (a / b) * 100 };
    case 'stijging':
      if (a === 0) return null;
      return { value: ((b - a) / Math.abs(a)) * 100, secondary: b - a };
    case 'daling':
      if (a === 0) return null;
      return { value: ((a - b) / Math.abs(a)) * 100, secondary: a - b };
    case 'verschil': {
      const avg = (a + b) / 2;
      if (avg === 0) return null;
      return { value: (Math.abs(a - b) / Math.abs(avg)) * 100, secondary: Math.abs(a - b) };
    }
    case 'korting':
      return { value: b * (1 - a / 100), secondary: (b * a) / 100 };
  }
}
