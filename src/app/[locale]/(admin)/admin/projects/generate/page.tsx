import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProjectGeneratorForm } from "@/features/admin";
import { Container } from "@/components/ui";
import { getFeatureFlags } from "@/lib/features";

export default async function GenerateProjectPage({
  params,
}: PageProps<"/[locale]/admin/projects/generate">) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!(await getFeatureFlags()).projectGenerator) {
    redirect(`/${locale}/admin/projects`);
  }

  return (
    <Container className="max-w-220 py-16">
      <ProjectGeneratorForm />
    </Container>
  );
}
