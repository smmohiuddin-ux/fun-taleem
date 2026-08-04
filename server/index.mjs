import { createReadStream } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SERVER_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(SERVER_DIRECTORY, "..");
const PUBLIC_ROOT = join(SERVER_DIRECTORY, "public");
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
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

const STATIC_EXTENSIONS = new Set(Object.keys(MIME).filter((extension) => extension !== ".html"));
const SEARCH_ROOTS = [PUBLIC_ROOT, PROJECT_ROOT, join(PROJECT_ROOT, "public"), join(PROJECT_ROOT, "dist-spa")];

async function locate(requestPath) {
  const relativePath = normalize(requestPath)
    .replace(/^(\.\.[/\\])+/, "")
    .replace(/^[/\\]+/, "");
  if (!relativePath) return null;

  for (const base of SEARCH_ROOTS) {
    const candidate = resolve(base, relativePath);
    if (candidate !== base && !candidate.startsWith(`${base}/`)) continue;
    try {
      const information = await stat(candidate);
      if (information.isFile()) return { path: candidate, size: information.size };
    } catch {
      // Continue through the supported Hostinger deployment layouts.
    }
  }
  return null;
}

function sendText(response, status, body, contentType = "text/plain; charset=utf-8") {
  response.writeHead(status, { "content-type": contentType, "cache-control": "no-store" });
  response.end(body);
}

async function directorySummary(path) {
  try {
    return (await readdir(path)).slice(0, 100);
  } catch (error) {
    return `missing (${error.code ?? "unknown"})`;
  }
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", "http://localhost");
    const pathname = decodeURIComponent(url.pathname);

    if (pathname === "/__deploy-check") {
      const diagnostics = {
        status: "ok",
        entry: "server/index.mjs",
        publicRoot: PUBLIC_ROOT,
        files: {
          public: await directorySummary(PUBLIC_ROOT),
          siteAssets: await directorySummary(join(PUBLIC_ROOT, "site-assets")),
          productImages: await directorySummary(join(PUBLIC_ROOT, "lov-assets")),
        },
      };
      return sendText(response, 200, JSON.stringify(diagnostics, null, 2), "application/json; charset=utf-8");
    }

    if (pathname.includes("/.git") || pathname === "/.htaccess") {
      return sendText(response, 403, "Forbidden");
    }

    const requestedFile = await locate(pathname === "/" ? "index.html" : pathname);
    const extension = extname(pathname).toLowerCase();

    if (requestedFile) {
      const fileExtension = extname(requestedFile.path).toLowerCase();
      const immutable = pathname.startsWith("/site-assets/") || pathname.startsWith("/lov-assets/");
      response.writeHead(200, {
        "content-type": MIME[fileExtension] || "application/octet-stream",
        "content-length": requestedFile.size,
        "cache-control": immutable
          ? "public, max-age=31536000, immutable"
          : "public, max-age=0, must-revalidate",
      });
      createReadStream(requestedFile.path).pipe(response);
      return;
    }

    if (STATIC_EXTENSIONS.has(extension)) return sendText(response, 404, "Not found");

    const shell = await locate("index.html");
    if (!shell) return sendText(response, 500, "Deployment is missing index.html");
    response.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
      "content-length": shell.size,
      "cache-control": "public, max-age=0, must-revalidate",
    });
    createReadStream(shell.path).pipe(response);
  } catch (error) {
    console.error(error);
    sendText(response, 500, "Server error");
  }
});

server.listen(PORT, () => {
  console.log(`Funtaleem listening on port ${PORT}`);
});