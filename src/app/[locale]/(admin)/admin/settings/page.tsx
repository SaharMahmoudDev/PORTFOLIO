import { setRequestLocale } from "next-intl/server";
import { SettingsForm } from "@/features/admin";
import { Container } from "@/components/ui";
import { getFeatureFlags } from "@/lib/features";

export default async function AdminSettingsPage({
  params,
}: PageProps<"/[locale]/admin/settings">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const flags = await getFeatureFlags();

  return (
    <Container className="max-w-220 py-16">
      <SettingsForm initial={flags} />
    </Container>
  );
}
