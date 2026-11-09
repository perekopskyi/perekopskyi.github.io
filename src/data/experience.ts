import type { Role } from "../types/content.ts";

/**
 * Employment history. The Experience section stays hidden until at least one
 * role has published: true and a company and position filled in.
 *
 * Example shape, not included in the list:
 * {
 *   id: "role-1",
 *   published: true,
 *   company: "",
 *   position: "Senior Software Engineer",
 *   period: "2022 — 2026",
 *   description: "",
 *   responsibilities: [],
 *   achievements: [],
 *   technologies: [],
 * }
 */
export const experience: Role[] = [];

export function publishedRoles(): Role[] {
  return experience.filter(
    (role) => role.published && role.company.trim() !== "" && role.position.trim() !== "",
  );
}
