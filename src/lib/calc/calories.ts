export type Sex = 'man' | 'vrouw';

export const ACTIVITY_LEVELS = [
  { key: 'weinig', label: 'Weinig actief', factor: 1.2, hint: 'Zittend werk, nauwelijks sport' },
  { key: 'licht', label: 'Licht actief', factor: 1.375, hint: '1–3 keer per week licht sporten of veel wandelen' },
  { key: 'gemiddeld', label: 'Gemiddeld actief', factor: 1.55, hint: '3–5 keer per week matig intensief sporten' },
  { key: 'zeer', label: 'Zeer actief', factor: 1.725, hint: '6–7 keer per week intensief sporten of zwaar lichamelijk werk' },
] as const;

export type ActivityKey = (typeof ACTIVITY_LEVELS)[number]['key'];

/** Mifflin-St Jeor (1990): BMR = 10 × kg + 6,25 × cm − 5 × leeftijd + 5 (man) of − 161 (vrouw). */
export function mifflinStJeor(sex: Sex, age: number, weightKg: number, heightCm: number) {
  return 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === 'man' ? 5 : -161);
}

export const GOAL_ADJUSTMENTS = [
  { key: 'behouden', label: 'Gewicht behouden', delta: 0, note: 'Inname en verbruik in balans' },
  { key: 'rustig', label: 'Rustig afvallen', delta: -250, note: 'Ongeveer 0,25 kg per week' },
  { key: 'sneller', label: 'Sneller afvallen', delta: -500, note: 'Ongeveer 0,5 kg per week' },
  { key: 'aankomen', label: 'Aankomen', delta: 300, note: 'Geleidelijk, ca. 0,25–0,3 kg per week' },
] as const;

export function calcCalories(sex: Sex, age: number, weightKg: number, heightCm: number, activity: ActivityKey) {
  if (!(age >= 18 && age <= 100) || !(weightKg >= 30 && weightKg <= 350) || !(heightCm >= 120 && heightCm <= 240)) return null;
  const level = ACTIVITY_LEVELS.find((l) => l.key === activity) ?? ACTIVITY_LEVELS[0];
  const bmr = mifflinStJeor(sex, age, weightKg, heightCm);
  const tdee = bmr * level.factor;
  const goals = GOAL_ADJUSTMENTS.map((g) => {
    const kcal = tdee + g.delta;
    // Structureel onder je BMR eten raden we zonder begeleiding af.
    return { ...g, kcal, belowBmr: kcal < bmr };
  });
  return { bmr, tdee, factor: level.factor, goals };
}
