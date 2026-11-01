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

export type PublicProject = ProjectItem & ProjectLocaleContent;
