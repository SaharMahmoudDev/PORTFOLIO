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
  year: string;
  tags: string[];
};

export const projects: ProjectItem[] = [
  {
    key: "metrics",
    category: "dashboard",
    status: "live",
    year: "2025",
    tags: ["Next.js", "TypeScript", "TanStack Query"],
  },
  {
    key: "storefront",
    category: "ecommerce",
    status: "live",
    year: "2025",
    tags: ["Next.js", "Tailwind", "Stripe"],
  },
  {
    key: "launch",
    category: "landing",
    status: "live",
    year: "2025",
    tags: ["Next.js", "Tailwind", "GSAP"],
  },
  {
    key: "tracker",
    category: "webApp",
    status: "inProgress",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Zustand"],
  },
];

export function getProject(key: string) {
  return projects.find((project) => project.key === key);
}

export function getNextProject(key: string) {
  const index = projects.findIndex((project) => project.key === key);
  return projects[(index + 1) % projects.length];
}
