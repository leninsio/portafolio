import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSection } from "@/components/sections/ContactSection";
import { profile } from "@/data/profile";

describe("ContactSection", () => {
  it("es una region accesible etiquetada por su titulo", () => {
    render(<ContactSection links={profile.contactLinks} />);

    expect(screen.getByRole("region", { name: "Contacto" })).toBeInTheDocument();
  });

  it("muestra los tres enlaces con texto PENDIENTE", () => {
    render(<ContactSection links={profile.contactLinks} />);

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(3);
    expect(links.map((link) => link.textContent)).toEqual([
      "PENDIENTE",
      "PENDIENTE",
      "PENDIENTE",
    ]);
  });

  it("nombra los canales de contacto", () => {
    render(<ContactSection links={profile.contactLinks} />);

    expect(screen.getByText(/Correo/)).toBeInTheDocument();
    expect(screen.getByText(/LinkedIn/)).toBeInTheDocument();
    expect(screen.getByText(/GitHub/)).toBeInTheDocument();
  });

  it("no usa href vacíos", () => {
    render(<ContactSection links={profile.contactLinks} />);

    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).toBeTruthy();
    }
  });
});
