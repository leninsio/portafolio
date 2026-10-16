import type { ReactElement } from "react";
import { AboutStats } from "@/components/AboutStats";
import { Reveal } from "@/components/Reveal";
import styles from "./AboutSection.module.css";
import {
  principles as defaultPrinciples,
  type Principle,
  type PrincipleIconId,
} from "@/data/principles";
import type { AboutStat } from "@/lib/stats";

type AboutSectionProps = {
  text: string;
  principles?: readonly Principle[];
  stats: readonly AboutStat[];
};

function BoltIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 2 4.5 13.5a.5.5 0 0 0 .4.8H11l-1 7.7 8.5-11.5a.5.5 0 0 0-.4-.8H12l1-7.7Z" />
    </svg>
  );
}

function AccessibilityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="4.5" r="2.2" />
      <path d="M4.5 8.5c2.4.9 4.9 1.3 7.5 1.3s5.1-.4 7.5-1.3" />
      <path d="M12 9.8V15" />
      <path d="M8.8 21 12 15l3.2 6" />
    </svg>
  );
}

function CursorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 3.5 19 11l-6.2 2.2L10 19.5 5 3.5Z" />
      <path d="m14.5 14.5 4 4" />
    </svg>
  );
}

const ICONS: Record<PrincipleIconId, () => ReactElement> = {
  bolt: BoltIcon,
  accessibility: AccessibilityIcon,
  cursor: CursorIcon,
};

const PRINCIPLE_TINTS: Record<string, string> = {
  fast: styles.fast,
  accessible: styles.accessible,
  easy: styles.easy,
};

export function AboutSection({
  text,
  principles = defaultPrinciples,
  stats,
}: AboutSectionProps) {
  return (
    <section className="section" id="sobre-mi" aria-labelledby="intro-title">
      <div className={styles.about}>
        <Reveal className={styles.main}>
          <h2 id="intro-title">Sobre mí</h2>
          <p className={styles.introText}>{text}</p>
          <AboutStats stats={stats} startIndex={2} />
        </Reveal>
        <Reveal className={styles.principles} startIndex={5}>
          {principles.map((principle) => {
            const Icon = ICONS[principle.icon];

            return (
              <article
                className={`${styles.principle} ${
                  PRINCIPLE_TINTS[principle.id] ?? ""
                }`}
                key={principle.id}
              >
                <span className={styles.principleIcon}>
                  <Icon />
                </span>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.principleText}>{principle.text}</p>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
