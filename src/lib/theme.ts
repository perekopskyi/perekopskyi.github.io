/**
 * Colour theme helpers. The page follows the system setting unless the visitor
 * picks the other theme with the header toggle; that choice is stored in
 * localStorage and applied before first paint by the inline script in index.html.
 */
export type Theme = "light" | "dark";

export const themeStorageKey = "theme";

/** Browser chrome colours (paper token) for <meta name="theme-color">. */
export const themeColors: Record<Theme, string> = { light: "#f3f0e8", dark: "#161411" };

const darkQuery = "(prefers-color-scheme: dark)";

export const systemTheme = (): Theme => (window.matchMedia(darkQuery).matches ? "dark" : "light");

/** The theme in effect: an explicit choice on <html>, else the system setting. */
export const currentTheme = (): Theme => {
  const chosen = document.documentElement.dataset.theme;
  return chosen === "light" || chosen === "dark" ? chosen : systemTheme();
};

/**
 * Switches to `theme`. Picking the system theme clears the stored choice, so the
 * page goes back to following the system.
 */
export const applyTheme = (theme: Theme): void => {
  const root = document.documentElement;
  const followSystem = theme === systemTheme();

  if (followSystem) {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = theme;
  }

  try {
    if (followSystem) {
      localStorage.removeItem(themeStorageKey);
    } else {
      localStorage.setItem(themeStorageKey, theme);
    }
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the switch still works for this visit.
  }

  for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
    meta.content = followSystem
      ? themeColors[meta.media.includes("dark") ? "dark" : "light"]
      : themeColors[theme];
  }
};

/** Calls `onChange` when the system theme changes; returns an unsubscribe function. */
export const onSystemThemeChange = (onChange: () => void): (() => void) => {
  const query = window.matchMedia(darkQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
