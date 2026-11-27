import { useEffect, useState } from "react";
import { publishedRoles } from "../../data/experience.ts";
import { site } from "../../data/site.ts";
import { useActiveSection } from "../../hooks/useActiveSection.ts";
import { ThemeToggle } from "../ui/ThemeToggle.tsx";

// Built once from static data, so the list is stable across renders.
const links = [
  { href: "#about", label: "About" },
  ...(publishedRoles().length > 0 ? [{ href: "#experience", label: "Experience" }] : []),
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
const sectionIds = links.map((link) => link.href.slice(1));

export const Header = () => {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-6 md:px-10">
        <div className="flex min-w-0 items-baseline gap-4">
          <a href="#top" className="truncate font-serif text-xl tracking-tight text-ink">
            {site.fullName}
          </a>
          <p className="hidden text-xs tracking-[0.14em] text-muted uppercase lg:block">
            {site.role}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1 md:gap-4">
          <button
            type="button"
            className="min-h-11 px-1 text-sm text-ink md:hidden"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
          <nav
            id="site-nav"
            aria-label="Sections"
            className={
              open
                ? "absolute inset-x-0 top-16 border-b border-line bg-paper px-6 py-4 md:static md:inset-auto md:border-0 md:p-0"
                : "hidden md:block"
            }
          >
            <ul className="flex flex-col md:flex-row md:gap-8">
              {links.map((link) => {
                // The current section is marked by an underline and aria-current, not by colour alone.
                const active = link.href === `#${activeId}`;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={active ? "true" : undefined}
                      className={`inline-flex min-h-11 items-center text-sm text-ink underline-offset-4 ${
                        active ? "underline decoration-2" : "hover:underline"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <span className="hidden h-4 w-px bg-line md:block" aria-hidden="true" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
