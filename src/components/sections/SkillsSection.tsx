import type { CSSProperties } from "react";
import { CodeWindow } from "@/components/CodeWindow";
import { Reveal } from "@/components/Reveal";
import { TechIcon } from "@/components/TechIcon";
import type { SkillGroup } from "@/data/skills";
import styles from "./SkillsSection.module.css";

type SkillsSectionProps = {
  groups: readonly SkillGroup[];
};

const GROUP_STYLES = ["frontend", "backend", "tools"] as const;

const GROUP_TINTS: Record<string, string> = {
  frontend: styles.frontend,
  backend: styles.backend,
  tools: styles.tools,
};

function CodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 1.8 1.8 6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-.4-.4-2.1 2.5-2.5Z" />
    </svg>
  );
}

const ICONS = [CodeIcon, ServerIcon, ToolsIcon] as const;

export function SkillsSection({ groups }: SkillsSectionProps) {
  return (
    <section className="section" id="conocimientos" aria-labelledby="skills-title">
      <Reveal>
        <h2 id="skills-title">Conocimientos técnicos</h2>
        <p className="section__intro">
          Las herramientas con las que construyo, de la interfaz al servidor.
        </p>
      </Reveal>
      <Reveal className={styles.skills} startIndex={2}>
        {groups.map((group, index) => {
          const titleId = `skills-group-${index}`;
          const style = GROUP_STYLES[index] ?? "frontend";
          const Icon = ICONS[index] ?? CodeIcon;
          const cardIndex = 2 + index;

          return (
            <div
              className={`${styles.group} ${GROUP_TINTS[style] ?? ""}${
                index === 0 ? ` ${styles.lead}` : ""
              }`}
              key={group.title}
              data-slot="skills-group"
            >
              <span className={styles.icon}>
                <Icon />
              </span>
              <h3 className={styles.title} id={titleId}>
                {group.title}
              </h3>
              <p className={styles.count}>{group.items.length} tecnologías</p>
              {index === 0 ? <CodeWindow /> : null}
              <ul className={styles.list} aria-labelledby={titleId}>
                {group.items.map((item, itemIndex) => (
                  <li
                    key={item.name}
                    data-reveal="sub"
                    style={
                      {
                        "--stagger-index": cardIndex + 0.4 + itemIndex * 0.4,
                      } as CSSProperties
                    }
                  >
                    <TechIcon id={item.icon} />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
