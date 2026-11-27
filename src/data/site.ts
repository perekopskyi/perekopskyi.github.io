import type { Site } from "../types/content.ts";

/**
 * Public site configuration.
 * Set email, linkedin, telegram, or availability to a string to show them.
 * Null hides the field. Leave unknown values null.
 */
export const site: Site = {
  name: "Eugene",
  fullName: "Yevhenii Perekopskyi",
  role: "Senior Full-stack Engineer",
  title: "Yevhenii Perekopskyi — Senior Full-stack Engineer",
  description:
    "Senior Full-stack Engineer. React and TypeScript on the front, Node.js and PostgreSQL behind it. 8+ years shipping web products.",
  headline: "React and TypeScript on the front, Node.js and PostgreSQL behind it.",
  summary:
    "Most recently I built a tournament platform from scratch in about two months. It now serves 10,000+ users, and adding a new sport no longer means a new application. AI coding agents are part of how I deliver; the architecture, the review, and what is safe to ship stay with me.",
  location: "Ukraine",
  yearsLabel: "8+ years",
  availability: "Available",
  email: "yevheniiperekopskyi@gmail.com",
  linkedin: "https://www.linkedin.com/in/yevhenii-perekopskyi",
  telegram: "https://t.me/i_am_yevhen",
  github: "https://github.com/perekopskyi",
  sourceUrl: "https://github.com/perekopskyi/perekopskyi.github.io",
  url: "https://perekopskyi.github.io/",
};
