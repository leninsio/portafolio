import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { skills } from "@/data/skills";

describe("SkillsSection", () => {
  it("es una region accesible etiquetada por su titulo", () => {
    render(<SkillsSection skills={skills} />);

    expect(
      screen.getByRole("region", { name: "Conocimientos técnicos" }),
    ).toBeInTheDocument();
  });

  it("muestra los 8 conocimientos técnicos", () => {
    render(<SkillsSection skills={skills} />);

    const list = screen.getByRole("list", { name: "Conocimientos técnicos" });
    const items = within(list).getAllByRole("listitem");

    expect(items).toHaveLength(8);
    expect(items.map((item) => item.textContent)).toEqual([
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "Node",
      "Git",
      "SQL",
    ]);
  });
});
