import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/common";
import { Section } from "@/components/ui";
import { getFeaturedProjects } from "../../../queries/projects";
import { ProjectShowcase } from "./project-showcase";

const featuredKeys = ["surveyland", "renova", "real-estate-hub"] as const;

type SelectedWorkProps = {
  locale: "en" | "ar";
};

export async function SelectedWork({ locale }: SelectedWorkProps) {
  const t = await getTranslations("home.selectedWork");
  const featured = await getFeaturedProjects(featuredKeys, locale);

  return (
    <Section>
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        className="mb-14"
      />

      <ProjectShowcase
        projects={featured.map((project) => ({
          key: project.key,
          url: project.url,
          name: project.name,
          outcome: project.outcome,
          selectLabel: t("select", { name: project.name }),
          href: `/projects/${project.key}`,
          tags: project.tags,
          image: project.image,
        }))}
        screenshotLabel={t("screenshot")}
        ctaLabel={t("viewCaseStudy")}
      />
    </Section>
  );
}
