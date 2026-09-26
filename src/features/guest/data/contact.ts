import { site } from "@/config/site";

export const contactInfo = [
  {
    key: "email",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    key: "github",
    value: site.github.label,
    href: site.github.url,
    external: true,
  },
  {
    key: "linkedin",
    value: site.linkedin.label,
    href: site.linkedin.url,
    external: true,
  },
] as const;
