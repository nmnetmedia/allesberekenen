export interface BmiCategory {
  key: 'ondergewicht' | 'gezond' | 'overgewicht' | 'obesitas';
  label: string;
  min: number;
  max: number;
}

/** WHO-indeling voor volwassenen. */
export const BMI_CATEGORIES: BmiCategory[] = [
  { key: 'ondergewicht', label: 'Ondergewicht', min: 0, max: 18.5 },
  { key: 'gezond', label: 'Gezond gewicht', min: 18.5, max: 25 },
  { key: 'overgewicht', label: 'Overgewicht', min: 25, max: 30 },
  { key: 'obesitas', label: 'Obesitas', min: 30, max: Infinity },
];

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  healthyMinKg: number;
  healthyMaxKg: number;
  /** Afwijkend advies voor 70-plussers (Voedingscentrum: BMI 22–28). */
  seniorRange?: { minKg: number; maxKg: number; label: string };
  isMinor: boolean;
}

export function calcBmi(weightKg: number, heightCm: number, age?: number): BmiResult | null {
  if (!(weightKg >= 2 && weightKg <= 500) || !(heightCm >= 50 && heightCm <= 260)) return null;
  const m = heightCm / 100;
  const bmi = weightKg / (m * m);
  const category = BMI_CATEGORIES.find((c) => bmi >= c.min && bmi < c.max)!;
  const result: BmiResult = {
    bmi,
    category,
    healthyMinKg: 18.5 * m * m,
    healthyMaxKg: 24.9 * m * m,
    isMinor: age !== undefined && Number.isFinite(age) && age < 18,
  };
  if (age !== undefined && age >= 70) {
    result.seniorRange = {
      minKg: 22 * m * m,
      maxKg: 28 * m * m,
      label: bmi < 22 ? 'Lager dan aanbevolen voor 70-plussers' : bmi <= 28 ? 'Binnen het advies voor 70-plussers' : 'Hoger dan aanbevolen voor 70-plussers',
    };
  }
  return result;
}
