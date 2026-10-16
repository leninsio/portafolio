import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="footer">
      <p className="footer__text">
        © 2026 {profile.name} · Hecho con Next.js
      </p>
    </footer>
  );
}
