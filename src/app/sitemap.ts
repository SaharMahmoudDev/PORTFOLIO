import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getPublishedProjectEntries } from "@/features/guest/queries/projects";
import { routing } from "@/i18n/routing";
import { languageAlternates, localizedPath } from "@/lib/seo";

export const dynamic = "force-dynamic";

const staticPaths = ["", "/projects", "/about", "/services", "/contact"];

function entry(
  path: string,
  priority: number,
  lastModified?: Date,
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates(path))
      .filter(([language]) => language !== "x-default")
      .map(([language, href]) => [language, `${site.url}${href}`]),
  );

  return routing.locales.map((locale) => ({
    url: `${site.url}${localizedPath(locale, path)}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = staticPaths.flatMap((path) =>
    entry(path, path === "" ? 1 : 0.7),
  );

  try {
    const projects = await getPublishedProjectEntries();
    return [
      ...pages,
      ...projects.flatMap((project) =>
        entry(`/projects/${project.key}`, 0.6, project.updatedAt),
      ),
    ];
  } catch {
    return pages;
  }
}
