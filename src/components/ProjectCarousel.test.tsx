import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { projects } from "@/data/projects";

describe("ProjectCarousel", () => {
  it("es una region de tipo carrusel etiquetada Proyectos", () => {
    render(<ProjectCarousel projects={projects} />);

    const region = screen.getByRole("region", { name: "Proyectos" });

    expect(region).toHaveAttribute("aria-roledescription", "carrusel");
  });

  it("renderiza los 6 slides con sus etiquetas N de 6", () => {
    render(<ProjectCarousel projects={projects} />);

    const slides = screen.getAllByRole("group");

    expect(slides).toHaveLength(6);
    expect(slides.map((slide) => slide.getAttribute("aria-label"))).toEqual([
      "1 de 6",
      "2 de 6",
      "3 de 6",
      "4 de 6",
      "5 de 6",
      "6 de 6",
    ]);
    expect(
      slides.map((slide) => slide.getAttribute("aria-roledescription")),
    ).toEqual(Array(6).fill("slide"));
  });

  it("deshabilita Anterior al inicio y deja Siguiente disponible", () => {
    render(<ProjectCarousel projects={projects} />);

    expect(screen.getByRole("button", { name: "Anterior" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Siguiente" })).toBeEnabled();
  });

  it("marca el punto 2 como activo al pulsar Siguiente", () => {
    render(<ProjectCarousel projects={projects} />);

    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));

    expect(
      screen.getByRole("button", { name: "Ir al proyecto 2" }),
    ).toHaveAttribute("aria-current", "true");
    expect(
      screen.getByRole("button", { name: "Ir al proyecto 1" }),
    ).not.toHaveAttribute("aria-current");
  });

  it("deshabilita Siguiente en el último slide", () => {
    render(<ProjectCarousel projects={projects} />);

    const next = screen.getByRole("button", { name: "Siguiente" });

    for (let step = 0; step < 5; step += 1) {
      fireEvent.click(next);
    }

    expect(next).toBeDisabled();
  });

  it("avanza con ArrowRight desde el foco del carrusel", () => {
    render(<ProjectCarousel projects={projects} />);

    fireEvent.keyDown(screen.getByRole("region", { name: "Proyectos" }), {
      key: "ArrowRight",
    });

    expect(
      screen.getByRole("button", { name: "Ir al proyecto 2" }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("activa el slide correspondiente al pulsar un punto", () => {
    render(<ProjectCarousel projects={projects} />);

    fireEvent.click(screen.getByRole("button", { name: "Ir al proyecto 4" }));

    expect(
      screen.getByRole("button", { name: "Ir al proyecto 4" }),
    ).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("button", { name: "Anterior" })).toBeEnabled();
  });
});
