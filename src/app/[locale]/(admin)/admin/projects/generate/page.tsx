import { setRequestLocale } from "next-intl/server";
import { ProjectGeneratorForm } from "@/features/admin";
import { Container } from "@/components/ui";

export default async function GenerateProjectPage({
  params,
}: PageProps<"/[locale]/admin/projects/generate">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container className="max-w-220 py-16">
      <ProjectGeneratorForm />
    </Container>
  );
}
