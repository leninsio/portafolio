"use client";

import { useEffect, useRef, useState } from "react";
import { counterValue, type AboutStat } from "@/lib/stats";

type AboutStatsProps = {
  stats: readonly AboutStat[];
};

const DURATION_MS = 900;

export function AboutStats({ stats }: AboutStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [elapsed, setElapsed] = useState(DURATION_MS);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          observer.disconnect();

          const start = performance.now();

          const tick = (now: number) => {
            const next = Math.min(now - start, DURATION_MS);

            setElapsed(next);

            if (next < DURATION_MS) {
              frame = requestAnimationFrame(tick);
            }
          };

          setElapsed(0);
          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="about__stats" ref={ref}>
      {stats.map((stat) => (
        <div className="about__stat" key={stat.id}>
          <span className="about__stat-value" aria-hidden="true">
            {counterValue(stat.value, elapsed, DURATION_MS)}
          </span>
          <span className="about__stat-label" aria-hidden="true">
            {stat.label}
          </span>
          <span className="visually-hidden">
            {stat.value} {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
