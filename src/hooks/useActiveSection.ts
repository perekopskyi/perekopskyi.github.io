import { useEffect, useState } from "react";

/**
 * Returns the id of the section that crosses the middle of the viewport, or null
 * (for example while the hero, which has no nav link, is in view).
 *
 * Starts as null on the server and on the first client render, so prerendered
 * markup and hydration match; it updates only after mount.
 */
export const useActiveSection = (ids: readonly string[]): string | null => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0) {
      return;
    }

    const intersecting = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          intersecting.set(entry.target.id, entry.isIntersecting);
        }
        // A thin band in the middle of the viewport: at most one section is in it.
        const current = sections.find((section) => intersecting.get(section.id));
        setActive(current ? current.id : null);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    for (const section of sections) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
};
