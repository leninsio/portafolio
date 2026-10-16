import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lenin Alvarado · Desarrollador Full Stack",
  description:
    "Portafolio de Lenin Alvarado, desarrollador Full Stack: proyectos del curso, conocimientos técnicos y formas de contacto.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
