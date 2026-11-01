"use client";

import { useTranslations } from "next-intl";
import { projectCategories } from "../../../data/projects";
import type { ProjectCategory, PublicProject } from "../../../data/projects";
import { useProjectsFilter } from "../../../store";
import { ProjectsGrid } from "./projects-grid";
import { ProjectsToolbar } from "./projects-toolbar";

type ProjectsBrowserProps = {
  items: PublicProject[];
};

export function ProjectsBrowser({ items }: ProjectsBrowserProps) {
  const t = useTranslations("projects");
  const { category, query } = useProjectsFilter();

  const needle = query.trim().toLowerCase();
  const searched = needle
    ? items.filter((project) =>
        [
          project.name,
          project.outcome,
          t(`categories.${project.category}`),
          ...project.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
    : items;

  const counts = Object.fromEntries(
    projectCategories.map((key) => [
      key,
      searched.filter((project) => project.category === key).length,
    ]),
  ) as Record<ProjectCategory, number>;

  const visible =
    category === "all"
      ? searched
      : searched.filter((project) => project.category === category);

  return (
    <>
      <ProjectsToolbar total={searched.length} counts={counts} />
      <ProjectsGrid items={visible} />
    </>
  );
}
