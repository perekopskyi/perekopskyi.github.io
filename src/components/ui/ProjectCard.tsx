import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../types/content.ts";
import { Cover } from "./Cover.tsx";
import { Reveal } from "./Reveal.tsx";

export function ProjectCard({
  project,
  index,
  reversed,
}: {
  project: Project;
  index: number;
  reversed: boolean;
}) {
  const indexLabel = String(index).padStart(2, "0");
  const pointsLabel =
    project.status === "live" ? "Outcomes" : project.status === "mvp" ? "Includes" : "Explores";

  const media = (
    <Reveal className={reversed ? "max-md:order-1 md:w-[46%]" : "md:w-[46%]"} delay={0.08}>
      <Cover kind={project.cover} index={indexLabel} />
    </Reveal>
  );

  const copy = (
    <Reveal className={reversed ? "max-md:order-2 md:w-[54%]" : "md:w-[54%]"}>
      <p className="text-xs tracking-[0.16em] text-muted uppercase">
        {project.statusLabel}
        <span aria-hidden="true"> · </span>
        {project.category}
      </p>
      <h3 className="mt-3 font-serif text-3xl font-[520] tracking-tight text-ink md:text-4xl">
        {project.name}
      </h3>
      <p className="mt-4 max-w-xl text-pretty leading-relaxed text-ink">{project.summary}</p>
      {project.achievements.length > 0 ? (
        <>
          <p className="mt-8 text-xs tracking-[0.16em] text-muted uppercase">{pointsLabel}</p>
          <ul className="mt-3 space-y-2">
            {project.achievements.map((item) => (
              <li key={item} className="grid grid-cols-[1rem_1fr] gap-2 text-sm leading-relaxed text-ink">
                <span aria-hidden="true" className="text-muted">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {project.technologies.length > 0 ? (
        <p className="mt-6 text-sm text-muted">{project.technologies.join(" · ")}</p>
      ) : null}
      {project.url || project.githubUrl ? (
        <div className="mt-6 flex flex-wrap gap-x-6">
          {project.url ? <TextLink href={project.url}>Visit</TextLink> : null}
          {project.githubUrl ? <TextLink href={project.githubUrl}>Source</TextLink> : null}
        </div>
      ) : null}
    </Reveal>
  );

  return (
    <article className="flex flex-col gap-8 border-t border-line py-12 hover:border-ink md:flex-row md:items-center md:gap-16 md:py-16">
      {reversed ? (
        <>
          {copy}
          {media}
        </>
      ) : (
        <>
          {media}
          {copy}
        </>
      )}
    </article>
  );
}

function TextLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex min-h-11 items-center gap-1 text-sm text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
    >
      {children}
      <ArrowUpRight className="size-4" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
