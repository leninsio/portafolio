import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="footer">
      <Reveal>
        <p className="footer__text">© 2026 {profile.name} · Hecho con Next.js</p>
      </Reveal>
    </footer>
  );
}
