import { setRequestLocale } from "next-intl/server";
import { ProjectsBrowser, ProjectsCta, ProjectsHeader } from "@/features/guest";
import { projects } from "@/features/guest/data/projects";

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProjectsHeader />
      <ProjectsBrowser items={projects} />
      <ProjectsCta />
    </>
  );
}
