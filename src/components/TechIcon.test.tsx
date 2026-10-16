import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TechIcon } from "@/components/TechIcon";

describe("TechIcon", () => {
  it("renderiza un svg decorativo con un path no vacío para un id conocido", () => {
    const { container } = render(<TechIcon id="react" />);

    const svg = container.querySelector("svg");

    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg?.querySelector("path")?.getAttribute("d")).toBeTruthy();
  });

  it("usa un icono genérico propio (cilindro) para SQL", () => {
    const { container: sql } = render(<TechIcon id="sql" />);
    const { container: react } = render(<TechIcon id="react" />);

    const sqlPath = sql.querySelector("path")?.getAttribute("d");
    const reactPath = react.querySelector("path")?.getAttribute("d");

    expect(sql.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(sqlPath).toBeTruthy();
    expect(sqlPath).not.toBe(reactPath);
  });
});
