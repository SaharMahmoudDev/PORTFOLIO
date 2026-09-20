"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import { Button, Text } from "@/components/ui";

type MobileMenuProps = {
  links: readonly { href: string; key: string }[];
};

export function MobileMenu({ links }: MobileMenuProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const open = useUIStore((s) => s.mobileMenuOpen);
  const setOpen = useUIStore((s) => s.setMobileMenuOpen);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div className="md:hidden">
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-0 z-60 bg-black/50 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        id="mobile-menu"
        inert={!open}
        className={cn(
          "border-hairline bg-background fixed inset-y-0 end-0 z-60 flex w-[min(82vw,320px)] flex-col gap-1 border-s px-5 pb-5 transition-transform duration-400 ease-out",
          open ? "translate-x-0" : "ltr:translate-x-full rtl:-translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-end">
          <button
            type="button"
            onClick={close}
            aria-label={t("closeMenu")}
            className="text-foreground inline-flex size-9 items-center justify-center"
          >
            <X size={22} />
          </button>
        </div>
        {links.map(({ href, key }, index) => (
          <Text
            key={href}
            as={Link}
            href={href}
            onClick={close}
            font="mono"
            size="sm"
            tone={pathname === href ? "default" : "muted"}
            style={{ transitionDelay: open ? `${120 + index * 60}ms` : "0ms" }}
            className={cn(
              "hover:bg-accent rounded-md px-3 py-3.5 transition-[opacity,transform,background-color] duration-400",
              open
                ? "translate-x-0 opacity-100"
                : "opacity-0 ltr:translate-x-6 rtl:-translate-x-6",
            )}
          >
            {t(key as "projects")}
          </Text>
        ))}
        <Button
          href="/contact"
          variant="secondary"
          size="sm"
          onClick={close}
          style={{
            transitionDelay: open ? `${120 + links.length * 60}ms` : "0ms",
          }}
          className={cn(
            "mt-3 w-full justify-center py-3 transition-[opacity,transform] duration-400",
            open
              ? "translate-x-0 opacity-100"
              : "opacity-0 ltr:translate-x-6 rtl:-translate-x-6",
          )}
        >
          {t("startProject")}
        </Button>
      </aside>
    </div>
  );
}
