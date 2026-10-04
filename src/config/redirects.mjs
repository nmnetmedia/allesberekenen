/**
 * Permanente redirects (301). Voeg hier oude of alternatieve URL's toe wanneer
 * een pagina verhuist of wordt samengevoegd, bijvoorbeeld:
 *   '/btw-calculator': '/btw-berekenen',
 * Astro genereert voor statische hosting een meta-refresh + canonical; bij hosts
 * als Netlify/Vercel/Cloudflare kun je dezelfde lijst ook als serverredirect gebruiken.
 */
export const redirects = {
  '/btw-calculator': '/btw-berekenen',
  '/bmi-calculator': '/bmi-berekenen',
  '/procent-berekenen': '/percentage-berekenen',
  '/vierkante-meter-berekenen': '/m2-berekenen',
  '/werk-en-inkomen': '/werk-inkomen',
  '/privacybeleid': '/privacy',
};
