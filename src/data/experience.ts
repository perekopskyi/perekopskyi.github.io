import type { Education, Role } from "../types/content.ts";

/**
 * Employment history, newest first. Source: the owner's CV.
 * A role is shown only when published is true and company and position are set.
 * Achievements are measurable outcomes; responsibilities are the scope of the job.
 */
export const experience: Role[] = [
  {
    id: "low6",
    published: true,
    company: "LOW6",
    position: "Full-stack Developer (React, Node.js)",
    location: "UK, remote",
    period: "Aug 2023 — Sep 2026",
    description:
      "Sports and gaming products for NFL, NBA, and NHL audiences. Owned features end-to-end, from database to UI.",
    achievements: [
      "Architected and launched a Tournament Bracket Builder from scratch in 2 months; it reached 10,000+ users.",
      "Delivered features for sports and gaming applications used by millions across the NFL, NBA, and NHL.",
      "Reduced app load times by 20% through performance profiling, code splitting, and rendering optimization.",
      "Delivered 20+ production dashboards, games, and interactive quizzes.",
      "Established a reusable component architecture and CI/CD pipelines adopted across multiple teams.",
    ],
    responsibilities: [
      "Built real-time dashboards with React, TypeScript, Node.js, Fastify, PostgreSQL, and REST APIs.",
      "Standardized technical documentation to improve knowledge sharing and onboarding across distributed teams.",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Fastify", "PostgreSQL", "REST APIs"],
  },
  {
    id: "artmyweb",
    published: true,
    company: "ArtMyWeb",
    position: "Frontend Developer (React JS)",
    location: "Mykolaiv, Ukraine / remote",
    period: "Aug 2020 — Aug 2023",
    description:
      "Product studio. React and React Native applications from design handoff to production for healthcare, real estate, and B2B clients.",
    achievements: [
      "Delivered 10+ client projects to production across healthcare, real estate, and B2B domains.",
      "Built cross-platform features for Betterspace, a UK mental health platform serving thousands of users: Redux state, Formik and Yup validation, Recharts data visualization.",
      "Built a Next.js real estate search platform with server-side rendering.",
      "Mentored junior developers, ran technical interviews, and contributed to frontend hiring decisions.",
    ],
    responsibilities: [
      "Architected React and React Native applications and translated product requirements into maintainable solutions.",
      "Developed B2B single-page applications with React, React Router, Redux, and Material UI.",
      "Worked with designers, backend engineers, and business stakeholders to align implementation with product goals.",
    ],
    technologies: [
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "Redux",
      "React Router",
      "Material UI",
      "Formik",
      "Yup",
      "Recharts",
    ],
  },
  {
    id: "upwork",
    published: true,
    company: "Upwork · Freelance",
    position: "Web Developer",
    location: "Remote",
    period: "Jun 2018 — Aug 2020",
    description: "Landing pages and web applications for small businesses, from requirements to deployment.",
    achievements: [],
    responsibilities: [
      "Built custom landing pages and web applications with HTML, CSS, and JavaScript.",
      "Created PHP scripts and authentication flows integrated with the Telegram API.",
      "Delivered projects from requirements through implementation and deployment.",
    ],
    technologies: ["JavaScript", "HTML", "CSS", "PHP", "Telegram API"],
  },
];

export const education: Education[] = [
  {
    id: "dnipro-polytechnic",
    institution: "The National Technical University Dnipro Polytechnic",
    degree: "Master's degree with honors, Information and Measurement Technologies",
    location: "Dnipro, Ukraine",
    period: "2010 — 2015",
  },
];

export function publishedRoles(): Role[] {
  return experience.filter(
    (role) => role.published && role.company.trim() !== "" && role.position.trim() !== "",
  );
}
