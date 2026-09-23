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

function image(key: string): ProjectImage {
  return {
    light: `/images/projects/${key}-light.jpg`,
    dark: `/images/projects/${key}-dark.jpg`,
  };
}

export const projects: ProjectItem[] = [
  {
    key: "real-estate-hub",
    name: "Real Estate Hub",
    url: "realestatehubteam.netlify.app",
    demoUrl: "https://realestatehubteam.netlify.app/",
    repoUrl: "https://github.com/SaharMahmoudDev/REAL-ESTATE-HUB-TEAM",
    category: "webApp",
    status: "inProgress",
    year: "2026",
    tags: ["React", "TanStack Query", "MUI", "Framer Motion"],
    image: image("real-estate-hub"),
  },
  {
    key: "renova",
    name: "Renova",
    url: "renova-for-e-commerce.netlify.app",
    demoUrl: "https://renova-for-e-commerce.netlify.app/",
    repoUrl: "https://github.com/SaharMahmoudDev/E-commerce-Renova",
    category: "ecommerce",
    status: "live",
    year: "2025",
    tags: ["HTML5", "CSS3", "JavaScript", "REST API"],
    image: image("renova"),
  },
  {
    key: "dolistix",
    name: "DoListix",
    url: "dolistix.netlify.app",
    demoUrl: "https://dolistix.netlify.app/",
    repoUrl: "https://github.com/SaharMahmoudDev/DoListix-react",
    category: "webApp",
    status: "inProgress",
    year: "2025",
    tags: ["React", "Formik", "Fuse.js", "Bootstrap"],
    image: image("dolistix"),
  },
  {
    key: "user-dashboard",
    name: "User Management Dashboard",
    url: "user-managemen-dashboard.netlify.app",
    demoUrl: "https://user-managemen-dashboard.netlify.app/",
    repoUrl: "https://github.com/SaharMahmoudDev/AfaaqWare-Crud-Api",
    category: "dashboard",
    status: "live",
    year: "2026",
    tags: ["Next.js", "TanStack Query", "Axios", "TypeScript"],
    image: image("user-dashboard"),
  },
  {
    key: "dashboard",
    name: "Dashboard UI",
    url: "dashproject.netlify.app",
    demoUrl: "https://dashproject.netlify.app/",
    repoUrl: "https://github.com/SaharMahmoudDev/DashProject",
    category: "dashboard",
    status: "live",
    year: "2025",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: image("dashboard"),
  },
  {
    key: "kasper",
    name: "Kasper",
    url: "kasperproject.netlify.app",
    demoUrl: "https://kasperproject.netlify.app/",
    repoUrl: "https://github.com/SaharMahmoudDev/KasperProject",
    category: "landing",
    status: "live",
    year: "2025",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: image("kasper"),
  },
  {
    key: "elzero",
    name: "Elzero-Inspired UI",
    url: "projectelzero.netlify.app",
    demoUrl: "https://projectelzero.netlify.app/",
    repoUrl: "https://github.com/SaharMahmoudDev/ElzeroProject",
    category: "landing",
    status: "live",
    year: "2025",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: image("elzero"),
  },
  {
    key: "leno",
    name: "Leno",
    url: "firstlenoproject.netlify.app",
    demoUrl: "https://firstlenoproject.netlify.app/",
    repoUrl: "https://github.com/SaharMahmoudDev/FirstLenoProject",
    category: "landing",
    status: "live",
    year: "2025",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: image("leno"),
  },
];

export function getProject(key: string) {
  return projects.find((project) => project.key === key);
}

export function getNextProject(key: string) {
  const index = projects.findIndex((project) => project.key === key);
  return projects[(index + 1) % projects.length];
}
