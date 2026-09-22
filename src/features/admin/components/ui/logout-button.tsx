"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui";
import { logout } from "../../actions/login";

export function LogoutButton() {
  const t = useTranslations("admin.dashboard");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      await logout();
      router.push("/admin/login");
      router.refresh();
    });
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={onClick}
      disabled={isPending}
    >
      {isPending ? t("signingOut") : t("signOut")}
    </Button>
  );
}
