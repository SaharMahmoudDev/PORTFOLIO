"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/i18n/navigation";
import { Button, Field, Input, Text, Title } from "@/components/ui";
import { login } from "../../actions/login";
import { loginSchema } from "../../schemas/login";
import type { LoginValues } from "../../schemas/login";

export function LoginForm() {
  const t = useTranslations("admin.login");
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const error = (key: keyof LoginValues) =>
    errors[key] ? t(`errors.${errors[key]?.message}`) : undefined;

  const onSubmit = async (values: LoginValues) => {
    setFormError(null);
    const result = await login(values);
    if (!result.ok) {
      setFormError(t(`failure.${result.error}`));
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="w-full max-w-95 px-6">
      <Text font="mono" size="xs" tone="primary" className="mb-3">
        {t("eyebrow")}
      </Text>
      <Title as="h1" size="lg" className="mb-8">
        {t("title")}
      </Title>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <Field label={t("email")} htmlFor="email" error={error("email")}>
          <Input
            id="email"
            type="email"
            variant="field"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
        <Field
          label={t("password")}
          htmlFor="password"
          error={error("password")}
        >
          <Input
            id="password"
            type="password"
            variant="field"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
        </Field>

        {formError && (
          <Text font="mono" size="xs" tone="term-amber" role="alert">
            {formError}
          </Text>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full justify-center"
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
      </form>
    </div>
  );
}
