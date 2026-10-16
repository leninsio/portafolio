export type TechIconId =
  | "html"
  | "css"
  | "javascript"
  | "react"
  | "nextjs"
  | "tailwind"
  | "nodejs"
  | "sql"
  | "git"
  | "github"
  | "pnpm";

export type Skill = {
  name: string;
  icon: TechIconId;
};

export type SkillGroup = {
  title: string;
  items: readonly Skill[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "SQL", icon: "sql" },
    ],
  },
  {
    title: "Herramientas",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "pnpm", icon: "pnpm" },
    ],
  },
];
