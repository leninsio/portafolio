"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { nextWordIndex } from "@/lib/rotating-words";

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
  const total = words.length;

  useEffect(() => {
    if (total < 2) {
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
  }, [total]);

  return (
    <span className="rotating">
      <span className="rotating__label" aria-hidden="true">
        {prefix}
      </span>
      <span className="rotating__viewport" aria-hidden="true">
        {words.map((word, index) => (
          <span
            className="rotating__word"
            data-active={index === active}
            key={word}
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
