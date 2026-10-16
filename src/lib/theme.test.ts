import { describe, expect, it } from "vitest";
import {
  THEME_STORAGE_KEY,
  nextPreference,
  parsePreference,
  resolveTheme,
} from "@/lib/theme";

describe("resolveTheme", () => {
  it("resuelve el sistema en oscuro", () => {
    expect(resolveTheme("system", true)).toBe("dark");
  });

  it("resuelve el sistema en claro", () => {
    expect(resolveTheme("system", false)).toBe("light");
  });

  it("respeta la preferencia explícita clara aunque el sistema esté oscuro", () => {
    expect(resolveTheme("light", true)).toBe("light");
  });

  it("respeta la preferencia explícita oscura aunque el sistema esté claro", () => {
    expect(resolveTheme("dark", false)).toBe("dark");
  });
});

describe("nextPreference", () => {
  it("recorre el ciclo sistema → claro → oscuro → sistema", () => {
    expect(nextPreference("system")).toBe("light");
    expect(nextPreference("light")).toBe("dark");
    expect(nextPreference("dark")).toBe("system");
  });
});

describe("parsePreference", () => {
  it("acepta los valores válidos", () => {
    expect(parsePreference("light")).toBe("light");
    expect(parsePreference("dark")).toBe("dark");
    expect(parsePreference("system")).toBe("system");
  });

  it("cae a sistema ante valores inválidos o ausentes", () => {
    expect(parsePreference(null)).toBe("system");
    expect(parsePreference("")).toBe("system");
    expect(parsePreference("banana")).toBe("system");
    expect(parsePreference("Light")).toBe("system");
  });
});

describe("THEME_STORAGE_KEY", () => {
  it("usa la clave theme", () => {
    expect(THEME_STORAGE_KEY).toBe("theme");
  });
});
