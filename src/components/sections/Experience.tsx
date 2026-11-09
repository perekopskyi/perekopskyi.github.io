import { publishedRoles } from "../../data/experience.ts";
import { PageContainer } from "../layout/PageContainer.tsx";
import { Reveal } from "../ui/Reveal.tsx";
import { SectionHeading } from "../ui/SectionHeading.tsx";

export function Experience() {
  const roles = publishedRoles();

  if (roles.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="border-t border-line py-20 md:py-28">
      <PageContainer>
        <SectionHeading index="04" title="Experience" />
        <ol className="border-l border-line">
          {roles.map((role) => (
            <li key={role.id} className="relative pb-14 pl-8 last:pb-0">
              <span className="absolute top-2 -left-1 size-2 bg-ink" aria-hidden="true" />
              <Reveal>
              <p className="text-xs tracking-[0.16em] text-muted uppercase">{role.period}</p>
              <h3 className="mt-2 font-serif text-3xl font-[520] tracking-tight text-ink">
                {role.position}
              </h3>
              <p className="mt-1 text-muted">{role.company}</p>
              {role.description ? (
                <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-ink">{role.description}</p>
              ) : null}
              {role.responsibilities.length > 0 ? (
                <>
                  <h4 className="mt-6 text-xs tracking-[0.16em] text-muted uppercase">
                    Responsibilities
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {role.responsibilities.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-ink">
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              {role.achievements.length > 0 ? (
                <>
                  <h4 className="mt-6 text-xs tracking-[0.16em] text-muted uppercase">Outcomes</h4>
                  <ul className="mt-3 space-y-2">
                    {role.achievements.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-ink">
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              {role.technologies.length > 0 ? (
                <p className="mt-4 text-sm text-muted">{role.technologies.join(" · ")}</p>
              ) : null}
              </Reveal>
            </li>
          ))}
        </ol>
      </PageContainer>
    </section>
  );
}
