import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  CaseStudyBody,
  CaseStudyCta,
  CaseStudyHeader,
  CaseStudyResults,
  NextProject,
} from "@/features/guest";
import {
  getNextProject,
  getProject,
  projects,
} from "@/features/guest/data/projects";
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

  return (
    <>
      <CaseStudyHeader project={project} />
      <CaseStudyBody project={project} />
      <CaseStudyResults />
      <NextProject project={getNextProject(project.key)} />
      <CaseStudyCta />
    </>
  );
}
