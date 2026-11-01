import { setRequestLocale } from "next-intl/server";
import { ProjectsBrowser, ProjectsCta, ProjectsHeader } from "@/features/guest";
import { getPublishedProjects } from "@/features/guest/queries/projects";

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const items = await getPublishedProjects(locale === "ar" ? "ar" : "en");

  return (
    <>
      <ProjectsHeader />
      <ProjectsBrowser items={items} />
      <ProjectsCta />
    </>
  );
}
