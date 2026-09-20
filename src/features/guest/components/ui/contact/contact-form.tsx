"use client";

import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button, Chip, Field, Input, Text, Textarea } from "@/components/ui";
import { budgets, contactSchema, projectTypes } from "../../../schemas/contact";
import type { ContactValues } from "../../../schemas/contact";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "website",
      budget: "unsure",
      message: "",
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success(t("success"));
    reset();
  };

  const error = (key: keyof ContactValues) =>
    errors[key] ? t(`errors.${errors[key]?.message}`) : undefined;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Field label={t("name")} htmlFor="name" error={error("name")}>
          <Input
            id="name"
            variant="field"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>
        <Field label={t("email")} htmlFor="email" error={error("email")}>
          <Input
            id="email"
            type="email"
            variant="field"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
      </div>

      <Field label={t("projectType")}>
        <Controller
          control={control}
          name="projectType"
          render={({ field }) => (
            <div role="group" className="flex flex-wrap gap-2.5">
              {projectTypes.map((key) => (
                <Chip
                  key={key}
                  active={field.value === key}
                  onClick={() => field.onChange(key)}
                >
                  {t(`projectTypes.${key}`)}
                </Chip>
              ))}
            </div>
          )}
        />
      </Field>

      <Field label={t("budget")} optional={t("optional")}>
        <Controller
          control={control}
          name="budget"
          render={({ field }) => (
            <div role="group" className="flex flex-wrap gap-2.5">
              {budgets.map((key) => (
                <Chip
                  key={key}
                  active={field.value === key}
                  onClick={() => field.onChange(key)}
                >
                  {t(`budgets.${key}`)}
                </Chip>
              ))}
            </div>
          )}
        />
      </Field>

      <Field label={t("message")} htmlFor="message" error={error("message")}>
        <Textarea
          id="message"
          placeholder={t("messagePlaceholder")}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-5">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("sending") : t("submit")}
        </Button>
        <Text font="mono" size="2xs" tone="faint">
          {t("reply")}
        </Text>
      </div>
    </form>
  );
}
