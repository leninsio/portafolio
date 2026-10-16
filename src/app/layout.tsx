import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lenin Alvarado · Desarrollador Full Stack",
  description:
    "Portafolio de Lenin Alvarado, desarrollador Full Stack: proyectos del curso, conocimientos técnicos y formas de contacto.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
