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
});
