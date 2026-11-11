"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useScrolled } from "@/hooks/use-scrolled";
import { MobileMenu } from "./mobile-menu";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
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
  const scrolled = useScrolled();
  const mobileMenuOpen = useUIStore((s) => s.mobileMenuOpen);
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-300",
          scrolled || mobileMenuOpen
            ? "border-hairline bg-background/80 backdrop-blur-md"
            : "border-transparent",
        )}
      >
        <Container
          as="nav"
          className="flex h-16 items-center justify-between md:h-22"
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
              aria-controls="mobile-menu"
              className="text-foreground relative inline-flex size-9 items-center justify-center"
            >
              <Menu
                size={22}
                className={cn(
                  "absolute transition-all duration-300",
                  mobileMenuOpen
                    ? "scale-50 rotate-90 opacity-0"
                    : "scale-100 rotate-0 opacity-100",
                )}
              />
              <X
                size={22}
                className={cn(
                  "absolute transition-all duration-300",
                  mobileMenuOpen
                    ? "scale-100 rotate-0 opacity-100"
                    : "scale-50 -rotate-90 opacity-0",
                )}
              />
            </button>
          </div>
        </Container>
      </header>
      <MobileMenu links={links} />
    </>
  );
}
