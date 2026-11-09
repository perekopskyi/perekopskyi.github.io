import { PageContainer } from "../layout/PageContainer.tsx";
import { Reveal } from "../ui/Reveal.tsx";
import { SectionHeading } from "../ui/SectionHeading.tsx";

const facts = [
  { value: "8+", label: "Years of professional engineering" },
  { value: "Full stack", label: "Frontend, APIs, and product architecture" },
  { value: "AI-assisted", label: "Coding agents in the delivery workflow" },
];

export function About() {
  return (
    <section id="about" className="border-t border-line py-20 md:py-28">
      <PageContainer>
        <SectionHeading index="01" title="About" />
        <Reveal>
          <div className="max-w-2xl space-y-5 text-pretty leading-relaxed text-ink">
            <p>
              I build web products from the interface through to the system behind it. Eight years
              of that work covers frontend engineering, full-stack delivery, and the architecture
              of applications that need to keep growing. React and TypeScript are the tools I reach
              for first. Node, APIs, and PostgreSQL are there when the product needs more than a
              client.
            </p>
            <p>
              I also use AI coding tools as part of the job. Tournament Bracket Builder  is the clearest
              example: a tournament product built from scratch in about two months, with a reusable
              architecture so a new sport does not require a new application. The tools shorten the
              build. The product shape, the review, and what is safe to ship stay with me.
            </p>
          </div>
        </Reveal>
        <ul className="mt-14 grid border-t border-line sm:grid-cols-3">
            {facts.map((fact, index) => (
              <li
                key={fact.value}
                className="border-b border-line py-6 last:border-b-0 sm:border-r sm:border-b-0 sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              >
                <Reveal delay={index * 0.08}>
                  <p className="font-serif text-3xl font-[520] tracking-tight text-ink">{fact.value}</p>
                  <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted">{fact.label}</p>
                </Reveal>
              </li>
            ))}
          </ul>
      </PageContainer>
    </section>
  );
}
