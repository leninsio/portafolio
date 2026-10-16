import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

describe("ProjectsSection", () => {
  it("es una region accesible etiquetada por su titulo", () => {
    render(<ProjectsSection projects={[]} />);

    expect(screen.getByRole("region", { name: "Proyectos" })).toBeInTheDocument();
  });

  it("muestra el mensaje PENDIENTE cuando no hay proyectos", () => {
    render(<ProjectsSection projects={[]} />);

    expect(
      screen.getByText("PENDIENTE: agrega tus proyectos del curso"),
    ).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("muestra cada proyecto con su enlace a GitHub Pages", () => {
    render(
      <ProjectsSection
        projects={[
          {
            name: "Proyecto 1",
            description: "Descripción del proyecto",
            image: "/proyecto-1.png",
            pagesUrl: "https://leninsio.github.io/proyecto-1/",
          },
        ]}
      />,
    );

    expect(screen.getByRole("heading", { name: "Proyecto 1" })).toBeInTheDocument();
    expect(screen.getByText("Descripción del proyecto")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Proyecto 1" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Proyecto 1/ }),
    ).toHaveAttribute("href", "https://leninsio.github.io/proyecto-1/");
  });

  it("no crea enlace cuando la pagesUrl no es válida", () => {
    render(
      <ProjectsSection
        projects={[
          {
            name: "Proyecto 2",
            description: "Descripción del proyecto",
            image: "/proyecto-2.png",
            pagesUrl: "http://leninsio.github.io/proyecto-2/",
          },
        ]}
      />,
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
