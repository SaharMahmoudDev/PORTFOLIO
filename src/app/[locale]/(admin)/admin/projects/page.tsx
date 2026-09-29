import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectsAdminList } from "@/features/admin";
import { getAdminProjects } from "@/features/admin/queries/projects";
import { Button, Container, Title } from "@/components/ui";

export default async function AdminProjectsPage({
  params,
}: PageProps<"/[locale]/admin/projects">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.dashboard.projects");

  const projects = await getAdminProjects();

  return (
    <Container className="max-w-220 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Title as="h1" size="lg">
          {t("title")}
        </Title>
        <Button href="/admin/projects/new" size="sm">
          {t("new")}
        </Button>
      </div>

      <ProjectsAdminList projects={projects} />
    </Container>
  );
}
