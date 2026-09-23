"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ProjectCard } from "./project-card";
import type { ProjectImage } from "../../../data/projects";

export type ShowcaseProject = {
  key: string;
  url: string;
  name: string;
  outcome: string;
  selectLabel: string;
  href: string;
  tags?: string[];
  image?: ProjectImage;
};

type ProjectShowcaseProps = {
  projects: ShowcaseProject[];
  screenshotLabel: string;
  ctaLabel: string;
};

export function ProjectShowcase({
  projects,
  screenshotLabel,
  ctaLabel,
}: ProjectShowcaseProps) {
  const [order, setOrder] = useState(() => projects.map((p) => p.key));
  const previous = useRef<string | null>(null);
  const busy = useRef(false);
  const nodes = useRef<Record<string, HTMLDivElement | null>>({});
  const featuredKey = order[0];

  const select = (key: string) => {
    if (key === featuredKey || busy.current) return;
    busy.current = true;

    const commit = () => {
      previous.current = featuredKey;
      setOrder((prev) => {
        const next = [...prev];
        const index = next.indexOf(key);
        [next[0], next[index]] = [next[index], next[0]];
        return next;
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      commit();
      busy.current = false;
      return;
    }

    gsap.to([nodes.current[featuredKey], nodes.current[key]], {
      autoAlpha: 0,
      duration: 0.2,
      ease: "power1.in",
      onComplete: commit,
    });
  };

  useGSAP(
    () => {
      const leavingKey = previous.current;
      if (!leavingKey) return;

      gsap.fromTo(
        nodes.current[featuredKey],
        { autoAlpha: 0, y: -64 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "all",
        },
      );
      gsap.fromTo(
        nodes.current[leavingKey],
        { autoAlpha: 0, y: 64 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "all",
          onComplete: () => {
            busy.current = false;
          },
        },
      );
    },
    { dependencies: [featuredKey] },
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:grid-rows-2">
      {order.map((key, index) => {
        const project = projects.find((p) => p.key === key)!;
        return (
          <ProjectCard
            key={key}
            ref={(node) => {
              nodes.current[key] = node;
            }}
            variant={index === 0 ? "featured" : "compact"}
            url={project.url}
            name={project.name}
            outcome={project.outcome}
            screenshotLabel={screenshotLabel}
            ctaLabel={ctaLabel}
            href={project.href}
            tags={index === 0 ? project.tags : undefined}
            onSelect={() => select(key)}
            selectLabel={project.selectLabel}
            image={project.image}
          />
        );
      })}
    </div>
  );
}
