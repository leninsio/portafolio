"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  THEME_STORAGE_KEY,
  parsePreference,
  resolveTheme,
  toggleTheme,
  type Theme,
} from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const ACTION_LABELS: Record<Theme, string> = {
  light: "Cambiar a tema oscuro",
  dark: "Cambiar a tema claro",
};

const THEME_COLORS: Record<Theme, string> = {
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

function readPreference(): Theme | null {
  try {
    return parsePreference(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return null;
  }
}

function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Sin almacenamiento disponible: el cambio sigue activo en la sesión.
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const meta = document.querySelector('meta[name="theme-color"]');

  if (meta) {
    meta.setAttribute("content", THEME_COLORS[theme]);
  }
}

function ThemeIcon({ theme }: { theme: Theme }) {
  const common = {
    className: styles.icon,
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

  if (theme === "dark") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useIsomorphicLayoutEffect(() => {
    const stored = readPreference();
    const initial = resolveTheme(stored, systemPrefersDark());

    applyTheme(initial);
    setTheme(initial);

    // Mientras no haya una elección manual, la página sigue al sistema.
    if (stored !== null || typeof window.matchMedia !== "function") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const next = resolveTheme(null, media.matches);

      applyTheme(next);
      setTheme(next);
    };

    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = toggleTheme(theme);

    persistTheme(next);
    applyTheme(next);
    setTheme(next);
  }, [theme]);

  return (
    <button
      className={styles.toggle}
      type="button"
      onClick={toggle}
      aria-label={ACTION_LABELS[theme]}
    >
      <ThemeIcon theme={theme} />
    </button>
  );
}
