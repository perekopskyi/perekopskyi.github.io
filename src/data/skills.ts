import type { SkillGroup } from "../types/content.ts";

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "Next.js", "HTML", "CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "NestJS", "REST APIs", "GraphQL"],
  },
  {
    id: "database",
    label: "Database",
    items: ["PostgreSQL", "Drizzle ORM", "Redis", "MongoDB"],
  },
  {
    id: "cloud",
    label: "Cloud & Infrastructure",
    items: ["AWS", "AWS Lambda", "Docker", "CI/CD", "Vercel", "Railway"],
  },
  {
    id: "architecture",
    label: "Architecture",
    items: ["Microservices", "Event-driven architecture", "Scalable applications"],
  },
  {
    id: "ai",
    label: "AI Engineering",
    items: [
      "LLM integrations",
      "AI Agents",
      "Prompt Engineering",
      "Claude Code",
      "Cursor",
      "Devin",
    ],
  },
  {
    id: "testing",
    label: "Testing",
    items: ["Playwright", "Jest", "React Testing Library"],
  },
];
