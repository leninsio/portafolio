import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { buildAboutStats, counterValue } from "@/lib/stats";

describe("buildAboutStats", () => {
  it("calcula 6 proyectos, 11 tecnologías y 3 áreas con los datos reales", () => {
    const stats = buildAboutStats(projects, skillGroups);

    expect(stats.map((stat) => stat.value)).toEqual([6, 11, 3]);
    expect(stats.map((stat) => stat.label)).toEqual([
      "Proyectos",
      "Tecnologías",
      "Áreas",
    ]);
    expect(stats.map((stat) => stat.detail)).toEqual([
      "publicados en GitHub Pages",
      "de la interfaz al servidor",
      "Frontend · Backend · Herramientas",
    ]);
  });

  it("se calcula a partir de los datos que recibe", () => {
    const fakeProjects = [{}, {}, {}] as unknown as typeof projects;
    const fakeGroups = [
      { title: "Frontend", items: [{}, {}] },
      { title: "Backend", items: [{}] },
    ] as unknown as typeof skillGroups;

    const stats = buildAboutStats(fakeProjects, fakeGroups);

    expect(stats.map((stat) => stat.value)).toEqual([3, 3, 2]);
    expect(stats.map((stat) => stat.label)).toEqual([
      "Proyectos",
      "Tecnologías",
      "Áreas",
    ]);
    expect(stats.map((stat) => stat.detail)).toEqual([
      "publicados en GitHub Pages",
      "de la interfaz al servidor",
      "Frontend · Backend",
    ]);
  });
});

describe("counterValue", () => {
  it("devuelve 0 en t=0 y el valor final al terminar", () => {
    expect(counterValue(11, 0, 900)).toBe(0);
    expect(counterValue(11, 900, 900)).toBe(11);
    expect(counterValue(11, 1200, 900)).toBe(11);
  });

  it("crece en valores intermedios y siempre da enteros", () => {
    const mid1 = counterValue(11, 300, 900);
    const mid2 = counterValue(11, 600, 900);

    expect(mid1).toBeGreaterThan(0);
    expect(mid2).toBeGreaterThan(mid1);
    expect(mid2).toBeLessThan(11);

    for (const elapsed of [0, 120, 300, 600, 890, 900]) {
      expect(Number.isInteger(counterValue(11, elapsed, 900))).toBe(true);
    }
  });

  it("mantiene el valor final si la duración no es positiva", () => {
    expect(counterValue(5, 0, 0)).toBe(5);
    expect(counterValue(5, 400, -1)).toBe(5);
  });
});
