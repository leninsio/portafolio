"use client";

import { useEffect, useRef, useState } from "react";

export type UseInViewOptions = {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export function useInView<T extends Element = Element>({
  once = false,
  threshold = 0.2,
  rootMargin = "0px",
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  // Without IntersectionObserver there is nothing to trigger an entry, so the
  // element counts as visible right away. Kept out of the effect body to stay
  // hydration-safe (server always renders the unsupported branch as false).
  const [inView, setInView] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);

            if (once) {
              observer.disconnect();
            }
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return { ref, inView };
}
