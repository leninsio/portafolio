"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  THEME_STORAGE_KEY,
  nextPreference,
  parsePreference,
  resolveTheme,
  type ResolvedTheme,
  type ThemePreference,
} from "@/lib/theme";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const ACTION_LABELS: Record<ThemePreference, string> = {
  system: "Cambiar a tema claro",
  light: "Cambiar a tema oscuro",
  dark: "Usar tema del sistema",
};

const THEME_COLORS: Record<ResolvedTheme, string> = {
  light: "#ffffff",
  dark: "#000000",
};

function systemPrefersDark(): boolean {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return false;
  }

  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

function readPreference(): ThemePreference {
  try {
    return parsePreference(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return "system";
  }
}

function persistPreference(preference: ThemePreference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Sin almacenamiento disponible: el cambio sigue activo en la sesión.
  }
}

function applyPreference(preference: ThemePreference) {
  const root = document.documentElement;

  if (preference === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", preference);
  }

  const meta = document.querySelector('meta[name="theme-color"]');

  if (meta) {
    meta.setAttribute(
      "content",
      THEME_COLORS[resolveTheme(preference, systemPrefersDark())],
    );
  }
}

function ThemeIcon({ preference }: { preference: ThemePreference }) {
  const common = {
    className: "theme-toggle__icon",
    viewBox: "0 0 24 24",
    width: 18,
    height: 18,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (preference === "light") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
      </svg>
    );
  }

  if (preference === "dark") {
    return (
      <svg {...common}>
        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useIsomorphicLayoutEffect(() => {
    const stored = readPreference();

    setPreference(stored);
    applyPreference(stored);
  }, []);

  const toggle = useCallback(() => {
    const next = nextPreference(preference);

    persistPreference(next);
    applyPreference(next);
    setPreference(next);
  }, [preference]);

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={ACTION_LABELS[preference]}
    >
      <ThemeIcon preference={preference} />
    </button>
  );
}
