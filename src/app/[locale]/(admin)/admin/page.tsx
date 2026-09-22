import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  AdminStats,
  LeadsList,
  LeadsToolbar,
  LogoutButton,
} from "@/features/admin";
import { getAdminSession } from "@/features/admin/session";
import { getLeadStats } from "@/features/admin/queries/leads";
import type { LeadStatusFilter } from "@/features/admin/queries/leads";
import { Container, Eyebrow, Text, Title } from "@/components/ui";

export default async function AdminPage({
  params,
  searchParams,
}: PageProps<"/[locale]/admin">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.dashboard");

  const session = await getAdminSession();
  const search = await searchParams;
  const status = (
    Array.isArray(search.status) ? search.status[0] : search.status
  ) as LeadStatusFilter | undefined;
  const query = Array.isArray(search.q) ? search.q[0] : search.q;

  const stats = await getLeadStats();

  return (
    <Container className="max-w-220 py-16">
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

      <AdminStats stats={stats} />
      <LeadsToolbar stats={stats} />
      <LeadsList status={status} query={query} />
    </Container>
  );
}
