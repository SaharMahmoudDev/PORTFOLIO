import { useTranslations } from "next-intl";
import { Section } from "@/components/ui";
import { ProjectCard } from "../home/project-card";
import type { ProjectItem } from "../../../data/projects";

type ProjectsGridProps = {
  items: ProjectItem[];
};

export function ProjectsGrid({ items }: ProjectsGridProps) {
  const t = useTranslations("projects");

  return (
    <Section divider={false} spacing="flush-top">
      <div className="grid gap-7 md:grid-cols-2">
        {items.map((project) => (
          <ProjectCard
            key={project.key}
            variant="grid"
            url={t("card.url")}
            name={t("card.name")}
            outcome={t(`items.${project.key}.outcome`)}
            screenshotLabel={t("card.screenshot")}
            ctaLabel={t("card.viewCaseStudy")}
            href="/projects"
            tags={project.tags}
            category={t(`categories.${project.category}`)}
            status={{
              label: t(`status.${project.status}`),
              tone: project.status === "live" ? "primary" : "muted",
            }}
          />
        ))}
      </div>
    </Section>
  );
}
