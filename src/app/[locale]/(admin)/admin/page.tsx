import { getTranslations, setRequestLocale } from "next-intl/server";
import { LogoutButton } from "@/features/admin";
import { getAdminSession } from "@/features/admin/session";
import { Container, Eyebrow, Text, Title } from "@/components/ui";

export default async function AdminPage({
  params,
}: PageProps<"/[locale]/admin">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.dashboard");

  const session = await getAdminSession();

  return (
    <Container className="max-w-160 py-16">
      <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Title as="h1" size="lg">
          {t("title")}
        </Title>
        <LogoutButton />
      </div>
      <Text tone="muted" className="mt-4">
        {t("signedInAs", { email: session?.email ?? "" })}
      </Text>
    </Container>
  );
}
