import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { site } from "./src/data/site.ts";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/**
 * Fills %SITE_*% placeholders in index.html from src/data/site.ts so the
 * name, role, and description in meta tags never drift from the page.
 */
function siteMeta(): Plugin {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: site.fullName,
      alternateName: site.name,
      jobTitle: site.role,
      ...(site.email ? { email: site.email } : {}),
      url: site.url,
      sameAs: [site.github, site.linkedin, site.telegram].filter(Boolean),
    },
  };

  const values: Record<string, string> = {
    SITE_TITLE: escapeHtml(site.title),
    SITE_DESCRIPTION: escapeHtml(site.description),
    SITE_FULL_NAME: escapeHtml(site.fullName),
    SITE_ROLE: escapeHtml(site.role),
    // "<" is escaped so the JSON can never close the script element.
    SITE_JSON_LD: JSON.stringify(jsonLd).replaceAll("<", "\\u003c"),
  };

  return {
    name: "site-meta",
    transformIndexHtml(html) {
      return html.replace(/%(SITE_[A-Z_]+)%/g, (match, key: string) => {
        const value = values[key];
        if (value === undefined) {
          throw new Error(`Unknown placeholder ${match} in index.html`);
        }
        return value;
      });
    },
  };
}

// perekopskyi.github.io is a user site, served at the domain root.
export default defineConfig({
  base: "/",
  plugins: [siteMeta(), react(), tailwindcss()],
});
