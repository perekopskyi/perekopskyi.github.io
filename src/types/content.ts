export type ProjectStatus = "live" | "mvp" | "concept" | "experimental" | "confidential";

export type CoverKind = "bracket" | "garden" | "monitor" | "e2e" | "commercial";

export interface Project {
  id: string;
  name: string;
  summary: string;
  category: string;
  technologies: string[];
  achievements: string[];
  url?: string;
  githubUrl?: string;
  status: ProjectStatus;
  statusLabel: string;
  published: boolean;
  cover: CoverKind;
}

export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
}

export interface Role {
  id: string;
  published: boolean;
  company: string;
  position: string;
  period: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface Site {
  name: string;
  role: string;
  title: string;
  description: string;
  location: string;
  yearsLabel: string;
  availability: string | null;
  email: string | null;
  linkedin: string | null;
  telegram: string | null;
  github: string;
  url: string;
}
