import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Reveal } from "@/components/Reveal";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Reveal", () => {
  it("renderiza su contenido aunque IntersectionObserver no exista", () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    const { container } = render(
      <Reveal>
        <p>Contenido revelado</p>
      </Reveal>,
    );

    expect(screen.getByText("Contenido revelado")).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass("is-visible");
  });

  it("envuelve el contenido en un contenedor marcado para animar", () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    const { container } = render(
      <Reveal>
        <p>Contenido revelado</p>
      </Reveal>,
    );

    expect(container.firstElementChild).toHaveClass("reveal");
  });

  it("asigna un --stagger-index correlativo a cada hijo", () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    const { container } = render(
      <Reveal>
        <p>Uno</p>
        <span>Dos</span>
        <div>Tres</div>
      </Reveal>,
    );

    const children = Array.from(
      (container.firstElementChild as HTMLElement).children,
    ) as HTMLElement[];

    expect(
      children.map((child) => child.style.getPropertyValue("--stagger-index")),
    ).toEqual(["0", "1", "2"]);
  });

  it("respeta el desfase inicial indicado", () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    const { container } = render(
      <Reveal startIndex={4}>
        <p>Uno</p>
        <p>Dos</p>
      </Reveal>,
    );

    const children = Array.from(
      (container.firstElementChild as HTMLElement).children,
    ) as HTMLElement[];

    expect(
      children.map((child) => child.style.getPropertyValue("--stagger-index")),
    ).toEqual(["4", "5"]);
  });
});
