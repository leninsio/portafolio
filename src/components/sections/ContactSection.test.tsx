import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactSection } from "@/components/sections/ContactSection";
import { profile } from "@/data/profile";

function stubClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ContactSection", () => {
  it("es una region accesible etiquetada por su titulo", () => {
    render(<ContactSection links={profile.contactLinks} />);

    expect(
      screen.getByRole("region", { name: "Hablemos." }),
    ).toBeInTheDocument();
  });

  it("renderiza Correo, LinkedIn y GitHub en orden con sus href exactos", () => {
    render(<ContactSection links={profile.contactLinks} />);

    const channels = within(
      screen.getByRole("list", { name: "Canales de contacto" }),
    ).getAllByRole("link");

    expect(channels.map((link) => link.getAttribute("href"))).toEqual([
      "mailto:leninalvarado4to@gmail.com",
      "https://www.linkedin.com/in/lenin-alvarado-dev",
      "https://github.com/leninsio",
    ]);
    expect(within(channels[0]).getByText("Correo")).toBeInTheDocument();
    expect(within(channels[1]).getByText("LinkedIn")).toBeInTheDocument();
    expect(within(channels[2]).getByText("GitHub")).toBeInTheDocument();
  });

  it("muestra el correo real y el LinkedIn provisional como valores", () => {
    render(<ContactSection links={profile.contactLinks} />);

    expect(screen.getByText("leninalvarado4to@gmail.com")).toBeInTheDocument();
    expect(
      screen.getByText("linkedin.com/in/lenin-alvarado-dev"),
    ).toBeInTheDocument();
  });

  it("abre los enlaces externos en una pestaña nueva de forma segura", () => {
    render(<ContactSection links={profile.contactLinks} />);

    for (const label of ["LinkedIn", "GitHub"]) {
      const link = screen.getByRole("link", { name: new RegExp(label) });

      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("el botón principal Escríbeme apunta al mailto real", () => {
    render(<ContactSection links={profile.contactLinks} />);

    expect(screen.getByRole("link", { name: "Escríbeme" })).toHaveAttribute(
      "href",
      "mailto:leninalvarado4to@gmail.com",
    );
  });

  it("copiar correo escribe en el portapapeles y muestra Copiado", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);

    render(<ContactSection links={profile.contactLinks} />);

    fireEvent.click(screen.getByRole("button", { name: "Copiar correo" }));

    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith("leninalvarado4to@gmail.com"),
    );
    await waitFor(() =>
      expect(screen.getByText("Copiado")).toBeInTheDocument(),
    );
  });

  it("anuncia la confirmación con aria-live", async () => {
    stubClipboard(vi.fn().mockResolvedValue(undefined));

    render(<ContactSection links={profile.contactLinks} />);

    fireEvent.click(screen.getByRole("button", { name: "Copiar correo" }));

    const status = await screen.findByText("Copiado");

    expect(status.closest('[aria-live="polite"]')).not.toBeNull();
  });

  it("no lanza error si el portapapeles rechaza", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("no permitido"));
    stubClipboard(writeText);

    render(<ContactSection links={profile.contactLinks} />);

    fireEvent.click(screen.getByRole("button", { name: "Copiar correo" }));

    await waitFor(() => expect(writeText).toHaveBeenCalled());

    expect(screen.queryByText("Copiado")).not.toBeInTheDocument();
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
