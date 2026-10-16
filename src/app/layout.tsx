import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const themeScript = `(function(){try{var p=localStorage.getItem("theme");if(p==="light"||p==="dark"){document.documentElement.setAttribute("data-theme",p)}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
