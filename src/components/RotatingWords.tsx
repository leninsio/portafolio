"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useInView } from "@/hooks/useInView";
import { nextWordIndex } from "@/lib/rotating-words";
import styles from "./RotatingWords.module.css";

type RotatingWordsProps = {
  prefix: string;
  words: readonly string[];
  label: string;
};

const ROTATION_INTERVAL_MS = 2600;

function offsetFor(index: number, active: number, total: number): number {
  const forward = (index - active + total) % total;

  return forward > total / 2 ? forward - total : forward;
}

export function RotatingWords({ prefix, words, label }: RotatingWordsProps) {
  const [active, setActive] = useState(0);
  const [widths, setWidths] = useState<number[]>([]);
  const total = words.length;
  const { ref, inView } = useInView<HTMLSpanElement>();
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (total < 2 || !inView) {
      return;
    }

    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let timer: ReturnType<typeof setInterval> | undefined;

    const start = () => {
      if (timer !== undefined) {
        return;
      }

      timer = setInterval(() => {
        setActive((current) => nextWordIndex(current, total));
      }, ROTATION_INTERVAL_MS);
    };

    const stop = () => {
      if (timer === undefined) {
        return;
      }

      clearInterval(timer);
      timer = undefined;
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stop();
      } else {
        start();
      }
    };

    start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [total, inView]);

  useEffect(() => {
    const measure = () => {
      setWidths(
        wordRefs.current.map((word) =>
          word ? word.getBoundingClientRect().width : 0,
        ),
      );
    };

    measure();

    const container = ref.current;
    const observer =
      typeof ResizeObserver === "function" && container
        ? new ResizeObserver(measure)
        : undefined;

    if (container) {
      observer?.observe(container);
    }

    document.fonts?.ready.then(measure).catch(() => undefined);

    return () => observer?.disconnect();
  }, [ref, total]);

  const activeWidth = widths[active];

  return (
    <span className={styles.rotating} ref={ref}>
      <span className={styles.label} aria-hidden="true" data-slot="rotating-label">
        {prefix}
      </span>
      <span
        className={styles.viewport}
        aria-hidden="true"
        data-slot="rotating-viewport"
        style={activeWidth === undefined ? undefined : { width: activeWidth }}
      >
        <span className={styles.sizer} data-slot="rotating-sizer">
          {words[active]}
        </span>
        {words.map((word, index) => (
          <span
            className={styles.word}
            data-slot="rotating-word"
            data-active={index === active}
            key={word}
            ref={(node) => {
              wordRefs.current[index] = node;
            }}
            style={
              {
                "--rotating-offset": offsetFor(index, active, total),
              } as CSSProperties
            }
          >
            {word}
          </span>
        ))}
      </span>
      <span className="visually-hidden">{label}</span>
    </span>
  );
}
