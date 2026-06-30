// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Prerender every page route to plain HTML so the build is fully static
    // (deployable to Hostinger / any static host). Crawl links automatically
    // to catch anything we forget to list here.
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
  },
});
