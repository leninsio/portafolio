"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./CodeWindow.module.css";

type CodeTone = "keyword" | "component" | "string" | "prop" | "punct";

type CodeToken = {
  text: string;
  tone?: CodeTone;
};

const CODE_LINES: readonly (readonly CodeToken[])[] = [
  [
    { text: "export", tone: "keyword" },
    { text: " " },
    { text: "function", tone: "keyword" },
    { text: " " },
    { text: "Portfolio", tone: "component" },
    { text: "()", tone: "punct" },
    { text: " " },
    { text: "{", tone: "punct" },
  ],
  [
    { text: "  " },
    { text: "return", tone: "keyword" },
    { text: " " },
    { text: "(", tone: "punct" },
  ],
  [
    { text: "    " },
    { text: "<", tone: "punct" },
    { text: "Page", tone: "component" },
    { text: " " },
    { text: "author", tone: "prop" },
    { text: "=", tone: "punct" },
    { text: '"Lenin Alvarado"', tone: "string" },
    { text: ">", tone: "punct" },
  ],
  [
    { text: "      " },
    { text: "<", tone: "punct" },
    { text: "Hero", tone: "component" },
    { text: " " },
    { text: "role", tone: "prop" },
    { text: "=", tone: "punct" },
    { text: '"Desarrollador Full Stack"', tone: "string" },
    { text: " " },
    { text: "/>", tone: "punct" },
  ],
  [
    { text: "      " },
    { text: "<", tone: "punct" },
    { text: "Projects", tone: "component" },
    { text: " " },
    { text: "source", tone: "prop" },
    { text: "=", tone: "punct" },
    { text: '"GitHub Pages"', tone: "string" },
    { text: " " },
    { text: "/>", tone: "punct" },
  ],
  [
    { text: "    " },
    { text: "</", tone: "punct" },
    { text: "Page", tone: "component" },
    { text: ">", tone: "punct" },
  ],
  [
    { text: "  " },
    { text: ");", tone: "punct" },
  ],
  [{ text: "}", tone: "punct" }],
];

export function CodeWindow() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div className={styles.slot} data-slot="code-window-slot">
      <div
        className={styles.window}
        aria-hidden="true"
        ref={ref}
        data-slot="code-window"
        data-inview={inView ? "true" : "false"}
      >
        <div className={styles.bar}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
          <span className={styles.file}>Portfolio.tsx</span>
        </div>
        <pre className={styles.body}>
          <code>
            {CODE_LINES.map((line, lineIndex) => (
              <span className={styles.line} key={lineIndex}>
                {line.map((token, tokenIndex) =>
                  token.tone ? (
                    <span
                      className={styles.tok}
                      data-tone={token.tone}
                      key={tokenIndex}
                    >
                      {token.text}
                    </span>
                  ) : (
                    <span key={tokenIndex}>{token.text}</span>
                  ),
                )}
                {lineIndex === CODE_LINES.length - 1 ? (
                  <span className={styles.cursor} />
                ) : null}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
