import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RotatingWords } from "@/components/RotatingWords";

const PREFIX = "Productos web";
const WORDS = ["rápidos", "accesibles", "fáciles de usar"];
const LABEL = "Productos web rápidos, accesibles y fáciles de usar.";

function renderRotating() {
  return render(<RotatingWords prefix={PREFIX} words={WORDS} label={LABEL} />);
}

function displayed(container: HTMLElement) {
  return container.querySelector(
    '[data-slot="rotating-word"][data-active="true"]',
  )?.textContent;
}

function advance(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

function stubReducedMotion(matches: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query.includes("prefers-reduced-motion") ? matches : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("RotatingWords", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("muestra la primera palabra al inicio", () => {
    const { container } = renderRotating();

    expect(displayed(container)).toBe("rápidos");
  });

  it("alterna cada 2,6 s y vuelve a la primera palabra", () => {
    const { container } = renderRotating();

    advance(2600);
    expect(displayed(container)).toBe("accesibles");

    advance(2600);
    expect(displayed(container)).toBe("fáciles de usar");

    advance(2600);
    expect(displayed(container)).toBe("rápidos");
  });

  it("expone el texto accesible completo", () => {
    renderRotating();

    expect(screen.getByText(LABEL)).toBeInTheDocument();
  });

  it("oculta a lectores de pantalla la parte animada", () => {
    const { container } = renderRotating();

    expect(
      container.querySelector('[data-slot="rotating-label"]'),
    ).toHaveAttribute("aria-hidden", "true");
    expect(
      container.querySelector('[data-slot="rotating-viewport"]'),
    ).toHaveAttribute("aria-hidden", "true");
  });

  it("pausa la rotación cuando la pestaña no está visible", () => {
    const { container } = renderRotating();
    const visibility = vi.spyOn(document, "visibilityState", "get");

    visibility.mockReturnValue("hidden");
    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    advance(2600 * 2);
    expect(displayed(container)).toBe("rápidos");

    visibility.mockReturnValue("visible");
    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    advance(2600);
    expect(displayed(container)).toBe("accesibles");

    visibility.mockRestore();
  });

  it("limpia el intervalo al desmontar", () => {
    const setSpy = vi.spyOn(globalThis, "setInterval");
    const clearSpy = vi.spyOn(globalThis, "clearInterval");

    const { unmount } = renderRotating();

    expect(setSpy).toHaveBeenCalledTimes(1);

    unmount();

    expect(clearSpy).toHaveBeenCalledWith(setSpy.mock.results[0]?.value);
  });

  it("no rota con prefers-reduced-motion: reduce", () => {
    stubReducedMotion(true);

    const { container } = renderRotating();

    advance(2600 * 3);
    expect(displayed(container)).toBe("rápidos");
  });
});
