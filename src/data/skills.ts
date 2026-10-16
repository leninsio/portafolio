export type SkillGroup = {
  title: string;
  items: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "SQL"],
  },
  {
    title: "Herramientas",
    items: ["Git", "GitHub", "pnpm"],
  },
];
