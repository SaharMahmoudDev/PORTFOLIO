import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./container";
import { Logo } from "./logo";

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
      <span className="text-fg-faint font-mono text-xs tracking-wide">
        {title}
      </span>
      {children}
    </div>
  );
}

const linkClass =
  "font-mono text-sm text-link transition-colors hover:text-foreground";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-hairline bg-background border-t">
      <Container className="pt-20">
        <div className="grid gap-12 pb-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="flex max-w-[340px] flex-col gap-3.5">
            <Logo />
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          <FooterColumn title={t("footer.sitemap")}>
            {navKeys.map((key) => (
              <Link key={key} href={`/${key}`} className={linkClass}>
                {t(`nav.${key}`)}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title={t("footer.connect")}>
            {connectLinks.map(({ label, href }) => (
              <a key={label} href={href} className={linkClass}>
                {label}
              </a>
            ))}
          </FooterColumn>
        </div>

        <div className="border-hairline text-fg-faint flex flex-col gap-3 border-t py-6 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} Sahar Mahmoud — {t("footer.builtWith")}
          </span>
          <a href="#top" className="hover:text-foreground transition-colors">
            {t("footer.backToTop")} ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}
