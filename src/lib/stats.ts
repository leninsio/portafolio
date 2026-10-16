import type { Project } from "@/data/projects";
import type { SkillGroup } from "@/data/skills";

export type AboutStatId = "projects" | "technologies" | "areas";

export type AboutStat = {
  id: AboutStatId;
  value: number;
  label: string;
  detail: string;
};

export function buildAboutStats(
  projects: readonly Project[],
  skillGroups: readonly SkillGroup[],
): AboutStat[] {
  const technologies = skillGroups.reduce(
    (total, group) => total + group.items.length,
    0,
  );
  const areas = skillGroups.map((group) => group.title).join(" · ");

  return [
    {
      id: "projects",
      value: projects.length,
      label: "Proyectos",
      detail: "publicados en GitHub Pages",
    },
    {
      id: "technologies",
      value: technologies,
      label: "Tecnologías",
      detail: "de la interfaz al servidor",
    },
    { id: "areas", value: skillGroups.length, label: "Áreas", detail: areas },
  ];
}

export function counterValue(
  target: number,
  elapsedMs: number,
  durationMs: number,
): number {
  if (durationMs <= 0 || elapsedMs >= durationMs) {
    return target;
  }

  if (elapsedMs <= 0) {
    return 0;
  }

  const progress = elapsedMs / durationMs;
  const eased =
    progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

  return Math.round(eased * target);
}
