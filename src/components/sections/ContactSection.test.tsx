import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSection } from "@/components/sections/ContactSection";
import { profile } from "@/data/profile";

describe("ContactSection", () => {
  it("es una region accesible etiquetada por su titulo", () => {
    render(<ContactSection links={profile.contactLinks} />);

    expect(
      screen.getByRole("region", { name: "Hablemos." }),
    ).toBeInTheDocument();
  });

  it("renderiza Correo con mailto y luego GitHub, sin LinkedIn", () => {
    render(<ContactSection links={profile.contactLinks} />);

    const links = screen.getAllByRole("link");

    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "mailto:leninalvarado4to@gmail.com",
      "https://github.com/leninsio",
    ]);
    expect(within(links[0]).getByText("Correo")).toBeInTheDocument();
    expect(within(links[1]).getByText("GitHub")).toBeInTheDocument();
    expect(screen.queryByText("LinkedIn")).not.toBeInTheDocument();
  });

  it("enlaza el correo con mailto:leninalvarado4to@gmail.com", () => {
    render(<ContactSection links={profile.contactLinks} />);

    expect(screen.getByRole("link", { name: /Correo/ })).toHaveAttribute(
      "href",
      "mailto:leninalvarado4to@gmail.com",
    );
  });

  it("abre GitHub en una pestaña nueva de forma segura", () => {
    render(<ContactSection links={profile.contactLinks} />);

    const github = screen.getByRole("link", { name: /GitHub/ });

    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
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
    expect(screen.getByRole("link", { name: /GitHub/ })).toBeInTheDocument();
  });

  it("no usa href vacíos", () => {
    render(<ContactSection links={profile.contactLinks} />);

    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).toBeTruthy();
    }
  });
});
