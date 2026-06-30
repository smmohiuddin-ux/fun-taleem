# Deploying to Hostinger (Static Build)

This site is a TanStack Start app, but every page is content-only (cart
state lives in `localStorage`, orders go out via WhatsApp). That means it
can be **fully prerendered** to static HTML/CSS/JS and uploaded to any
shared host like Hostinger — no Node server required.

## 1. Build locally

> The build must be run **outside** the Lovable sandbox (Lovable forces
> the Cloudflare preset). Use your own machine / CI.

```bash
# Install deps (once)
npm install        # or pnpm install / bun install

# Produce a static build
STATIC_BUILD=1 NITRO_PRESET=static npm run build
```

When the build finishes you'll get a folder like:

```
.output/public/        ← upload the CONTENTS of this folder
  index.html
  cart/index.html
  checkout/index.html
  order-success/index.html
  _build/...           (hashed JS/CSS bundles)
  assets/...
  .htaccess
```

(Path can also be `dist/` depending on Nitro version — look for the
folder that contains `index.html`.)

## 2. Upload to Hostinger

1. Log in to **hPanel → File Manager** (or use FTP / SFTP).
2. Open `public_html/` (or your subdomain's document root) and **delete
   the default `index.html`** if present.
3. Upload **everything inside** `.output/public/` into `public_html/`.
   Make sure `.htaccess` is uploaded too (enable "Show hidden files" in
   File Manager).
4. Visit your domain — `/`, `/cart`, `/checkout`, `/order-success` should
   all load directly, including on refresh.

## 3. What the `.htaccess` does

`public/.htaccess` (bundled into the build automatically) tells Apache to:

- Serve the prerendered `cart/index.html`, `checkout/index.html`, etc.
  when those URLs are requested directly.
- Fall back to the root `index.html` so client-side routing keeps working
  for any unknown path.
- Cache hashed assets for 1 year, never cache HTML.
- Gzip text responses.

## 4. Updating the site

Re-run `STATIC_BUILD=1 NITRO_PRESET=static npm run build` and re-upload the contents of
`.output/public/`. You can safely overwrite existing files.

## 5. Things to know

- The site has **no backend** in the static build — checkout submits the
  order straight to WhatsApp (`+92 304 2175897`).
- If you ever add features that need a real server (database writes,
  email sending, payments), a static build won't be enough — you'd then
  need Node hosting (Hostinger VPS / Cloud Hosting) or a serverless host.
- Hostinger free SSL via hPanel → **SSL** is recommended; the site is
  served over HTTPS automatically.
