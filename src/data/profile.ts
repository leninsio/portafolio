export type ContactLink = {
  label: string;
  value?: string;
  href?: string;
};

export type Profile = {
  name: string;
  role: string;
  intro: string;
  contactLinks: readonly ContactLink[];
};

export const profile: Profile = {
  name: "Lenin Alvarado",
  role: "Desarrollador Full Stack",
  intro:
    "Soy Lenin Alvarado, desarrollador full stack. Me motiva convertir ideas en productos web rápidos, accesibles y fáciles de usar. Disfruto construir desde interfaces cuidadas hasta aplicaciones con datos reales: tiendas en línea, paneles de control y herramientas para negocios.",
  contactLinks: [
    {
      label: "Correo",
      value: "leninalvarado4to@gmail.com",
      href: "mailto:leninalvarado4to@gmail.com",
    },
    { label: "LinkedIn" },
    {
      label: "GitHub",
      value: "github.com/leninsio",
      href: "https://github.com/leninsio",
    },
  ],
};
