import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Reveal>
        <p className={styles.text}>© 2026 {profile.name} · Hecho con Next.js</p>
      </Reveal>
    </footer>
  );
}
