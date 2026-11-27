import { education, publishedRoles } from "../../data/experience.ts";
import { PageContainer } from "../layout/PageContainer.tsx";
import { Reveal } from "../ui/Reveal.tsx";
import { SectionHeading } from "../ui/SectionHeading.tsx";

function List({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) {
    return null;
  }
  return (
    <>
      <h4 className="mt-6 text-xs tracking-[0.16em] text-muted uppercase">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="grid grid-cols-[1rem_1fr] gap-2 text-sm leading-relaxed text-ink">
            <span aria-hidden="true" className="text-muted">
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Experience() {
  const roles = publishedRoles();

  if (roles.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="border-t border-line py-20 md:py-28">
      <PageContainer>
        <SectionHeading index="02" title="Experience" />
        <ol className="border-l border-line">
          {roles.map((role) => (
            <li key={role.id} className="relative pb-14 pl-8 last:pb-0">
              <span className="absolute top-2 -left-1 size-2 bg-ink" aria-hidden="true" />
              <Reveal>
                <p className="text-xs tracking-[0.16em] text-muted uppercase">
                  {role.period}
                  {role.location ? (
                    <>
                      <span aria-hidden="true"> · </span>
                      {role.location}
                    </>
                  ) : null}
                </p>
                <h3 className="mt-2 font-serif text-3xl font-[520] tracking-tight text-ink">
                  {role.company}
                </h3>
                <p className="mt-1 text-muted">{role.position}</p>
                {role.description ? (
                  <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-ink">{role.description}</p>
                ) : null}
                <div className="max-w-2xl">
                  <List title="Outcomes" items={role.achievements} />
                  <List title="Scope" items={role.responsibilities} />
                </div>
                {role.technologies.length > 0 ? (
                  <p className="mt-6 text-sm text-muted">{role.technologies.join(" · ")}</p>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ol>
        {education.length > 0 ? (
          <div className="mt-16 border-t border-line pt-8">
            <h3 className="text-xs tracking-[0.16em] text-muted uppercase">Education</h3>
            <ul className="mt-4 space-y-4">
              {education.map((item) => (
                <li key={item.id}>
                  <p className="font-serif text-xl font-[520] tracking-tight text-ink">{item.institution}</p>
                  <p className="text-sm text-muted">
                    {item.degree}
                    <span aria-hidden="true"> · </span>
                    {item.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </PageContainer>
    </section>
  );
}
