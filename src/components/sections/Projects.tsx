import { projects } from "../../data/projects.ts";
import { PageContainer } from "../layout/PageContainer.tsx";
import { ProjectCard } from "../ui/ProjectCard.tsx";
import { SectionHeading } from "../ui/SectionHeading.tsx";

export function Projects() {
  const visible = projects.filter(
    (project) => project.published && project.name.trim() !== "" && project.summary.trim() !== "",
  );

  return (
    <section id="work" className="border-t border-line py-20 md:py-28">
      <PageContainer>
        <SectionHeading
          index="02"
          title="Selected work"
          lede="One product in production, an MVP for a garden society, and two studies that are not products yet. Commercial work stays unpublished until it can be described without breaking confidentiality."
        />
        <div>
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} reversed={index % 2 === 1} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
