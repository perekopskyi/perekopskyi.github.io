import type { Project } from "../types/content.ts";

/**
 * Featured work. A project is rendered only when `published` is true and
 * `summary` is non-empty. Leave url, githubUrl, and technologies empty until
 * they are confirmed. Do not add metrics that are not already stated here.
 */
export const projects: Project[] = [
  {
    id: "sport-bracket-builder",
    name: "Tournament Bracket Builder ",
    summary:
      "A tournament management application built from scratch in about two months using AI-assisted development tools. The product is a reusable tournament architecture, so standing up another sport does not mean starting over.",
    category: "Product",
    technologies: [],
    achievements: [
      "10,000+ users.",
      "Built a reusable tournament architecture.",
      "Simplified creation of new sports tournaments.",
      "Improved extensibility and scalability.",
    ],
    status: "live",
    statusLabel: "In production",
    published: true,
    cover: "bracket",
  },
  {
    id: "prydniprovets",
    name: "Garden society management panel",
    summary:
      "An MVP of the management panel for a garden society. Members can register, and the board keeps plots, electricity readings, community projects, and meetings in one place.",
    category: "Product",
    technologies: ["React", "Tailwind CSS", "Shadcn UI", "TypeScript", "Node.js", "Fastify", "PostgreSQL", "Drizzle ORM", "Redis", "MongoDB", "Vercel", "Railway"],
    achievements: [
      "Member registration.",
      "Plot records.", 
      "Electricity readings.",
      "Community projects.",
      "Meetings.",
    ],
    status: "mvp",
    statusLabel: "MVP",
    published: true,
    cover: "garden",
  },
  {
    id: "react-performance-monitor",
    name: "React Performance Monitor",
    summary:
      "A concept for a Chrome DevTools extension and a small SaaS that would monitor React application performance. This is a pet project, not a completed production product.",
    category: "Developer tooling",
    technologies: [],
    achievements: [
      "Component render analysis for a running React tree.",
      "A single place to watch runtime performance.",
      "Core Web Vitals alongside render cost.",
      "Recommendations for what to optimize next.",
    ],
    status: "concept",
    statusLabel: "Concept",
    published: true,
    cover: "monitor",
  },
  {
    id: "ai-e2e-test-generator",
    name: "AI E2E Test Generator",
    summary:
      "An experimental idea for an AI-assisted tool that would analyze a running website and draft end-to-end testing scenarios. It is not a completed product.",
    category: "Testing",
    technologies: [],
    achievements: [
      "DOM analysis of a running page.",
      "UI intent detection.",
      "Automated test scenario generation.",
      "A path toward Playwright integration.",
    ],
    status: "experimental",
    statusLabel: "Experiment",
    published: true,
    cover: "e2e",
  },
  {
    id: "commercial-product",
    name: "Commercial product",
    summary: "",
    category: "Commercial",
    technologies: [],
    achievements: [],
    status: "confidential",
    statusLabel: "Commercial",
    published: false,
    cover: "commercial",
  },
];
