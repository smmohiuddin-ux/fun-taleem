import { cp, mkdir, rm } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const publicDirectory = new URL("../public/", import.meta.url);

await rm(new URL("site-assets/", publicDirectory), { recursive: true, force: true });
await mkdir(new URL("site-assets/", publicDirectory), { recursive: true });
await cp(new URL("site-assets/", root), new URL("site-assets/", publicDirectory), {
  recursive: true,
});

console.log("Hostinger storefront bundles copied into the server public directory.");