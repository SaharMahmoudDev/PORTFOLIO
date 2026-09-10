"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Logo } from "./logo";

const links = [
  { href: "/projects", key: "projects" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

/**
 * Site header. Transparent so it reads as part of the hero atmosphere on the
 * home page (canvas: nav merges into the hero with no divider).
 */
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
          className="text-link hover:text-foreground transition-colors"
        >
          <Logo />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "hover:text-foreground font-mono text-[13px] transition-colors",
                pathname === href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {t(key)}
            </Link>
          ))}
          <Link
            href="/contact"
            className="border-border-strong text-foreground hover:border-primary hover:text-primary rounded-md border px-4 py-2 font-mono text-xs transition-colors"
          >
            {t("startProject")}
          </Link>
        </div>

        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={mobileMenuOpen}
          className="text-foreground md:hidden"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {mobileMenuOpen && (
        <div className="border-hairline bg-background border-t md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className={cn(
                  "hover:bg-accent rounded-md px-2 py-3 font-mono text-sm transition-colors",
                  pathname === href
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {t(key)}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="border-border-strong text-foreground mt-2 rounded-md border px-2 py-3 text-center font-mono text-sm"
            >
              {t("startProject")}
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
