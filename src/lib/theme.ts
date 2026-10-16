export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

export function parsePreference(raw: string | null): Theme | null {
  return raw === "light" || raw === "dark" ? raw : null;
}

export function resolveTheme(
  preference: Theme | null,
  systemPrefersDark: boolean,
): Theme {
  if (preference === null) {
    return systemPrefersDark ? "dark" : "light";
  }

  return preference;
}

export function toggleTheme(current: Theme): Theme {
  return current === "light" ? "dark" : "light";
}
