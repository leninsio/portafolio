import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeaderSection } from "@/components/sections/HeaderSection";
import { profile } from "@/data/profile";

function renderHeader() {
  return render(
    <HeaderSection
      name={profile.name}
      role={profile.role}
      tagline={profile.tagline}
    />,
  );
}

describe("HeaderSection", () => {
  it("muestra el nombre como único h1", () => {
    renderHeader();

    const headings = screen.getAllByRole("heading", { level: 1 });

    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Lenin Alvarado");
  });

  it("muestra la profesión", () => {
    renderHeader();

    expect(screen.getByText("Desarrollador Full Stack")).toBeInTheDocument();
  });

  it("muestra la frase corta derivada de la intro", () => {
    renderHeader();

    expect(screen.getByText(profile.tagline)).toBeInTheDocument();
    expect(profile.intro.toLowerCase()).toContain(profile.tagline.toLowerCase());
  });

  it("ya no renderiza el monograma LA", () => {
    renderHeader();

    expect(screen.queryByText("LA", { exact: true })).not.toBeInTheDocument();
  });

  it("enlaza a proyectos y a contacto", () => {
    renderHeader();

    expect(screen.getByRole("link", { name: "Ver proyectos" })).toHaveAttribute(
      "href",
      "#proyectos",
    );
    expect(screen.getByRole("link", { name: "Contáctame" })).toHaveAttribute(
      "href",
      "#contacto",
    );
  });

  it("muestra la etiqueta de categoría Portafolio", () => {
    renderHeader();

    expect(screen.getByText("Portafolio")).toBeInTheDocument();
  });

  it("incluye un indicador de scroll hacia la sección Sobre mí", () => {
    renderHeader();

    expect(screen.getByRole("link", { name: "Ir a Sobre mí" })).toHaveAttribute(
      "href",
      "#sobre-mi",
    );
  });

  it("oculta la imagen de fondo a los lectores de pantalla", () => {
    const { container } = renderHeader();

    const backdrop = container.querySelector(".hero__backdrop");

    expect(backdrop).not.toBeNull();
    expect(backdrop).toHaveAttribute("aria-hidden", "true");
    expect(
      within(screen.getByRole("banner")).queryByRole("img"),
    ).not.toBeInTheDocument();
  });
});
