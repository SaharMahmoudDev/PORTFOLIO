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
  getNextPublishedProject,
  getPublishedProject,
  getPublishedProjectKeys,
} from "@/features/guest/queries/projects";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const keys = await getPublishedProjectKeys().catch(() => []);
  return routing.locales.flatMap((locale) =>
    keys.map((key) => ({ locale, slug: key })),
  );
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const resolvedLocale = locale === "ar" ? "ar" : "en";

  const project = await getPublishedProject(slug, resolvedLocale);
  if (!project) notFound();

  const nextProject = await getNextPublishedProject(slug, resolvedLocale);

  return (
    <>
      <CaseStudyHeader project={project} />
      <CaseStudyBody project={project} />
      <CaseStudyResults project={project} />
      {nextProject && <NextProject project={nextProject} />}
      <CaseStudyCta />
    </>
  );
}
