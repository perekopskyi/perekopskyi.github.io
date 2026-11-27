import { publishedRoles } from "./experience.ts";
import { projects } from "./projects.ts";
import { site } from "./site.ts";
import type { Project } from "../types/content.ts";

/** Public path of the generated CV, e.g. /Yevhenii-Perekopskyi-CV.pdf. */
export const cvPath = `/${site.fullName.trim().replace(/\s+/g, "-")}-CV.pdf`;

/**
 * The CV is always generated at build time, but the page links to it only
 * once employment history is published. A senior CV without roles hurts more
 * than it helps.
 */
export function cvLinked(): boolean {
  return publishedRoles().length > 0;
}

export function shippedProjects(): Project[] {
  return projects.filter(
    (project) =>
      project.published &&
      project.summary.trim() !== "" &&
      (project.status === "live" || project.status === "mvp" || project.status === "confidential"),
  );
}
