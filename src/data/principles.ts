export type PrincipleIconId = "bolt" | "accessibility" | "cursor";

export type Principle = {
  id: string;
  title: string;
  text: string;
  icon: PrincipleIconId;
};

export const principles: readonly Principle[] = [
  {
    id: "fast",
    title: "Rápido",
    text: "Sitios ligeros que cargan y responden sin esperas.",
    icon: "bolt",
  },
  {
    id: "accessible",
    title: "Accesible",
    text: "Interfaces que cualquiera puede usar, con teclado o lector de pantalla.",
    icon: "accessibility",
  },
  {
    id: "easy",
    title: "Fácil de usar",
    text: "Flujos claros y diseño cuidado en escritorio y celular.",
    icon: "cursor",
  },
];
