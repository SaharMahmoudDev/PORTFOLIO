"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { exportLeadsAction } from "../../actions/leads";
import { useRouter } from "@/i18n/navigation";
import { Button, Chip, SearchField } from "@/components/ui";
import type { LeadStatusFilter } from "../../queries/leads";

const statuses: LeadStatusFilter[] = ["all", "new", "read"];

type LeadsToolbarProps = {
  stats: { total: number; new: number; read: number };
};

export function LeadsToolbar({ stats }: LeadsToolbarProps) {
  const t = useTranslations("admin.dashboard.toolbar");
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = (searchParams.get("status") as LeadStatusFilter) || "all";
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const navigate = (next: { status?: LeadStatusFilter; q?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    const nextStatus = next.status ?? status;
    const nextQuery = next.q ?? query;

    if (nextStatus === "all") params.delete("status");
    else params.set("status", nextStatus);

    if (nextQuery) params.set("q", nextQuery);
    else params.delete("q");

    router.replace(`/admin${params.size ? `?${params.toString()}` : ""}`);
  };

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  const onSearchChange = (value: string) => {
    setQuery(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => navigate({ q: value }), 300);
  };

  const counts: Record<LeadStatusFilter, number> = {
    all: stats.total,
    new: stats.new,
    read: stats.read,
  };

  const [isExporting, startExport] = useTransition();

  const onExport = () => {
    startExport(async () => {
      const result = await exportLeadsAction();
      if (!result.ok) {
        toast.error(t("exportFailed"));
        return;
      }
      const bytes = Uint8Array.from(atob(result.base64), (c) =>
        c.charCodeAt(0),
      );
      const blob = new Blob([bytes], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = result.filename;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
      <div role="group" aria-label={t("filterLabel")} className="flex gap-2.5">
        {statuses.map((key) => (
          <Chip
            key={key}
            active={status === key}
            count={counts[key]}
            onClick={() => navigate({ status: key })}
          >
            {t(`status.${key}`)}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchField
          label={t("searchLabel")}
          placeholder={t("searchPlaceholder")}
          value={query}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onExport}
          disabled={isExporting}
        >
          {isExporting ? t("exporting") : t("export")}
        </Button>
      </div>
    </div>
  );
}
