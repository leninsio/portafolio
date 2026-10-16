"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";
import { counterValue, type AboutStat } from "@/lib/stats";

type AboutStatsProps = {
  stats: readonly AboutStat[];
  startIndex?: number;
};

const DURATION_MS = 900;

export function AboutStats({ stats, startIndex = 0 }: AboutStatsProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });
  const [elapsed, setElapsed] = useState(DURATION_MS);

  useEffect(() => {
    if (!inView) {
      return;
    }

    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const next = Math.min(now - start, DURATION_MS);

      setElapsed(next);

      if (next < DURATION_MS) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <div className="about__stats" ref={ref}>
      {stats.map((stat, index) => (
        <div
          className="about__stat"
          key={stat.id}
          data-reveal=""
          style={{ "--stagger-index": startIndex + index } as CSSProperties}
        >
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
