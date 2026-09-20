import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Footer, Navbar } from "@/components/common";
import { ScrollToTop } from "@/components/ui";

export function PublicLayout({ children }: { children: ReactNode }) {
  const t = useTranslations("footer");

  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop label={t("backToTop")} />
    </div>
  );
}
