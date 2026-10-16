import { describe, expect, it } from "vitest";
import { isValidPagesUrl } from "@/lib/projects";

describe("isValidPagesUrl", () => {
  it("acepta una URL https de un repositorio en github.io", () => {
    expect(isValidPagesUrl("https://u.github.io/repo/")).toBe(true);
  });

  it("acepta la raíz de un sitio github.io", () => {
    expect(isValidPagesUrl("https://u.github.io")).toBe(true);
  });

  it("rechaza URLs con http", () => {
    expect(isValidPagesUrl("http://u.github.io/repo/")).toBe(false);
  });

  it("rechaza host que no es github.io", () => {
    expect(isValidPagesUrl("https://ejemplo.com/repo/")).toBe(false);
  });

  it("rechaza un host que solo contiene github.io como subcadena", () => {
    expect(isValidPagesUrl("https://u.github.io.ejemplo.com/repo/")).toBe(false);
  });

  it("rechaza una URL inválida", () => {
    expect(isValidPagesUrl("no-es-una-url")).toBe(false);
  });

  it("rechaza una cadena vacía", () => {
    expect(isValidPagesUrl("")).toBe(false);
  });
});
