import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home", () => {
  it("compone las secciones en el orden esperado", () => {
    render(<Home />);

    expect(
      screen.getAllByRole("heading").map((heading) => heading.textContent),
    ).toEqual([
      "Lenin Alvarado",
      "Intro",
      "Conocimientos técnicos",
      "Proyectos",
      "Contacto",
    ]);
  });

  it("tiene un único h1", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("anuncia los proyectos pendientes", () => {
    render(<Home />);

    expect(
      screen.getByText("PENDIENTE: agrega tus proyectos del curso"),
    ).toBeInTheDocument();
  });
});
