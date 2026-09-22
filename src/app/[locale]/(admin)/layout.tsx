import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { Container, Logo } from "@/components/ui";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-hairline border-b">
        <Container className="flex h-16 items-center">
          <Link href="/" className="hover:text-foreground transition-colors">
            <Logo />
          </Link>
        </Container>
      </header>
      <main className="flex flex-1 items-center justify-center">
        {children}
      </main>
    </div>
  );
}
