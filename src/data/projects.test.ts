import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { isValidPagesUrl } from "@/lib/projects";

describe("projects", () => {
  it("tiene los 6 proyectos del curso en orden", () => {
    expect(projects).toHaveLength(6);
    expect(projects.map((project) => project.slug)).toEqual([
      "cv-html-semantico",
      "starlink",
      "youtube",
      "cinex",
      "ejercicios-js",
      "rick-morty",
    ]);
  });

  it("expone una pagesUrl válida por proyecto", () => {
    for (const project of projects) {
      expect(isValidPagesUrl(project.pagesUrl), project.slug).toBe(true);
    }
  });

  it("apunta la captura a /projects/<slug>.png", () => {
    for (const project of projects) {
      expect(project.image, project.slug).toBe(`/projects/${project.slug}.png`);
      expect(project.image.startsWith("/projects/")).toBe(true);
    }
  });

  it("completa nombre, descripción, tags y repositorio", () => {
    for (const project of projects) {
      expect(project.name.length, project.slug).toBeGreaterThan(0);
      expect(project.description.length, project.slug).toBeGreaterThan(0);
      expect(project.tags.length, project.slug).toBeGreaterThan(0);
      expect(project.repoUrl, project.slug).toMatch(
        /^https:\/\/github\.com\/leninsio\//,
      );
    }
  });
});
