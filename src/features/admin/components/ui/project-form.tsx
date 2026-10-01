"use client";

import { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { createProject, updateProject } from "../../actions/projects";
import { regenerateProjectDraft } from "../../actions/project-generator";
import { projectFormSchema } from "../../schemas/project";
import type {
  ProjectFormOutput,
  ProjectFormValues,
} from "../../schemas/project";
import type { Project } from "@/db/schema";
import {
  Button,
  Chip,
  Field,
  Input,
  Text,
  Textarea,
  Title,
} from "@/components/ui";
import { projectCategories } from "@/features/guest/data/projects";
import { useRouter } from "@/i18n/navigation";

const statuses = ["live", "inProgress"] as const;
const publishStatuses = ["draft", "published"] as const;

const contentSkeleton = {
  outcome: "",
  meta: { role: "", timeline: "" },
  overview: "",
  problem: "",
  goals: [""],
  approach: [{ title: "", text: "" }],
  features: [{ title: "", text: "" }],
  design: { pointTitle: "", pointText: "" },
  implementation: [{ title: "", text: "" }],
  challenges: { pointTitle: "", pointText: "" },
  detail: { caption: "" },
  results: [{ label: "", value: "" }],
};

function defaultsFor(project?: Project): ProjectFormValues {
  if (!project) {
    const json = JSON.stringify(contentSkeleton, null, 2);
    return {
      key: "",
      name: "",
      url: "",
      demoUrl: "",
      repoUrl: "",
      category: "webApp",
      status: "live",
      publishStatus: "draft",
      year: String(new Date().getFullYear()),
      tags: "",
      imageLight: "",
      imageDark: "",
      sortOrder: 0,
      contentEn: json,
      contentAr: json,
    };
  }

  return {
    key: project.key,
    name: project.name,
    url: project.url,
    demoUrl: project.demoUrl,
    repoUrl: project.repoUrl,
    category: project.category as ProjectFormValues["category"],
    status: project.projectStatus as ProjectFormValues["status"],
    publishStatus: project.publishStatus as ProjectFormValues["publishStatus"],
    year: project.year,
    tags: project.tags.join(", "),
    imageLight: project.imageLight,
    imageDark: project.imageDark,
    sortOrder: project.sortOrder,
    contentEn: JSON.stringify(project.content.en, null, 2),
    contentAr: JSON.stringify(project.content.ar, null, 2),
  };
}

type ProjectFormProps = {
  project?: Project;
};

export function ProjectForm({ project }: ProjectFormProps) {
  const t = useTranslations("admin.dashboard.projects.form");
  const tg = useTranslations("admin.dashboard.projects.generator");
  const tc = useTranslations("projects.categories");
  const ts = useTranslations("projects.status");
  const tp = useTranslations("admin.dashboard.projects.publishStatus");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isRegenerating, startRegenerate] = useTransition();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues, unknown, ProjectFormOutput>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: defaultsFor(project),
  });

  const onSubmit = (values: ProjectFormOutput) => {
    startTransition(async () => {
      const result = project
        ? await updateProject(project.id, values)
        : await createProject(values);

      if (!result.ok) {
        toast.error(t(`errors.${result.error}`));
        return;
      }

      router.push("/admin/projects");
      router.refresh();
    });
  };

  const error = (key: keyof ProjectFormValues) => {
    const message = errors[key]?.message;
    return typeof message === "string" ? message : undefined;
  };

  const onRegenerate = () => {
    if (!project) return;
    startRegenerate(async () => {
      const result = await regenerateProjectDraft(project.id);
      if (!result.ok) {
        toast.error(tg(`errors.${result.error}`));
        return;
      }
      window.location.reload();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Title as="h1" size="lg">
          {project ? t("editTitle") : t("createTitle")}
        </Title>
        {project?.sourceUrl && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onRegenerate}
            disabled={isRegenerating}
          >
            {isRegenerating ? tg("generating") : tg("regenerate")}
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          label={t("key")}
          htmlFor="key"
          error={error("key")}
          optional={t("keyHint")}
        >
          <Input id="key" variant="field" {...register("key")} />
        </Field>
        <Field label={t("name")} htmlFor="name" error={error("name")}>
          <Input id="name" variant="field" {...register("name")} />
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Field
          label={t("url")}
          htmlFor="url"
          error={error("url")}
          optional={t("urlHint")}
        >
          <Input id="url" variant="field" {...register("url")} />
        </Field>
        <Field label={t("demoUrl")} htmlFor="demoUrl" error={error("demoUrl")}>
          <Input id="demoUrl" variant="field" {...register("demoUrl")} />
        </Field>
        <Field label={t("repoUrl")} htmlFor="repoUrl" error={error("repoUrl")}>
          <Input id="repoUrl" variant="field" {...register("repoUrl")} />
        </Field>
      </div>

      <Field label={t("category")}>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <div role="group" className="flex flex-wrap gap-2.5">
              {projectCategories.map((key) => (
                <Chip
                  key={key}
                  active={field.value === key}
                  onClick={() => field.onChange(key)}
                >
                  {tc(key)}
                </Chip>
              ))}
            </div>
          )}
        />
      </Field>

      <div className="grid gap-8 md:grid-cols-2">
        <Field label={t("status")}>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <div role="group" className="flex flex-wrap gap-2.5">
                {statuses.map((key) => (
                  <Chip
                    key={key}
                    active={field.value === key}
                    onClick={() => field.onChange(key)}
                  >
                    {ts(key)}
                  </Chip>
                ))}
              </div>
            )}
          />
        </Field>

        <Field label={t("publishStatus")}>
          <Controller
            control={control}
            name="publishStatus"
            render={({ field }) => (
              <div role="group" className="flex flex-wrap gap-2.5">
                {publishStatuses.map((key) => (
                  <Chip
                    key={key}
                    active={field.value === key}
                    onClick={() => field.onChange(key)}
                  >
                    {tp(key)}
                  </Chip>
                ))}
              </div>
            )}
          />
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Field label={t("year")} htmlFor="year" error={error("year")}>
          <Input id="year" variant="field" {...register("year")} />
        </Field>
        <Field
          label={t("tags")}
          htmlFor="tags"
          error={error("tags")}
          optional={t("tagsHint")}
        >
          <Input id="tags" variant="field" {...register("tags")} />
        </Field>
        <Field label={t("sortOrder")} htmlFor="sortOrder">
          <Input
            id="sortOrder"
            type="number"
            variant="field"
            {...register("sortOrder")}
          />
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          label={t("imageLight")}
          htmlFor="imageLight"
          error={error("imageLight")}
        >
          <Input id="imageLight" variant="field" {...register("imageLight")} />
        </Field>
        <Field
          label={t("imageDark")}
          htmlFor="imageDark"
          error={error("imageDark")}
        >
          <Input id="imageDark" variant="field" {...register("imageDark")} />
        </Field>
      </div>

      <Text font="mono" size="2xs" tone="faint">
        {t("contentHint")}
      </Text>

      <div className="grid gap-6 lg:grid-cols-2">
        <Field
          label={t("contentEn")}
          htmlFor="contentEn"
          error={error("contentEn")}
        >
          <Textarea
            id="contentEn"
            dir="ltr"
            className="min-h-100 font-mono text-xs"
            {...register("contentEn")}
          />
        </Field>
        <Field
          label={t("contentAr")}
          htmlFor="contentAr"
          error={error("contentAr")}
        >
          <Textarea
            id="contentAr"
            dir="ltr"
            className="min-h-100 font-mono text-xs"
            {...register("contentAr")}
          />
        </Field>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? t("saving") : t("save")}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/projects")}
        >
          {t("cancel")}
        </Button>
      </div>
    </form>
  );
}
