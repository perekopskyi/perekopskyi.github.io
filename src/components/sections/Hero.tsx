import { cvLinked, cvPath } from "../../data/cv.ts";
import { site } from "../../data/site.ts";
import { PageContainer } from "../layout/PageContainer.tsx";
import { Button } from "../ui/Button.tsx";
import { Reveal } from "../ui/Reveal.tsx";

export function Hero() {
  return (
    <section id="top" className="pt-16 pb-20 md:pt-24 md:pb-28">
      <PageContainer>
        <Reveal>
          <div className="flex items-center gap-2 text-xs tracking-[0.18em] text-muted uppercase">
            <span>{site.location}</span>
            <span aria-hidden="true"> · </span>
            <span>{site.yearsLabel}</span>
            {site.availability ? (
              <>
                <span aria-hidden="true"> · </span>
                <span className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-accent" aria-hidden="true" />
                  {site.availability}
                </span>
              </>
            ) : null}
          </div>
        </Reveal>
        <h1 className="mt-8 font-serif text-[clamp(3rem,8vw,6.75rem)] leading-[0.92] font-[520] tracking-[-0.045em] text-balance text-ink">
          {site.fullName}
        </h1>
        <Reveal delay={0.08}>
          <p className="mt-8 max-w-2xl font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-snug font-[520] tracking-[-0.02em] text-balance text-ink">
            {site.role}. {site.headline}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted">
            {site.summary}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Button href="#work">View Projects</Button>
            {cvLinked() ? (
              <Button href={cvPath} variant="secondary" download>
                Download CV (PDF)
              </Button>
            ) : null}
            <Button href="#contact" variant="secondary">
              Get in Touch
            </Button>
          </div>
        </Reveal>
      </PageContainer>
    </section>
  );
}
