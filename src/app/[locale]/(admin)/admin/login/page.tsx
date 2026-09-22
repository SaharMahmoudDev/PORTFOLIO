import { setRequestLocale } from "next-intl/server";
import { LoginForm } from "@/features/admin";

export default async function AdminLoginPage({
  params,
}: PageProps<"/[locale]/admin/login">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LoginForm />;
}
