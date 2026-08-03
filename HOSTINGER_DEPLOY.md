# Deploying to Hostinger (Static Build)

This repository includes a complete static deployment at its root for
Hostinger Git deployment. Hostinger can copy the repository directly into
`public_html`; no custom document root or server runtime is required.

## 1. Build locally

```bash
npm install
npm run build:hostinger
```

The command refreshes `dist-spa/`, the deployment files at the repository
root, and a server-public copy of the compiled bundles:

```
index.html
site-assets/
lov-assets/
.htaccess
public/site-assets/
```

Commit the refreshed output and deploy the repository through Hostinger's
Git integration. The deployment branch must use the repository root as the
publish directory.

The `public/site-assets/` copy is intentional. It allows the same deployment
to work if Hostinger launches the repository as a Node application instead of
serving it directly as a static site.

## 3. What the `.htaccess` does

The root `.htaccess` tells Apache to:

- Serve static JavaScript, CSS, and images directly.
- Fall back to `index.html` so client-side routes work on refresh.
- Cache hashed assets for 1 year, never cache HTML.
- Gzip text responses.

## 4. Updating the site

Re-run `npm run build:hostinger`, commit the generated root files, and
redeploy the latest commit in Hostinger.

## 5. Things to know

- The storefront is static, while checkout sends orders to the configured
  hosted backend and opens WhatsApp confirmation.
- Hostinger free SSL via hPanel → **SSL** is recommended; the site is
  served over HTTPS automatically.
