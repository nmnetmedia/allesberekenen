import { site } from '../config/site';
import type { CalculatorContent } from '../data/types';

export interface Crumb {
  name: string;
  href: string;
}

export const absUrl = (path: string) => `${site.url}${path === '/' ? '/' : path.replace(/\/$/, '')}`;

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.href),
    })),
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: `${site.url}/`,
    inLanguage: 'nl',
    description: site.tagline,
    publisher: { '@id': `${site.url}/#organization` },
  };
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: `${site.url}/`,
    logo: `${site.url}/logo.png`,
  };
}

/** Een calculator is een gratis webapplicatie; we voegen geen beoordelingen of andere niet-bestaande eigenschappen toe. */
export function webApplicationLd(calc: CalculatorContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calc.name,
    url: absUrl(`/${calc.slug}`),
    description: calc.metaDescription,
    applicationCategory: calc.appCategory,
    operatingSystem: 'Alle (webbrowser)',
    inLanguage: 'nl',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    dateModified: calc.lastReviewed,
    publisher: { '@id': `${site.url}/#organization` },
  };
}

export function collectionPageLd(name: string, path: string, description: string, items: { name: string; slug: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url: absUrl(path),
    description,
    inLanguage: 'nl',
    isPartOf: { '@id': `${site.url}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: absUrl(`/${it.slug}`) })),
    },
  };
}
