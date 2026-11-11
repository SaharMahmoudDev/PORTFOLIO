import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/common";
import { site } from "@/config/site";
import { isValidLocale } from "@/i18n/routing";
import { localizedPath, pageMetadata } from "@/lib/seo";
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
} from "@/features/guest/queries/projects";

export const dynamic = "force-dynamic";

const loadProject = cache(getPublishedProject);

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const project = await loadProject(slug, locale);
  if (!project) return {};

  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: project.name,
    description: project.outcome,
    image: { url: project.image.dark, alt: project.name },
  });
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const resolvedLocale = locale === "ar" ? "ar" : "en";

  const project = await loadProject(slug, resolvedLocale);
  if (!project) notFound();

  const nextProject = await getNextPublishedProject(slug, resolvedLocale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.name,
          description: project.outcome,
          url: `${site.url}${localizedPath(resolvedLocale, `/projects/${slug}`)}`,
          image: `${site.url}${project.image.dark}`,
          inLanguage: resolvedLocale,
          keywords: project.tags.join(", "),
          dateCreated: project.year,
          author: { "@type": "Person", name: site.name, url: site.url },
        }}
      />
      <CaseStudyHeader project={project} />
      <CaseStudyBody project={project} />
      <CaseStudyResults project={project} />
      {nextProject && <NextProject project={nextProject} />}
      <CaseStudyCta />
    </>
  );
}
