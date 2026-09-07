import type { Metadata } from "next";
import { AppProviders } from "@/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahar Mahmoud — Front-End Developer",
  description: "Portfolio of Sahar Mahmoud, front-end developer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
