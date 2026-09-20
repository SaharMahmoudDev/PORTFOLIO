"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  distance = 48,
  className,
}: RevealProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const trigger = outer.current;
      const target = inner.current;
      if (!trigger || !target) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(target, {
          y: distance,
          autoAlpha: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger,
            start: "top 88%",
            toggleActions: "play reset play reset",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: outer },
  );

  return (
    <div ref={outer} className={className}>
      <div ref={inner}>{children}</div>
    </div>
  );
}
