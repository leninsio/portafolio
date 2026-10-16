import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutSection } from "@/components/sections/AboutSection";
import { principles } from "@/data/principles";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { buildAboutStats } from "@/lib/stats";

function renderAbout() {
  return render(
    <AboutSection
      text={profile.intro}
      principles={principles}
      stats={buildAboutStats(projects, skillGroups)}
    />,
  );
}

describe("AboutSection", () => {
  it("es una region accesible etiquetada como Sobre mí", () => {
    renderAbout();

    expect(screen.getByRole("region", { name: "Sobre mí" })).toBeInTheDocument();
  });

  it("muestra el párrafo actual de la intro", () => {
    renderAbout();

    const region = screen.getByRole("region", { name: "Sobre mí" });

    expect(region).toHaveTextContent(
      /convertir ideas en productos web rápidos, accesibles y fáciles de usar/i,
    );
    expect(screen.queryByText(/PENDIENTE/)).not.toBeInTheDocument();
  });

  it("muestra las tres tarjetas de principios con títulos exactos", () => {
    renderAbout();

    expect(
      screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent),
    ).toEqual(["Rápido", "Accesible", "Fácil de usar"]);
  });

  it("muestra las tres cifras con su valor final accesible", () => {
    renderAbout();

    expect(
      screen.getByText("6 Proyectos: publicados en GitHub Pages"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("11 Tecnologías: de la interfaz al servidor"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("3 Áreas: Frontend · Backend · Herramientas"),
    ).toBeInTheDocument();
  });

  it("etiqueta cada cifra con un nivel principal y otro secundario", () => {
    renderAbout();

    expect(screen.getByText("Proyectos")).toBeInTheDocument();
    expect(screen.getByText("publicados en GitHub Pages")).toBeInTheDocument();
    expect(screen.getByText("Tecnologías")).toBeInTheDocument();
    expect(screen.getByText("de la interfaz al servidor")).toBeInTheDocument();
    expect(screen.getByText("Áreas")).toBeInTheDocument();
    expect(
      screen.getByText("Frontend · Backend · Herramientas"),
    ).toBeInTheDocument();
  });
});
