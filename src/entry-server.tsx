import { renderToBuffer } from "@react-pdf/renderer";
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App.tsx";
import { CvDocument } from "./cv/CvDocument.tsx";
import { cvPath } from "./data/cv.ts";
import { site } from "./data/site.ts";

/** Renders the page to HTML at build time. See scripts/prerender.mjs. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

/** Canonical site URL, used for sitemap.xml. */
export const siteUrl: string = site.url;

/** Renders the CV PDF from the same data as the page. */
export async function renderCv(): Promise<{ path: string; pdf: Buffer }> {
  return { path: cvPath, pdf: await renderToBuffer(<CvDocument />) };
}
