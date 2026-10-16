import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { projects } from "@/data/projects";

describe("Home", () => {
  it("compone las secciones en el orden esperado", () => {
    const { container } = render(<Home />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Lenin Alvarado",
    );
    expect(
      screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent),
    ).toEqual(["Sobre mí", "Conocimientos técnicos", "Proyectos", "Contacto"]);
    expect(
      Array.from(container.querySelectorAll("section[id]")).map(
        (section) => section.id,
      ),
    ).toEqual(["sobre-mi", "conocimientos", "proyectos", "contacto"]);
  });

  it("tiene un único h1", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("muestra los 6 proyectos del curso", () => {
    render(<Home />);

    for (const project of projects) {
      expect(
        screen.getByRole("heading", { level: 3, name: project.name }),
      ).toBeInTheDocument();
    }
  });

  it("no muestra el texto PENDIENTE", () => {
    render(<Home />);

    expect(screen.queryByText(/PENDIENTE/i)).not.toBeInTheDocument();
  });
});
