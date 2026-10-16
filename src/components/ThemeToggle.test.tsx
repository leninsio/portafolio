import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "@/components/ThemeToggle";

function mockSystemTheme(prefersDark: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query.includes("dark") ? prefersDark : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

function resetTheme() {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    resetTheme();
    mockSystemTheme(true);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    resetTheme();
  });

  it("sin preferencia guardada y sistema oscuro ofrece cambiar a claro", () => {
    render(<ThemeToggle />);

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Cambiar a tema claro",
    );
  });

  it("al primer clic aplica y guarda claro y ofrece volver a oscuro", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
    expect(button).toHaveAttribute("aria-label", "Cambiar a tema oscuro");
  });

  it("un segundo clic vuelve a oscuro y lo guarda", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");

    fireEvent.click(button);
    fireEvent.click(button);

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(button).toHaveAttribute("aria-label", "Cambiar a tema claro");
  });

  it("nunca ofrece la opción de sistema", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");

    expect(button.getAttribute("aria-label")).not.toMatch(/sistema/i);

    fireEvent.click(button);
    expect(button.getAttribute("aria-label")).not.toMatch(/sistema/i);

    fireEvent.click(button);
    expect(button.getAttribute("aria-label")).not.toMatch(/sistema/i);
  });

  it("aplica el cambio aunque localStorage.setItem falle", () => {
    render(<ThemeToggle />);

    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("cuota agotada");
    });

    expect(() => fireEvent.click(screen.getByRole("button"))).not.toThrow();
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
