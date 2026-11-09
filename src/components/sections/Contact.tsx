import { ArrowUpRight } from "lucide-react";
import { site } from "../../data/site.ts";
import { PageContainer } from "../layout/PageContainer.tsx";
import { Reveal } from "../ui/Reveal.tsx";

interface ContactLink {
  label: string;
  href: string;
}

function contactLinks(): ContactLink[] {
  const links: ContactLink[] = [];

  if (site.email) {
    links.push({ label: "Email", href: `mailto:${site.email}` });
  }
  if (site.linkedin) {
    links.push({ label: "LinkedIn", href: site.linkedin });
  }
  if (site.telegram) {
    links.push({ label: "Telegram", href: site.telegram });
  }
  links.push({ label: "GitHub", href: site.github });

  return links;
}

function visibleValue(href: string): string {
  return href.replace(/^mailto:/, "").replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function Contact() {
  return (
    <section id="contact" className="bg-ink text-paper">
      <PageContainer className="py-20 md:py-28">
        <Reveal>
          <h2 className="max-w-3xl font-serif text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] font-[520] tracking-[-0.03em] text-balance">
            Have an interesting project in mind? Let’s talk.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 text-sm tracking-[0.14em] uppercase">{site.location}</p>
        </Reveal>
        <ul className="mt-12 flex flex-col gap-8">
          {contactLinks().map((link, index) => {
            const external = link.href.startsWith("http");
            return (
              <li key={link.label}>
                <Reveal delay={0.12 + index * 0.06}>
                  <a
                    href={link.href}
                    className="flex max-w-full flex-col gap-1"
                    {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  >
                    <span className="text-xs tracking-[0.16em] uppercase">{link.label}</span>
                    <span className="flex max-w-full flex-wrap items-center gap-2 font-serif text-2xl leading-tight font-[520] break-words underline decoration-paper/40 underline-offset-4 hover:decoration-paper sm:text-3xl">
                      {visibleValue(link.href)}
                      {external ? <ArrowUpRight className="size-5" aria-hidden="true" /> : null}
                      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                    </span>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </PageContainer>
    </section>
  );
}
