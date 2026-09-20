import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Logo, Text } from "@/components/ui";

const navKeys = ["projects", "services", "about", "contact"] as const;

const connectLinks = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
] as const;

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <Text font="mono" size="xs" tone="faint" className="tracking-wide">
        {title}
      </Text>
      {children}
    </div>
  );
}

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-hairline border-t">
      <Container className="pt-20">
        <div className="grid gap-12 pb-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="flex max-w-85 flex-col gap-3.5">
            <Logo />
            <Text size="sm" tone="muted">
              {t("footer.tagline")}
            </Text>
          </div>

          <FooterColumn title={t("footer.sitemap")}>
            {navKeys.map((key) => (
              <Text
                key={key}
                as={Link}
                href={`/${key}`}
                font="mono"
                size="sm"
                tone="link"
                className="hover:text-foreground transition-colors"
              >
                {t(`nav.${key}`)}
              </Text>
            ))}
          </FooterColumn>

          <FooterColumn title={t("footer.connect")}>
            {connectLinks.map(({ label, href }) => (
              <Text
                key={label}
                as="a"
                href={href}
                font="mono"
                size="sm"
                tone="link"
                className="hover:text-foreground transition-colors"
              >
                {label}
              </Text>
            ))}
          </FooterColumn>
        </div>

        <div className="border-hairline flex flex-col gap-3 border-t py-6 sm:flex-row sm:items-center sm:justify-between">
          <Text font="mono" size="xs" tone="faint">
            © {year} Sahar Mahmoud — {t("footer.builtWith")}
          </Text>
          <Text
            as="a"
            href="#top"
            font="mono"
            size="xs"
            tone="faint"
            className="hover:text-foreground transition-colors"
          >
            {t("footer.backToTop")} ↑
          </Text>
        </div>
      </Container>
    </footer>
  );
}
