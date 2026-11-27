import type { SkillGroup } from "../types/content.ts";

/**
 * Skills, grouped. Source: the owner's CV. Keep only what a role or project
 * on this page can back up.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Redux", "TanStack", "React Native"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "Fastify", "Express", "NestJS", "REST APIs", "GraphQL", "WebSockets"],
  },
  {
    id: "database",
    label: "Databases",
    items: ["PostgreSQL", "Drizzle ORM", "Redis", "MongoDB", "Supabase", "Firebase"],
  },
  {
    id: "ui",
    label: "UI & Styling",
    items: ["Tailwind CSS", "Material UI", "Chakra UI", "HTML", "CSS", "Sass"],
  },
  {
    id: "testing",
    label: "Testing & Build",
    items: ["Vitest", "Jest", "React Testing Library", "Playwright", "Vite", "Webpack"],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    items: ["GitHub Actions", "CI/CD", "Docker", "Docker Compose", "AWS", "Azure", "Vercel", "Railway"],
  },
  {
    id: "practice",
    label: "Engineering practice",
    items: [
      "Architecture",
      "Performance profiling and optimization",
      "Code review",
      "Technical documentation",
      "Mentoring and technical interviews",
      "Agile / Scrum",
    ],
  },
  {
    id: "ai",
    label: "AI Engineering",
    items: ["LLM integrations", "AI coding agents (Claude Code, Cursor)", "Prompt engineering"],
  },
];
