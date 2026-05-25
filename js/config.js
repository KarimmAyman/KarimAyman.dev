export const CONFIG = {
  sections: [
    { id: "hero", navLabel: null, dataKeys: ["meta", "social"], module: () => import("./sections/hero.js?v=1.5") },
    { id: "experience", navLabel: "Experience", dataKeys: ["experience", "certifications"], module: () => import("./sections/experience.js?v=1.5") },
    { id: "skills", navLabel: "Skills", dataKeys: "skills", module: () => import("./sections/skills.js?v=1.5") },
    { id: "projects", navLabel: "Projects", dataKeys: "projects", module: () => import("./sections/projects.js?v=1.5") },
    { id: "contact", navLabel: null, dataKeys: ["meta", "social"], module: () => import("./sections/contact.js?v=1.5") },
  ],
  features: {
    scrollProgress: true,
    scrollToTop: true,
    lazyVideos: true,
    themeToggle: true,
  },
};
