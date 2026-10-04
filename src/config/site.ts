/**
 * Centrale site-instellingen. Pas naam, domein en contactgegevens hier aan.
 * Analytics-ID's komen uit omgevingsvariabelen (zie .env.example) zodat er
 * zonder configuratie géén externe scripts worden geladen.
 */
export const site = {
  name: 'AllesBerekenen',
  url: (import.meta.env.PUBLIC_SITE_URL || 'https://allesberekenen.be').replace(/\/$/, ''),
  locale: 'nl_NL',
  lang: 'nl',
  tagline: 'Gratis online calculators voor geld, gezondheid, wonen en dagelijks gebruik.',
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL || 'contact@allesberekenen.be',
  defaultOgImage: '/og-default.png',
  /** Datum waarop de algemene trust-pagina's voor het laatst zijn herzien. */
  legalUpdated: '2026-10-04',
} as const;

export const analytics = {
  gtmId: import.meta.env.PUBLIC_GTM_ID || '',
  ga4Id: import.meta.env.PUBLIC_GA4_ID || '',
  searchConsoleVerification: import.meta.env.PUBLIC_GSC_VERIFICATION || '',
};

export const mainNav = [
  { label: 'Calculators', href: '/calculators' },
  { label: 'Geld', href: '/geld' },
  { label: 'Gezondheid', href: '/gezondheid' },
  { label: 'Wonen', href: '/wonen' },
  { label: 'Werk & inkomen', href: '/werk-inkomen' },
  { label: 'Datum & tijd', href: '/datum-tijd' },
];

export const footerNav = [
  { label: 'Werkwijze', href: '/werkwijze' },
  { label: 'Over ons', href: '/over-ons' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacybeleid', href: '/privacy' },
  { label: 'Cookiebeleid', href: '/cookiebeleid' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

export const DISCLAIMER_SHORT =
  'Onze calculators geven indicatieve resultaten. Controleer belangrijke financiële of medische beslissingen altijd bij een bevoegde specialist.';
