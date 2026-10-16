import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lenin Alvarado | Desarrollador Full Stack",
  description:
    "Portafolio de Lenin Alvarado, desarrollador Full Stack: conocimientos técnicos, proyectos del curso y contacto.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
