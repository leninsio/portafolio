import { describe, expect, it } from "vitest";
import {
  THEME_STORAGE_KEY,
  parsePreference,
  resolveTheme,
  toggleTheme,
} from "@/lib/theme";

describe("parsePreference", () => {
  it("acepta solo los valores light y dark", () => {
    expect(parsePreference("light")).toBe("light");
    expect(parsePreference("dark")).toBe("dark");
  });

  it("trata cualquier otro valor, incluido system, como sin elección", () => {
    expect(parsePreference("system")).toBeNull();
    expect(parsePreference(null)).toBeNull();
    expect(parsePreference("")).toBeNull();
    expect(parsePreference("banana")).toBeNull();
    expect(parsePreference("Light")).toBeNull();
  });
});

describe("resolveTheme", () => {
  it("usa el tema del sistema cuando no hay preferencia guardada", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
  });

  it("respeta la preferencia explícita por encima del sistema", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });
});

describe("toggleTheme", () => {
  it("alterna al tema opuesto en ambos sentidos", () => {
    expect(toggleTheme("light")).toBe("dark");
    expect(toggleTheme("dark")).toBe("light");
  });
});

describe("THEME_STORAGE_KEY", () => {
  it("usa la clave theme", () => {
    expect(THEME_STORAGE_KEY).toBe("theme");
  });
});
