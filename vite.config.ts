// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Enable static prerender only when explicitly requested (e.g. for the
// Hostinger static build). Inside Lovable's Cloudflare build, prerendering
// crashes the worker bundle — so we keep it off by default.
const STATIC_BUILD = process.env.STATIC_BUILD === "1" || process.env.NITRO_PRESET === "static";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(STATIC_BUILD
      ? {
          prerender: {
            enabled: true,
            crawlLinks: true,
            autoSubfolderIndex: true,
            routes: ["/", "/cart", "/checkout", "/order-success"],
          },
          pages: [
            { path: "/" },
            { path: "/cart" },
            { path: "/checkout" },
            { path: "/order-success" },
          ],
        }
      : {}),
  },
});
