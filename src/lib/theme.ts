export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

const PREFERENCES: readonly ThemePreference[] = ["system", "light", "dark"];

export function parsePreference(raw: string | null): ThemePreference {
  return raw !== null && (PREFERENCES as readonly string[]).includes(raw)
    ? (raw as ThemePreference)
    : "system";
}

export function resolveTheme(
  preference: ThemePreference,
  systemPrefersDark: boolean,
): ResolvedTheme {
  if (preference === "system") {
    return systemPrefersDark ? "dark" : "light";
  }

  return preference;
}

export function nextPreference(current: ThemePreference): ThemePreference {
  const index = PREFERENCES.indexOf(current);

  return PREFERENCES[(index + 1) % PREFERENCES.length] ?? "system";
}
