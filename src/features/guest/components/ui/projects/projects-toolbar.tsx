"use client";

import { useTranslations } from "next-intl";
import { Chip, Container, Reveal, SearchField } from "@/components/ui";
import { projectCategories } from "../../../data/projects";
import type { ProjectCategory } from "../../../data/projects";
import { useProjectsFilter } from "../../../store";

type ProjectsToolbarProps = {
  total: number;
  counts: Record<ProjectCategory, number>;
};

export function ProjectsToolbar({ total, counts }: ProjectsToolbarProps) {
  const t = useTranslations("projects.toolbar");
  const tc = useTranslations("projects.categories");
  const { category, query, setCategory, setQuery } = useProjectsFilter();

  return (
    <Reveal>
      <Container className="pb-10 md:pb-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div
            role="group"
            aria-label={t("filterLabel")}
            className="flex flex-wrap items-center gap-2.5"
          >
            <Chip
              active={category === "all"}
              count={total}
              onClick={() => setCategory("all")}
            >
              {t("all")}
            </Chip>
            {projectCategories.map((key) => (
              <Chip
                key={key}
                active={category === key}
                count={counts[key]}
                onClick={() => setCategory(key)}
              >
                {tc(key)}
              </Chip>
            ))}
          </div>

          <SearchField
            label={t("searchLabel")}
            placeholder={t("searchPlaceholder")}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </Container>
    </Reveal>
  );
}
