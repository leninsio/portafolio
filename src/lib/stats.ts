import type { Project } from "@/data/projects";
import type { SkillGroup } from "@/data/skills";

export type AboutStatId = "projects" | "technologies" | "areas";

export type AboutStat = {
  id: AboutStatId;
  value: number;
  label: string;
};

function joinWithY(items: readonly string[]): string {
  if (items.length <= 1) {
    return items.join("");
  }

  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

export function buildAboutStats(
  projects: readonly Project[],
  skillGroups: readonly SkillGroup[],
): AboutStat[] {
  const technologies = skillGroups.reduce(
    (total, group) => total + group.items.length,
    0,
  );
  const areas = joinWithY(skillGroups.map((group) => group.title.toLowerCase()));

  return [
    { id: "projects", value: projects.length, label: "proyectos publicados" },
    { id: "technologies", value: technologies, label: "tecnologías" },
    { id: "areas", value: skillGroups.length, label: `áreas: ${areas}` },
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
