import { create } from "zustand";
import type { ProjectCategory } from "./data/projects";

export type CategoryFilter = "all" | ProjectCategory;

type ProjectsFilterState = {
  category: CategoryFilter;
  query: string;
  setCategory: (category: CategoryFilter) => void;
  setQuery: (query: string) => void;
  reset: () => void;
};

export const useProjectsFilter = create<ProjectsFilterState>((set) => ({
  category: "all",
  query: "",
  setCategory: (category) => set({ category }),
  setQuery: (query) => set({ query }),
  reset: () => set({ category: "all", query: "" }),
}));
