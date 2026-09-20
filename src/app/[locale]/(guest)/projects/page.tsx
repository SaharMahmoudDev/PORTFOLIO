import { setRequestLocale } from "next-intl/server";
import { ProjectsGrid, ProjectsHeader } from "@/features/guest";
import { projects } from "@/features/guest/data/projects";

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProjectsHeader />
      <ProjectsGrid items={projects} />
    </>
  );
}
