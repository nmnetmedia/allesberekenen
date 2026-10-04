import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import { redirects } from './src/config/redirects.mjs';
import { htaccess } from './scripts/htaccess.mjs';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const SITE = (env.PUBLIC_SITE_URL || 'https://allesberekenen.be').replace(/\/$/, '');

export default defineConfig({
  site: SITE,
  // Nette URL's zonder slash aan het eind: /btw-berekenen
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  // Centrale redirectlijst (oude URL → nieuwe URL), zie src/config/redirects.mjs
  redirects,
  integrations: [
    preact(),
    // .htaccess voor Hostinger (Apache/LiteSpeed): nette URL's, redirects, https, caching.
    htaccess({ site: SITE, redirects }),
    // De sitemap wordt bij elke build opnieuw opgebouwd uit alle pagina's,
    // dus een nieuwe calculator staat er automatisch in.
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => ({ ...item, url: item.url.replace(/\/$/, '') || item.url }),
    }),
  ],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
