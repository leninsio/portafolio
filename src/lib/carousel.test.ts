import { describe, expect, it } from "vitest";
import {
  clampIndex,
  nextIndex,
  pageCount,
  prevIndex,
} from "@/lib/carousel";

describe("clampIndex", () => {
  it("deja igual un índice dentro del rango", () => {
    expect(clampIndex(2, 6)).toBe(2);
  });

  it("baja a 0 un índice negativo", () => {
    expect(clampIndex(-3, 6)).toBe(0);
  });

  it("sube al último índice cuando se pasa", () => {
    expect(clampIndex(9, 6)).toBe(5);
  });

  it("devuelve 0 cuando no hay slides", () => {
    expect(clampIndex(4, 0)).toBe(0);
  });
});

describe("nextIndex", () => {
  it("avanza una posición", () => {
    expect(nextIndex(0, 6)).toBe(1);
  });

  it("se detiene en el último slide, sin bucle", () => {
    expect(nextIndex(5, 6)).toBe(5);
  });
});

describe("prevIndex", () => {
  it("retrocede una posición", () => {
    expect(prevIndex(3, 6)).toBe(2);
  });

  it("se detiene en el primer slide, sin bucle", () => {
    expect(prevIndex(0, 6)).toBe(0);
  });
});

describe("pageCount", () => {
  it("cuenta una página por vista cuando divide exacto", () => {
    expect(pageCount(6, 3)).toBe(2);
  });

  it("redondea hacia arriba las páginas incompletas", () => {
    expect(pageCount(6, 4)).toBe(2);
    expect(pageCount(6, 5)).toBe(2);
  });

  it("nunca divide entre cero", () => {
    expect(pageCount(6, 0)).toBe(6);
  });

  it("devuelve 0 cuando no hay slides", () => {
    expect(pageCount(0, 3)).toBe(0);
  });
});
