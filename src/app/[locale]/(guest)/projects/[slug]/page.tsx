import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CaseStudyHeader } from "@/features/guest";
import { getProject, projects } from "@/features/guest/data/projects";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.key })),
  );
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  return <CaseStudyHeader project={project} />;
}
