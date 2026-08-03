import { cp, mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";

const output = new URL("../dist-spa/", import.meta.url);
const root = new URL("../", import.meta.url);
const generatedHtml = new URL("hostinger-entry.html", output);

await rm(new URL("assets/", root), { recursive: true, force: true });
await rm(new URL("lov-assets/", root), { recursive: true, force: true });
await mkdir(new URL("assets/", root), { recursive: true });
await cp(new URL("assets/", output), new URL("assets/", root), { recursive: true });
await cp(new URL("lov-assets/", output), new URL("lov-assets/", root), { recursive: true });

const html = await readFile(generatedHtml, "utf8");
await writeFile(new URL("index.html", root), html);

const htaccess = new URL(".htaccess", output);
await rm(htaccess, { force: true });
await cp(new URL(".htaccess", root), htaccess);

console.log("Hostinger deployment files published to the repository root.");