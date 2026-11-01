"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button, Section, Text } from "@/components/ui";
import { gsap, useGSAP } from "@/lib/gsap";
import { ProjectCard } from "../home/project-card";
import type { PublicProject } from "../../../data/projects";
import { useProjectsFilter } from "../../../store";

type ProjectsGridProps = {
  items: PublicProject[];
};

export function ProjectsGrid({ items }: ProjectsGridProps) {
  const t = useTranslations("projects");
  const reset = useProjectsFilter((state) => state.reset);
  const gridRef = useRef<HTMLDivElement>(null);
  const previous = useRef<string | null>(null);
  const signature = items.map((item) => item.key).join();

  useGSAP(
    () => {
      const changed =
        previous.current !== null && previous.current !== signature;
      previous.current = signature;

      const cards = gridRef.current?.querySelectorAll("[data-project-card]");
      if (!changed || !cards?.length) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(cards, {
          autoAlpha: 0,
          y: 28,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "all",
        });
      });

      return () => mm.revert();
    },
    { dependencies: [signature], scope: gridRef },
  );

  return (
    <Section divider={false} spacing="flush-top">
      <div ref={gridRef} className="grid gap-7 md:grid-cols-2">
        {items.map((project) => (
          <div key={project.key} data-project-card>
            <ProjectCard
              variant="grid"
              url={project.url}
              name={project.name}
              outcome={project.outcome}
              screenshotLabel={t("card.screenshot")}
              ctaLabel={t("card.viewCaseStudy")}
              href={`/projects/${project.key}`}
              tags={project.tags}
              category={t(`categories.${project.category}`)}
              status={{
                label: t(`status.${project.status}`),
                tone: project.status === "live" ? "primary" : "muted",
              }}
              image={project.image}
            />
          </div>
        ))}

        {items.length === 0 && (
          <div className="col-span-full flex flex-col items-start gap-4 py-10">
            <Text tone="muted">{t("toolbar.empty")}</Text>
            <Button variant="secondary" size="sm" onClick={reset}>
              {t("toolbar.reset")}
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
