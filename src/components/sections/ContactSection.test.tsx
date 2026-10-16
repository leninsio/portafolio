import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSection } from "@/components/sections/ContactSection";
import { profile } from "@/data/profile";

describe("ContactSection", () => {
  it("es una region accesible etiquetada por su titulo", () => {
    render(<ContactSection links={profile.contactLinks} />);

    expect(screen.getByRole("region", { name: "Contacto" })).toBeInTheDocument();
  });

  it("muestra la frase de cierre", () => {
    render(<ContactSection links={profile.contactLinks} />);

    expect(
      screen.getByText("¿Tienes un proyecto en mente? Hablemos."),
    ).toBeInTheDocument();
  });

  it("renderiza solo los medios que tienen dato", () => {
    render(<ContactSection links={profile.contactLinks} />);

    const links = screen.getAllByRole("link");

    expect(links.map((link) => link.textContent)).toEqual(["GitHub"]);
    expect(links[0]).toHaveAttribute("href", "https://github.com/leninsio");
    expect(links[0]).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("no muestra el texto PENDIENTE", () => {
    render(<ContactSection links={profile.contactLinks} />);

    expect(screen.queryByText(/PENDIENTE/)).not.toBeInTheDocument();
  });

  it("ignora los medios sin enlace", () => {
    render(
      <ContactSection
        links={[
          { label: "Correo" },
          { label: "GitHub", href: "https://github.com/leninsio" },
        ]}
      />,
    );

    expect(screen.queryByText("Correo")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
  });

  it("no usa href vacíos", () => {
    render(<ContactSection links={profile.contactLinks} />);

    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).toBeTruthy();
    }
  });
});
