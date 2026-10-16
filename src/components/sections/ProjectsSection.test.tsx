import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { projects } from "@/data/projects";

describe("ProjectsSection", () => {
  it("es una region accesible etiquetada por su titulo", () => {
    render(<ProjectsSection projects={projects} />);

    expect(screen.getByRole("region", { name: "Proyectos" })).toBeInTheDocument();
  });

  it("renderiza una tarjeta por proyecto", () => {
    render(<ProjectsSection projects={projects} />);

    expect(
      screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent),
    ).toEqual(projects.map((project) => project.name));
  });

  it("muestra la captura con alt descriptivo y los tags", () => {
    render(<ProjectsSection projects={projects} />);

    for (const project of projects) {
      const card = screen
        .getByRole("heading", { level: 3, name: project.name })
        .closest("li");

      expect(card).not.toBeNull();
      expect(
        within(card as HTMLElement).getByRole("img", {
          name: `Captura de ${project.name}`,
        }),
      ).toBeInTheDocument();
      for (const tag of project.tags) {
        expect(within(card as HTMLElement).getByText(tag)).toBeInTheDocument();
      }
    }
  });

  it("enlaza cada tarjeta a su sitio y a su repositorio", () => {
    render(<ProjectsSection projects={projects} />);

    for (const project of projects) {
      const card = screen
        .getByRole("heading", { level: 3, name: project.name })
        .closest("li") as HTMLElement;
      const site = within(card).getByRole("link", { name: "Ver sitio" });
      const repo = within(card).getByRole("link", { name: "Código" });

      expect(site).toHaveAttribute("href", project.pagesUrl);
      expect(site).toHaveAttribute("target", "_blank");
      expect(site).toHaveAttribute("rel", "noopener noreferrer");
      expect(repo).toHaveAttribute("href", project.repoUrl);
      expect(repo).toHaveAttribute("target", "_blank");
      expect(repo).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("oculta Ver sitio cuando la pagesUrl no es válida", () => {
    render(
      <ProjectsSection
        projects={[{ ...projects[0], pagesUrl: "http://leninsio.github.io/x/" }]}
      />,
    );

    expect(screen.queryByRole("link", { name: "Ver sitio" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Código" })).toBeInTheDocument();
  });

  it("no muestra PENDIENTE cuando no hay proyectos", () => {
    render(<ProjectsSection projects={[]} />);

    expect(screen.queryByText(/PENDIENTE/)).not.toBeInTheDocument();
  });
});
