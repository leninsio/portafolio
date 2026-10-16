"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { useInView } from "@/hooks/useInView";

type RevealProps = {
  children: ReactNode;
  className?: string;
  startIndex?: number;
};

type RevealChild = ReactElement<{ style?: CSSProperties }>;

export function Reveal({ children, className, startIndex = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    once: true,
    threshold: 0.15,
  });

  return (
    <div
      className={["reveal", inView && "is-visible", className]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child;
        }

        const element = child as RevealChild;
        const style: CSSProperties = {
          ...element.props.style,
          "--stagger-index": startIndex + index,
        } as CSSProperties;

        return cloneElement(element, {
          "data-reveal": "",
          style,
        } as Partial<{ style?: CSSProperties }>);
      })}
    </div>
  );
}
