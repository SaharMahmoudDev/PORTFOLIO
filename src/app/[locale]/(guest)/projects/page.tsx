import { setRequestLocale } from "next-intl/server";
import { ProjectsHeader } from "@/features/guest";

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsHeader />;
}
