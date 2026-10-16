export type ContactLink = {
  label: string;
  text: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  intro: string;
  contactLinks: ContactLink[];
};

export const profile: Profile = {
  name: "Lenin Alvarado",
  role: "Desarrollador Full Stack",
  intro: "PENDIENTE",
  contactLinks: [
    { label: "Correo", text: "PENDIENTE", href: "#contacto" },
    { label: "LinkedIn", text: "PENDIENTE", href: "#contacto" },
    { label: "GitHub", text: "PENDIENTE", href: "#contacto" },
  ],
};
