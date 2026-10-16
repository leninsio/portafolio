import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { skillGroups } from "@/data/skills";

describe("SkillsSection", () => {
  it("es una region accesible etiquetada por su titulo", () => {
    render(<SkillsSection groups={skillGroups} />);

    expect(
      screen.getByRole("region", { name: "Conocimientos técnicos" }),
    ).toBeInTheDocument();
  });

  it("renderiza los tres grupos con sus títulos", () => {
    render(<SkillsSection groups={skillGroups} />);

    expect(
      screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent),
    ).toEqual(["Frontend", "Backend", "Herramientas"]);
  });

  it("lista las tecnologías de cada grupo", () => {
    render(<SkillsSection groups={skillGroups} />);

    for (const group of skillGroups) {
      const list = screen.getByRole("list", { name: group.title });
      const items = within(list).getAllByRole("listitem");

      expect(items.map((item) => item.textContent)).toEqual(
        group.items.map((item) => item.name),
      );
    }
  });

  it("lista las 11 tecnologías en total", () => {
    render(<SkillsSection groups={skillGroups} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(11);
  });

  it("renderiza un icono decorativo junto a cada tecnología", () => {
    render(<SkillsSection groups={skillGroups} />);

    for (const item of screen.getAllByRole("listitem")) {
      const svg = item.querySelector("svg");

      expect(svg).not.toBeNull();
      expect(svg).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("envuelve cada grupo en una tarjeta bento", () => {
    render(<SkillsSection groups={skillGroups} />);

    const cards = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.closest(".skills__group"));

    expect(cards).toHaveLength(3);
    for (const card of cards) {
      expect(card).not.toBeNull();
    }
  });

  it("muestra el conteo de tecnologías de cada grupo", () => {
    render(<SkillsSection groups={skillGroups} />);

    expect(screen.getByText("6 tecnologías")).toBeInTheDocument();
    expect(screen.getByText("2 tecnologías")).toBeInTheDocument();
    expect(screen.getByText("3 tecnologías")).toBeInTheDocument();
  });

  it("muestra la frase introductoria de la sección", () => {
    render(<SkillsSection groups={skillGroups} />);

    expect(
      screen.getByText(
        "Las herramientas con las que construyo, de la interfaz al servidor.",
      ),
    ).toBeInTheDocument();
  });
});
