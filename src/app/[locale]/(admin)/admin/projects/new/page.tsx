import { setRequestLocale } from "next-intl/server";
import { ProjectForm } from "@/features/admin";
import { Container } from "@/components/ui";

export default async function NewProjectPage({
  params,
}: PageProps<"/[locale]/admin/projects/new">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container className="max-w-220 py-16">
      <ProjectForm />
    </Container>
  );
}
