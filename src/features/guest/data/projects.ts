export const projectCategories = [
  "webApp",
  "dashboard",
  "ecommerce",
  "landing",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectStatus = "live" | "inProgress";

export type ProjectItem = {
  key: string;
  category: ProjectCategory;
  status: ProjectStatus;
  tags: string[];
};

export const projects: ProjectItem[] = [
  {
    key: "metrics",
    category: "dashboard",
    status: "live",
    tags: ["Next.js", "TypeScript", "TanStack Query"],
  },
  {
    key: "storefront",
    category: "ecommerce",
    status: "live",
    tags: ["Next.js", "Tailwind", "Stripe"],
  },
  {
    key: "launch",
    category: "landing",
    status: "live",
    tags: ["Next.js", "Tailwind", "GSAP"],
  },
  {
    key: "tracker",
    category: "webApp",
    status: "inProgress",
    tags: ["Next.js", "TypeScript", "Zustand"],
  },
];
