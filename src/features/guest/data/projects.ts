import type { ProjectLocaleContent } from "@/db/schema";

export const projectCategories = [
  "webApp",
  "dashboard",
  "ecommerce",
  "landing",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectStatus = "live" | "inProgress";

export type ProjectImage = {
  light: string;
  dark: string;
};

// Card-level fields, shared by every project regardless of locale.
export type ProjectItem = {
  key: string;
  name: string;
  url: string;
  demoUrl: string;
  repoUrl: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: string;
  tags: string[];
  image: ProjectImage;
};

// What guest-facing pages render: the card fields plus that project's
// content resolved to a single locale.
export type PublicProject = ProjectItem & ProjectLocaleContent;
