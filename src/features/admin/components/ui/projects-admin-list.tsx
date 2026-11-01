import { getFormatter, getTranslations } from "next-intl/server";
import type { Project } from "@/db/schema";
import { BracketCard, Badge, Button, Tag, Text, Title } from "@/components/ui";
import { ProjectRowActions } from "./project-row-actions";

type ProjectsAdminListProps = {
  projects: Project[];
};

export async function ProjectsAdminList({ projects }: ProjectsAdminListProps) {
  const t = await getTranslations("admin.dashboard.projects");
  const tc = await getTranslations("projects.categories");
  const format = await getFormatter();

  if (projects.length === 0) {
    return (
      <Text tone="muted" className="mt-8">
        {t("empty")}
      </Text>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-4">
      {projects.map((project) => (
        <BracketCard key={project.id} cornerSize="sm" className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Title as="h3" size="xs">
                {project.name}
              </Title>
              <Badge
                size="sm"
                tone={
                  project.publishStatus === "published" ? "primary" : "muted"
                }
              >
                {t(`publishStatus.${project.publishStatus}`)}
              </Badge>
            </div>
            <Text font="mono" size="2xs" tone="faint">
              {format.dateTime(project.updatedAt, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </Text>
          </div>

          <Text font="mono" size="xs" tone="link" className="mt-2">
            {project.key}
          </Text>

          <div className="mt-3.5 flex flex-wrap gap-2">
            <Tag size="sm">{tc(project.category)}</Tag>
            {project.tags.slice(0, 4).map((tag) => (
              <Tag key={tag} size="sm">
                {tag}
              </Tag>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Button
              href={`/admin/projects/${project.id}`}
              variant="secondary"
              size="sm"
            >
              {t("edit")}
            </Button>
            <ProjectRowActions
              id={project.id}
              publishStatus={project.publishStatus as "draft" | "published"}
            />
          </div>
        </BracketCard>
      ))}
    </div>
  );
}
