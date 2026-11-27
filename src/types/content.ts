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
  /** Short name used in conversational copy ("Hi, I'm …"). */
  name: string;
  /** Legal / LinkedIn name. Used in the title, H1, and structured data. */
  fullName: string;
  role: string;
  title: string;
  description: string;
  /** One line under the name: what you do and with what. Used by the hero and the CV. */
  headline: string;
  /** Short proof paragraph. Used by the hero and the CV summary. */
  summary: string;
  location: string;
  yearsLabel: string;
  availability: string | null;
  email: string | null;
  linkedin: string | null;
  telegram: string | null;
  github: string;
  /** Repository that holds this site's source. */
  sourceUrl: string;
  url: string;
}
