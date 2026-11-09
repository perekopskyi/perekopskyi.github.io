import type { Site } from "../types/content.ts";

/**
 * Public site configuration.
 * Set email, linkedin, telegram, or availability to a string to show them.
 * Null hides the field. Leave unknown values null.
 */
export const site: Site = {
  name: "Eugene",
  role: "Senior Software Engineer",
  title: "Eugene — Senior Software Engineer",
  description:
    "Senior Software Engineer building scalable web products and AI-powered applications. 8+ years of experience.",
  location: "Ukraine",
  yearsLabel: "8+ years",
  availability: "Available",
  email: "yevheniiperekopskyi@gmail.com",
  linkedin: "https://www.linkedin.com/in/yevhenii-perekopskyi",
  telegram: "https://t.me/i_am_yevhen",
  github: "https://github.com/perekopskyi",
  url: "https://perekopskyi.github.io/",
};
