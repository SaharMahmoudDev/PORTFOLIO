import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProjectForm } from "@/features/admin";
import { getAdminProject } from "@/features/admin/queries/projects";
import { Container } from "@/components/ui";
import { getFeatureFlags } from "@/lib/features";

export default async function EditProjectPage({
  params,
}: PageProps<"/[locale]/admin/projects/[id]">) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const project = await getAdminProject(id);
  if (!project) notFound();
  const { projectGenerator } = await getFeatureFlags();

  return (
    <Container className="max-w-220 py-16">
      <ProjectForm project={project} canRegenerate={projectGenerator} />
    </Container>
  );
}
