import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "@/components/ThemeToggle";

function resetTheme() {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
}

describe("ThemeToggle", () => {
  beforeEach(resetTheme);

  afterEach(() => {
    vi.restoreAllMocks();
    resetTheme();
  });

  it("recorre el ciclo sistema → claro → oscuro → sistema al hacer clic", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");

    expect(document.documentElement.dataset.theme).toBeUndefined();

    fireEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe("light");

    fireEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe("dark");

    fireEvent.click(button);
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });

  it("guarda la preferencia en localStorage en cada paso", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(localStorage.getItem("theme")).toBe("light");

    fireEvent.click(button);
    expect(localStorage.getItem("theme")).toBe("dark");

    fireEvent.click(button);
    expect(localStorage.getItem("theme")).toBe("system");
  });

  it("actualiza el aria-label según la acción disponible", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("aria-label", "Cambiar a tema claro");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-label", "Cambiar a tema oscuro");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-label", "Usar tema del sistema");
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
