import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProjectForm } from "@/features/admin";
import { getAdminProject } from "@/features/admin/queries/projects";
import { Container } from "@/components/ui";

export default async function EditProjectPage({
  params,
}: PageProps<"/[locale]/admin/projects/[id]">) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const project = await getAdminProject(id);
  if (!project) notFound();

  return (
    <Container className="max-w-220 py-16">
      <ProjectForm project={project} />
    </Container>
  );
}
