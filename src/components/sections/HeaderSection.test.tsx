import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeaderSection } from "@/components/sections/HeaderSection";
import { profile } from "@/data/profile";

describe("HeaderSection", () => {
  it("muestra el nombre como único h1", () => {
    render(<HeaderSection name={profile.name} role={profile.role} />);

    const headings = screen.getAllByRole("heading", { level: 1 });

    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Lenin Alvarado");
  });

  it("muestra la profesión", () => {
    render(<HeaderSection name={profile.name} role={profile.role} />);

    expect(screen.getByText("Desarrollador Full Stack")).toBeInTheDocument();
  });

  it("muestra el monograma", () => {
    render(<HeaderSection name={profile.name} role={profile.role} />);

    expect(screen.getByText("LA")).toBeInTheDocument();
  });

  it("enlaza a proyectos y a contacto", () => {
    render(<HeaderSection name={profile.name} role={profile.role} />);

    expect(screen.getByRole("link", { name: "Ver proyectos" })).toHaveAttribute(
      "href",
      "#proyectos",
    );
    expect(screen.getByRole("link", { name: "Contáctame" })).toHaveAttribute(
      "href",
      "#contacto",
    );
  });
});
