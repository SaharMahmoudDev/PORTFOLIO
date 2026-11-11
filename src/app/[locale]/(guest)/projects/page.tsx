import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectsBrowser, ProjectsCta, ProjectsHeader } from "@/features/guest";
import { getPublishedProjects } from "@/features/guest/queries/projects";

import { isValidLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "seo.projects" });

  return pageMetadata({
    locale,
    path: "/projects",
    title: t("title"),
    description: t("description"),
  });
}

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
