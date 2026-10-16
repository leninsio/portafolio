import {
  siCss,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPnpm,
  siReact,
  siTailwindcss,
} from "simple-icons";
import type { TechIconId } from "@/data/skills";

type BrandIcon = {
  path: string;
  hex: string;
};

const BRAND_ICONS: Record<Exclude<TechIconId, "sql">, BrandIcon> = {
  html: siHtml5,
  css: siCss,
  javascript: siJavascript,
  react: siReact,
  nextjs: siNextdotjs,
  tailwind: siTailwindcss,
  nodejs: siNodedotjs,
  git: siGit,
  github: siGithub,
  pnpm: siPnpm,
};

// Black / near-black brand marks disappear on the dark theme, so they follow
// the surrounding text color instead of their brand hex.
const CURRENT_COLOR_IDS = new Set<TechIconId>(["nextjs", "github"]);

function DatabaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
    </svg>
  );
}

export function TechIcon({ id }: { id: TechIconId }) {
  if (id === "sql") {
    return <DatabaseIcon />;
  }

  const icon = BRAND_ICONS[id];
  const fill = CURRENT_COLOR_IDS.has(id) ? "currentColor" : `#${icon.hex}`;

  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill={fill} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}
