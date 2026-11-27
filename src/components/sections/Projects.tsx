import { projects } from "../../data/projects.ts";
import type { Project, ProjectStatus } from "../../types/content.ts";
import { PageContainer } from "../layout/PageContainer.tsx";
import { ProjectCard } from "../ui/ProjectCard.tsx";
import { Reveal } from "../ui/Reveal.tsx";
import { SectionHeading } from "../ui/SectionHeading.tsx";

const shippedStatuses: ReadonlySet<ProjectStatus> = new Set(["live", "mvp", "confidential"]);

function isVisible(project: Project): boolean {
  return project.published && project.name.trim() !== "" && project.summary.trim() !== "";
}

export function Projects() {
  const visible = projects.filter(isVisible);
  const shipped = visible.filter((project) => shippedStatuses.has(project.status));
  const exploring = visible.filter((project) => !shippedStatuses.has(project.status));

  return (
    <section id="work" className="border-t border-line py-20 md:py-28">
      <PageContainer>
        <SectionHeading
          index="03"
          title="Selected work"
          lede="Products that real people use. Commercial work stays unpublished until it can be described without breaking confidentiality."
        />
        <div>
          {shipped.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} reversed={index % 2 === 1} />
          ))}
        </div>
        {exploring.length > 0 ? (
          <div className="mt-8 border-t border-line pt-12 md:pt-16" aria-labelledby="exploring-heading">
            <h3
              id="exploring-heading"
              className="font-serif text-2xl font-[520] tracking-tight text-ink md:text-3xl"
            >
              Exploring
            </h3>
            <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted">
              Ideas I am working through. These are not finished products.
            </p>
            <ul className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-2">
              {exploring.map((project, index) => (
                <li key={project.id}>
                  <Reveal className="border-t border-line pt-4" delay={(index % 2) * 0.08}>
                    <ExploringItem project={project} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </PageContainer>
    </section>
  );
}

function ExploringItem({ project }: { project: Project }) {
  return (
    <article>
      <p className="text-xs tracking-[0.16em] text-muted uppercase">
        {project.statusLabel}
        <span aria-hidden="true"> · </span>
        {project.category}
      </p>
      <h4 className="mt-2 font-serif text-xl font-[520] tracking-tight text-ink">{project.name}</h4>
      <p className="mt-2 text-sm leading-relaxed text-ink">{project.summary}</p>
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-2 inline-flex min-h-11 items-center text-sm text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
        >
          Source
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : null}
    </article>
  );
}
