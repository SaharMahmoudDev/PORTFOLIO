"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { generateProjectDraft } from "../../actions/project-generator";
import { Button, Field, Input, Text, Title } from "@/components/ui";
import { useRouter } from "@/i18n/navigation";

export function ProjectGeneratorForm() {
  const t = useTranslations("admin.dashboard.projects.generator");
  const router = useRouter();
  const [sourceUrl, setSourceUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await generateProjectDraft(sourceUrl, repoUrl);
      if (!result.ok) {
        setError(t(`errors.${result.error}`));
        return;
      }
      router.push(`/admin/projects/${result.id}`);
      router.refresh();
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div>
        <Title as="h1" size="lg">
          {t("title")}
        </Title>
        <Text tone="muted" className="mt-2 max-w-140">
          {t("description")}
        </Text>
      </div>

      <Field
        label={t("sourceUrl")}
        htmlFor="sourceUrl"
        optional={t("sourceUrlHint")}
      >
        <Input
          id="sourceUrl"
          variant="field"
          type="url"
          required
          placeholder="https://example-project.netlify.app"
          value={sourceUrl}
          onChange={(event) => setSourceUrl(event.target.value)}
        />
      </Field>

      <Field label={t("repoUrl")} htmlFor="repoUrl" optional={t("repoUrlHint")}>
        <Input
          id="repoUrl"
          variant="field"
          type="url"
          placeholder="https://github.com/you/project"
          value={repoUrl}
          onChange={(event) => setRepoUrl(event.target.value)}
        />
      </Field>

      {error && (
        <Text font="mono" size="2xs" tone="term-amber" role="alert">
          {error}
        </Text>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? t("generating") : t("generate")}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/projects")}
        >
          {t("cancel")}
        </Button>
      </div>

      {isPending && (
        <Text font="mono" size="2xs" tone="faint">
          {t("generatingHint")}
        </Text>
      )}
    </form>
  );
}
