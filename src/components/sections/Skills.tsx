import { skillGroups } from "../../data/skills.ts";
import { PageContainer } from "../layout/PageContainer.tsx";
import { Reveal } from "../ui/Reveal.tsx";
import { SectionHeading } from "../ui/SectionHeading.tsx";

export function Skills() {
  return (
    <section id="skills" className="border-t border-line py-20 md:py-28">
      <PageContainer>
        <SectionHeading index="03" title="Skills" />
        <dl className="grid gap-x-16 gap-y-8 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} className="border-t border-line pt-4" delay={(index % 2) * 0.08}>
              <dt className="font-serif text-2xl font-[520] tracking-tight text-ink">{group.label}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{group.items.join(" · ")}</dd>
            </Reveal>
          ))}
        </dl>
      </PageContainer>
    </section>
  );
}
