// Injects the server-rendered app into dist/index.html.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle in dist-ssr/).
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const htmlPath = `${root}dist/index.html`;
const placeholder = "<!--app-html-->";

const { render } = await import(`${root}dist-ssr/entry-server.js`);
const template = await readFile(htmlPath, "utf8");

if (!template.includes(placeholder)) {
  throw new Error(`${placeholder} is missing from dist/index.html`);
}

const appHtml = render();
if (!appHtml.includes("<h1")) {
  throw new Error("Prerendered HTML has no <h1>; refusing to ship an empty page.");
}

await writeFile(htmlPath, template.replace(placeholder, appHtml));
await rm(`${root}dist-ssr`, { recursive: true, force: true });

console.log(`prerendered ${(appHtml.length / 1024).toFixed(1)} kB of HTML into dist/index.html`);
