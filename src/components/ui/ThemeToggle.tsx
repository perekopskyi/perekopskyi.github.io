import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { applyTheme, currentTheme, onSystemThemeChange, type Theme } from "../../lib/theme.ts";

/**
 * Light / dark switch: a moon in the light theme, a sun in the dark one.
 *
 * The icon is picked by CSS (.theme-toggle__* in index.css) from the theme on
 * <html>, so the prerendered markup is the same for every visitor and shows the
 * right icon before hydration. aria-pressed is set after mount.
 */
export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const sync = () => setTheme(currentTheme());
    sync();
    return onSystemThemeChange(sync);
  }, []);

  const toggle = () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      data-theme-toggle=""
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : theme === "dark"}
      className="inline-flex size-11 items-center justify-center text-ink transition-colors hover:text-accent"
      onClick={toggle}
    >
      <Moon className="theme-toggle__moon size-4" aria-hidden="true" />
      <Sun className="theme-toggle__sun size-4" aria-hidden="true" />
    </button>
  );
};
