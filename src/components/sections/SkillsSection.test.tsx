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

      expect(items.map((item) => item.textContent)).toEqual([...group.items]);
    }
  });
});
