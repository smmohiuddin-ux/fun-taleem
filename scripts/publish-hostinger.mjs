import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

const output = new URL("../dist-spa/", import.meta.url);
const root = new URL("../", import.meta.url);
const publicDirectory = new URL("../public/", import.meta.url);
const generatedHtml = new URL("hostinger-entry.html", output);

await rm(new URL("site-assets/", root), { recursive: true, force: true });
await rm(new URL("lov-assets/", root), { recursive: true, force: true });
await mkdir(new URL("site-assets/", root), { recursive: true });
await cp(new URL("site-assets/", output), new URL("site-assets/", root), { recursive: true });
await cp(new URL("lov-assets/", output), new URL("lov-assets/", root), { recursive: true });
await rm(new URL("site-assets/", publicDirectory), { recursive: true, force: true });
await mkdir(new URL("site-assets/", publicDirectory), { recursive: true });
await cp(new URL("site-assets/", output), new URL("site-assets/", publicDirectory), {
  recursive: true,
});

const html = await readFile(generatedHtml, "utf8");
await writeFile(new URL("index.html", root), html);
await writeFile(new URL("index.html", output), html);
await rm(generatedHtml, { force: true });

const htaccess = new URL(".htaccess", output);
await rm(htaccess, { force: true });
await cp(new URL(".htaccess", root), htaccess);

console.log("Hostinger deployment files published to the repository root.");