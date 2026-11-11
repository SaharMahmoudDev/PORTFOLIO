import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Logo, Text } from "@/components/ui";
import { getAdminSession } from "@/features/admin/session";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getAdminSession();
  const t = await getTranslations("admin.dashboard.nav");

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-hairline border-b">
        <Container className="flex h-16 items-center gap-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            <Logo />
          </Link>
          {session && (
            <nav className="flex items-center gap-6">
              <Text
                as={Link}
                href="/admin"
                font="mono"
                size="xs"
                tone="muted"
                className="hover:text-foreground transition-colors"
              >
                {t("messages")}
              </Text>
              <Text
                as={Link}
                href="/admin/projects"
                font="mono"
                size="xs"
                tone="muted"
                className="hover:text-foreground transition-colors"
              >
                {t("projects")}
              </Text>
              <Text
                as={Link}
                href="/admin/settings"
                font="mono"
                size="xs"
                tone="muted"
                className="hover:text-foreground transition-colors"
              >
                {t("settings")}
              </Text>
            </nav>
          )}
        </Container>
      </header>
      <main className="flex flex-1 items-center justify-center">
        {children}
      </main>
    </div>
  );
}
