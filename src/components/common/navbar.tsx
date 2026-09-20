"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useUIStore } from "@/store/ui-store";
import {
  Button,
  Container,
  LocaleSwitch,
  Logo,
  Text,
  ThemeToggle,
} from "@/components/ui";

const links = [
  { href: "/projects", key: "projects" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const mobileMenuOpen = useUIStore((s) => s.mobileMenuOpen);
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="relative z-50">
      <Container
        as="nav"
        className="flex h-16 items-center justify-between md:h-[88px]"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="hover:text-foreground transition-colors"
        >
          <Logo />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map(({ href, key }) => (
            <Text
              key={href}
              as={Link}
              href={href}
              font="mono"
              size="xs"
              tone={pathname === href ? "default" : "muted"}
              className="hover:text-foreground transition-colors"
            >
              {t(key)}
            </Text>
          ))}
          <div className="flex items-center gap-1">
            <LocaleSwitch label={t("switchLanguage")} />
            <ThemeToggle
              lightLabel={t("themeToLight")}
              darkLabel={t("themeToDark")}
            />
          </div>
          <Button href="/contact" variant="secondary" size="sm">
            {t("startProject")}
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LocaleSwitch label={t("switchLanguage")} />
          <ThemeToggle
            lightLabel={t("themeToLight")}
            darkLabel={t("themeToDark")}
          />
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileMenuOpen}
            className="text-foreground inline-flex size-9 items-center justify-center"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="border-hairline bg-background border-t md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map(({ href, key }) => (
              <Text
                key={href}
                as={Link}
                href={href}
                onClick={closeMenu}
                font="mono"
                size="sm"
                tone={pathname === href ? "default" : "muted"}
                className="hover:bg-accent rounded-md px-2 py-3 transition-colors"
              >
                {t(key)}
              </Text>
            ))}
            <Button
              href="/contact"
              variant="secondary"
              size="sm"
              onClick={closeMenu}
              className="mt-2 w-full justify-center py-3"
            >
              {t("startProject")}
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
