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
    "Senior Full-stack Engineer with 8 years of experience. React and TypeScript on the front, Node.js, Fastify, and PostgreSQL behind it. Features for NFL, NBA, and NHL products used by millions.",
  headline: "React and TypeScript on the front, Node.js, Fastify, and PostgreSQL behind it.",
  summary:
    "For the last three years I owned features end-to-end for NFL, NBA, and NHL sports and gaming products used by millions. I architected and launched a Tournament Bracket Builder from scratch in two months that reached 10,000+ users, and cut load times by 20% through profiling and code splitting.",
  location: "Kamianske (Dnipro), Ukraine",
  yearsLabel: "8 years",
  languages: [
    { name: "Ukrainian", level: "Native" },
    { name: "English", level: "B2 Upper-Intermediate" },
  ],
  availability: "Available",
  email: "yevheniiperekopskyi@gmail.com",
  linkedin: "https://www.linkedin.com/in/yevhenii-perekopskyi",
  telegram: "https://t.me/i_am_yevhen",
  github: "https://github.com/perekopskyi",
  sourceUrl: "https://github.com/perekopskyi/perekopskyi.github.io",
  url: "https://perekopskyi.github.io/",
};
