"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleSwitchProps = {
  label?: string;
  className?: string;
};

export function LocaleSwitch({
  label = "Switch language",
  className,
}: LocaleSwitchProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = routing.locales.find((l) => l !== locale) ?? locale;

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      aria-label={label}
      className={cn(
        "text-foreground hover:bg-accent inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 font-mono text-xs transition-colors",
        className,
      )}
    >
      {nextLocale.toUpperCase()}
    </button>
  );
}
