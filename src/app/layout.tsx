import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahar Mahmoud — Front-End Developer",
  description: "Portfolio of Sahar Mahmoud, front-end developer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
