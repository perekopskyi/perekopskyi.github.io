// Injects the server-rendered app into dist/index.html, writes the CV PDF and sitemap.xml.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle in dist-ssr/).
import { execFileSync } from "node:child_process";
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const htmlPath = `${root}dist/index.html`;
const placeholder = "<!--app-html-->";

const { render, renderCv, siteUrl } = await import(`${root}dist-ssr/entry-server.js`);
const template = await readFile(htmlPath, "utf8");

if (!template.includes(placeholder)) {
  throw new Error(`${placeholder} is missing from dist/index.html`);
}

const appHtml = render();
if (!appHtml.includes("<h1")) {
  throw new Error("Prerendered HTML has no <h1>; refusing to ship an empty page.");
}

await writeFile(htmlPath, template.replace(placeholder, appHtml));

const cv = await renderCv();
await writeFile(`${root}dist${cv.path}`, cv.pdf);

// lastmod = date of the last commit that changed what visitors see, not the build date,
// so redeploys without content changes do not claim a new modification.
// Omitted when git history is unavailable (CI checks out full history).
function contentLastModified() {
  try {
    const date = execFileSync("git", ["log", "-1", "--format=%cs", "--", "src", "public", "index.html"], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null;
  } catch {
    return null;
  }
}

const lastmod = contentLastModified();
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  "  <url>",
  `    <loc>${siteUrl}</loc>`,
  ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
  "  </url>",
  "</urlset>",
  "",
].join("\n");
await writeFile(`${root}dist/sitemap.xml`, sitemap);

await rm(`${root}dist-ssr`, { recursive: true, force: true });

console.log(`prerendered ${(appHtml.length / 1024).toFixed(1)} kB of HTML into dist/index.html`);
console.log(`rendered ${(cv.pdf.length / 1024).toFixed(1)} kB CV into dist${cv.path}`);
console.log(`wrote dist/sitemap.xml (lastmod ${lastmod ?? "omitted: no git history"})`);
