import { render, screen, within } from "@testing-library/react";
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
    ).toEqual([
      "Sobre mí",
      "Conocimientos técnicos",
      "Proyectos",
      "Hablemos.",
    ]);
    expect(
      Array.from(container.querySelectorAll("header[id], section[id]")).map(
        (section) => section.id,
      ),
    ).toEqual([
      "inicio",
      "sobre-mi",
      "conocimientos",
      "proyectos",
      "contacto",
    ]);
  });

  it("tiene un único h1", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("navega a cada sección desde la barra principal", () => {
    render(<Home />);

    const nav = screen.getByRole("navigation", { name: "Principal" });

    expect(
      within(nav)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual([
      "#inicio",
      "#sobre-mi",
      "#conocimientos",
      "#proyectos",
      "#contacto",
    ]);
  });

  it("muestra los 6 proyectos del curso", () => {
    render(<Home />);

    for (const project of projects) {
      expect(
        screen.getByRole("heading", { level: 3, name: project.name }),
      ).toBeInTheDocument();
    }
  });

  it("expone el correo de contacto con mailto", () => {
    const { container } = render(<Home />);

    expect(
      container.querySelector('a[href="mailto:leninalvarado4to@gmail.com"]'),
    ).not.toBeNull();
  });

  it("no muestra el texto PENDIENTE", () => {
    render(<Home />);

    expect(screen.queryByText(/PENDIENTE/i)).not.toBeInTheDocument();
  });
});
