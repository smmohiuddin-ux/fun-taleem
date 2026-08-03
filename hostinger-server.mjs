// Zero-dependency static server for Hostinger's Node.js hosting mode.
// Serves the prebuilt storefront from the repository root with correct MIME
// types and an SPA fallback that never returns HTML for asset requests.
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat, readdir } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname);
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

const ASSET_EXTENSIONS = new Set(Object.keys(MIME).filter((ext) => ext !== ".html"));

// Static files may live at the repository root or inside public/ depending on
// how the host copies the deployment.
const SEARCH_ROOTS = [ROOT, join(ROOT, "public"), join(ROOT, "dist-spa")];

async function findFile(pathname) {
  const relative = normalize(pathname).replace(/^(\.\.[/\\])+/, "").replace(/^[/\\]+/, "");
  if (!relative) return null;
  for (const base of SEARCH_ROOTS) {
    const candidate = join(base, relative);
    if (!candidate.startsWith(base)) continue;
    try {
      const info = await stat(candidate);
      if (info.isFile()) return { path: candidate, size: info.size };
    } catch {
      /* keep looking */
    }
  }
  return null;
}

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, { "content-type": type });
  res.end(body);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://localhost");
  const pathname = decodeURIComponent(url.pathname);

  // Deployment diagnostics: shows what actually reached the server.
  if (pathname === "/__deploy-check") {
    const listing = {};
    for (const dir of ["", "site-assets", "public/site-assets", "lov-assets", "public/lov-assets"]) {
      try {
        listing[dir || "."] = (await readdir(join(ROOT, dir))).slice(0, 60);
      } catch (error) {
        listing[dir || "."] = `missing (${error.code})`;
      }
    }
    return send(res, 200, JSON.stringify({ root: ROOT, listing }, null, 2), "application/json");
  }

  if (pathname === "/.htaccess" || pathname.includes("/.git")) return send(res, 403, "Forbidden");

  const ext = extname(pathname).toLowerCase();
  const file = await findFile(pathname === "/" ? "index.html" : pathname);

  if (file) {
    const cacheable = pathname.startsWith("/site-assets/") || pathname.startsWith("/lov-assets/");
    res.writeHead(200, {
      "content-type": MIME[ext] || "application/octet-stream",
      "content-length": file.size,
      "cache-control": cacheable ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate",
    });
    createReadStream(file.path).pipe(res);
    return;
  }

  // Never serve the HTML shell for a missing asset: that causes the
  // "Expected a JavaScript module but got text/html" console error.
  if (ASSET_EXTENSIONS.has(ext)) return send(res, 404, "Not found");

  const shell = await findFile("index.html");
  if (!shell) return send(res, 500, "index.html is missing from the deployment");
  res.writeHead(200, {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "public, max-age=0, must-revalidate",
  });
  createReadStream(shell.path).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Funtaleem static server listening on ${PORT} (root: ${ROOT})`);
});
