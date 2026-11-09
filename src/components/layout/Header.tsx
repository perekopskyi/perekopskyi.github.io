import { useEffect, useState } from "react";
import { publishedRoles } from "../../data/experience.ts";
import { site } from "../../data/site.ts";

const baseLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ...baseLinks,
    ...(publishedRoles().length > 0 ? [{ href: "#experience", label: "Experience" }] : []),
    { href: "#contact", label: "Contact" },
  ];

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
        <div className="flex items-baseline gap-4">
          <a href="#top" className="font-serif text-xl tracking-tight text-ink">
            {site.name}
          </a>
          <p className="hidden text-xs tracking-[0.14em] text-muted uppercase lg:block">
            {site.role}
          </p>
        </div>
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
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm text-ink underline-offset-4 hover:underline"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
