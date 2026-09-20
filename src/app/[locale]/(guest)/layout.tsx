import type { ReactNode } from "react";
import { PublicLayout } from "@/components/template";

export default function GuestLayout({ children }: { children: ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
