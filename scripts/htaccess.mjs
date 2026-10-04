/**
 * Astro-integratie: schrijft na elke build een .htaccess voor Apache/LiteSpeed
 * (Hostinger). Zorgt voor https, geen www, nette URL's zonder .html, 301-redirects
 * uit src/config/redirects.mjs, een 404-pagina en caching.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const escape = (s) => s.replace(/^\//, '').replace(/[.+?^$()[\]{}|\\]/g, '\\$&');

export function htaccess({ site, redirects = {} }) {
  const host = new URL(site).host;
  return {
    name: 'htaccess',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const out = fileURLToPath(dir);
        const redirectRules = Object.entries(redirects)
          .map(([from, to]) => `RewriteRule ^${escape(from)}/?$ ${to} [R=301,L]`)
          .join('\n');

        writeFileSync(
          `${out}/.htaccess`,
          `# Automatisch gegenereerd bij de build (scripts/htaccess.mjs). Niet handmatig aanpassen.
ErrorDocument 404 /404.html
Options -MultiViews -Indexes
DirectoryIndex index.html

<IfModule mod_rewrite.c>
RewriteEngine On

# Altijd https en zonder www
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} !^${host.replace(/\./g, '\\.')}$ [NC]
RewriteRule ^ https://${host}%{REQUEST_URI} [L,R=301]

# Oude of alternatieve URL's (src/config/redirects.mjs)
${redirectRules}

# /index.html en /pagina.html -> nette URL
RewriteRule ^index\\.html$ / [R=301,L]
RewriteCond %{THE_REQUEST} \\s/([^.\\s?]+)\\.html[\\s?]
RewriteRule ^ /%1 [R=301,L]

# Geen slash aan het eind
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)/$ /$1 [R=301,L]

# Nette URL -> bijbehorend .html-bestand
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{DOCUMENT_ROOT}/$1.html -f
RewriteRule ^([^.]+)$ /$1.html [L]
</IfModule>

<IfModule mod_headers.c>
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set X-Frame-Options "SAMEORIGIN"
<FilesMatch "\\.html$">
Header set Cache-Control "public, max-age=0, must-revalidate"
</FilesMatch>
<FilesMatch "\\.(png|svg|ico|webmanifest|xml|txt)$">
Header set Cache-Control "public, max-age=604800"
</FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json application/xml image/svg+xml application/manifest+json
</IfModule>
`,
        );

        // Bestanden in /_astro hebben een hash in de naam en mogen een jaar gecachet worden.
        writeFileSync(
          `${out}/_astro/.htaccess`,
          `<IfModule mod_headers.c>\nHeader set Cache-Control "public, max-age=31536000, immutable"\n</IfModule>\n`,
        );
      },
    },
  };
}
