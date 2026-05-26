# Portfolio — CONTEXT.md

> **For any AI assistant, new contributor, or future Karim:**
> Read this file before touching any code. Everything you need to understand this project is here.

---

## 🗂️ What This Project Is

A **fully data-driven personal portfolio website** built with:
- Vanilla HTML + JavaScript ES Modules (no React, no Vue, no framework runtime)
- Tailwind CSS (compiled via CLI, not CDN)
- Deployed on GitHub Pages

The key principle: **all content lives in `js/data.js`. The UI reads from it and renders itself.**

---

## 📁 File Structure

```
MyPortfolio/
├── index.html                  ← Shell HTML — no content, just wrappers
├── package.json                ← Only one dep: tailwindcss
├── tailwind.config.js          ← Tailwind custom theme (brand colors, dark palette)
├── src/
│   └── input.css               ← Tailwind directives (@tailwind base/components/utilities)
├── dist/
│   └── output.css              ← Compiled + minified CSS (do NOT edit manually)
├── images/                     ← All images in WebP format at 3 sizes (400/800/1200w)
├── AounVideos/                 ← MP4 demo videos for the Aoun project
└── js/
    ├── data.js                 ← ★ THE SINGLE SOURCE OF TRUTH — all content here
    ├── config.js               ← Section registry + feature flags
    ├── main.js                 ← Orchestrator: meta tags, schema, nav, render pipeline
    ├── sections/
    │   ├── hero.js             ← Hero section renderer
    │   ├── experience.js       ← Timeline section renderer
    │   ├── skills.js           ← Skills grid renderer
    │   ├── projects.js         ← Project cards + featured showcase renderer
    │   └── contact.js          ← Contact cards + social links renderer
    └── managers/
        ├── theme.js            ← ThemeManager + PerformanceOptimizer (self-init)
        ├── lazyVideo.js        ← LazyVideoLoader class (self-init)
        ├── navbar.js           ← NavbarManager + SmoothScrollManager (self-init)
        ├── mobileMenu.js       ← Mobile drawer (self-init)
        ├── scrollProgress.js   ← Top progress bar (self-init)
        └── scrollToTop.js      ← Floating scroll-to-top button (self-init)
```

---

## 🧠 Core Architecture Pattern

### The Render Pipeline (`main.js`)

```
1. Read PORTFOLIO from data.js
2. Inject all <meta> tags (SEO, OG, Twitter, theme-color)
3. Inject Schema.org JSON-LD <script>
4. Build nav links from config.js
5. For each section in config.js:
   - Dynamic import() the section module
   - Call module.default(appContainer, sectionData)
6. After all sections render:
   - Initialize AOS animations
   - Dynamic import() all enabled feature managers
```

**Sections render in parallel** via `Promise.all()`, then append to `#app` in order.

### Idempotent Guard (every section)

Every section starts with:
```js
if (container.querySelector('#hero')) return;
```
This prevents any section from double-rendering if the render pipeline runs twice.

### Self-Initializing Managers (every manager)

Every manager file contains at the bottom:
```js
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new MyManager());
} else {
  new MyManager(); // DOM already ready
}
```
You can drop a manager into the project and it works — no external bootstrap code needed.

---

## ✏️ HOW TO EDIT CONTENT (The Only File You Need)

> **`js/data.js` is the only file you need to touch for content changes.**

### Change personal info / bio / title
```js
meta: {
  name:    "Karim Ayman",
  title:   "Full Stack Developer — ...",
  bio:     "Your bio here",
  email:   "your@email.com",
  phone:   "...",
  cvUrl:   "https://...",
  availableForHire: true,   // ← controls the green badge on hero
  stats: [
    { value: "50+", label: "Students Taught" },  // ← add/remove stats here
  ],
}
```

### Add / remove a skill
```js
skills: {
  Backend: [
    { name: "ASP.NET Core", icon: "fas fa-server" },
    { name: "YourNewSkill", icon: "fas fa-code" },  // ← just add this line
  ],
  // Add a whole new category:
  "New Category": [
    { name: "Skill", icon: "fas fa-star" },
  ],
}
```
The `skills.js` renderer loops over `Object.keys(data)` — new categories appear automatically.

### Add a new experience / job
```js
experience: [
  {
    type:        "work",          // "work" = briefcase icon | "education" = cap icon
    period:      "2025 – Present",
    role:        "My Role",
    company:     "Company Name",
    description: "What I did...",
    tech:        ["React.js", "Node.js"],  // optional — renders as tags
  },
]
```

### Add a certification
```js
certifications: [
  { issuer: "My Issuer", detail: "What I learned and delivered" },
]
```

### Add a project card
```js
projects: [
  {
    id:          "myproject",         // ← unique ID, used for CSS theming
    title:       "My Project",
    label:       "LABEL TEXT",        // ← shown overlaid on the image
    tags:        ["Tag1", "Tag2"],
    image:       "./images/myproject-800.webp",  // ← null = styled placeholder
    role:        "My Role",           // ← optional
    description: "Description...",
    tech:        ["React.js", "Node.js"],
    links: [
      { label: "View Live", url: "https://...", icon: "fas fa-external-link-alt" },
    ],
    videos:   [],       // ← for featured project video demos
    featured: false,    // ← true = full-width card with video section
  },
]
```

**Add a color theme for your project** in `js/sections/projects.js`:
```js
const projectStyles = {
  myproject: {
    shadow:    "dark:hover:shadow-red-500/20",
    gradient:  "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20",
    text:      "text-red-600 dark:text-red-400",
    badgeBg:   "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 ...",
    accentText:"text-red-700 dark:text-red-300",
    buttonBg:  "bg-gradient-to-r from-red-500 to-red-600 ...",
    borderBtn: "border-red-500 dark:border-red-400 ...",
  },
}
```
If no style is defined, `defaultStyle` is used automatically.

---

## 🧩 HOW TO ADD A NEW SECTION

**Step 1:** Create `js/sections/mysection.js`:
```js
export default function render(container, data) {
  if (container.querySelector('#mysection')) return; // idempotent guard

  const section = document.createElement('section');
  section.id = 'mysection';
  section.innerHTML = `...`;
  container.appendChild(section);
}
```

**Step 2:** Register it in `js/config.js`:
```js
{ id: "mysection", navLabel: "My Section", dataKeys: "mydata", module: () => import("./sections/mysection.js?v=1.5") }
```

**Step 3:** Add the data key to `js/data.js`:
```js
mydata: { ... }
```

That's it. Nav link appears, section renders, data flows in.

---

## 🖼️ Images

All project images follow this naming convention:
```
images/
  projectname.png        ← original source
  projectname.webp       ← base WebP
  projectname-400.webp   ← mobile size
  projectname-800.webp   ← ★ use this in data.js (reference)
  projectname-1200.webp  ← large desktop size
```

In `data.js`, always reference the `-800.webp` version:
```js
image: "./images/myproject-800.webp"
```

The renderer auto-generates the `srcset` with all 3 sizes:
```js
const img400  = baseImg.replace("-800", "-400");
const img800  = baseImg;
const img1200 = baseImg.replace("-800", "-1200");
```

---

## ⚡ Performance Decisions

| Decision | Why |
|----------|-----|
| No framework | Zero runtime overhead, no virtual DOM, no hydration |
| ES Module `import()` | Native code splitting — sections load in parallel, on demand |
| `srcset` + WebP + 3 sizes | Browser downloads only the exact size it needs |
| `fetchpriority="high"` on hero image | Prioritizes the LCP element for Core Web Vitals |
| `loading="lazy"` on all other images | Defers off-screen images |
| `preload="metadata"` on videos | Only metadata fetched — no video data until user clicks |
| LazyVideoLoader class | Videos not loaded at all until user interaction |
| Tailwind CLI `--minify` | Only used classes shipped, zero unused CSS |
| `?v=1.5` on all imports | Cache busting — bump version when deploying updates |

---

## 🔍 SEO System (`main.js`)

All SEO is injected programmatically from `data.js`. To update SEO, edit `PORTFOLIO.seo`:

```js
seo: {
  description:   "...",
  keywords:      "...",
  ogImage:       "https://...webp",
  twitterHandle: "@handle",
  canonicalUrl:  "https://...",
  siteName:      "...",
  locale:        "en_US",
}
```

**What gets injected automatically:**
- `<meta name="description">`
- `<meta name="keywords">`
- `<meta name="theme-color">` (updates on dark mode toggle too)
- `<meta property="og:title/description/image/url/site_name/locale">`
- `<meta name="twitter:card/creator/title/description/image">`
- `<link rel="canonical">`
- Schema.org `Person` JSON-LD (full structured data for Google)

---

## 🌙 Dark Mode System (`managers/theme.js`)

**Layer 1 — System preference on first load:**
```js
window.matchMedia("(prefers-color-scheme: dark)").matches
// → adds "dark" class to <html> if no localStorage value exists
```

**Layer 2 — User override persisted:**
```js
localStorage.setItem("theme", "dark" | "light");
```

**Layer 3 — Live OS preference change:**
```js
window.matchMedia("...").addEventListener("change", ...)
// → updates instantly without page reload, but only if user hasn't overridden
```

**Layer 4 — Meta theme-color updates:**
```js
// Light: #06b6d4   Dark: #030712
```

**Layer 5 — Smooth transition:**
```js
document.documentElement.style.transition = "background-color 0.3s ease";
// Removed after 300ms — no performance cost during normal scroll
```

---

## 🎥 Video System (`managers/lazyVideo.js`)

### State
```js
this.loadedVideos  = new Set();  // O(1) lookup
this.loadingVideos = new Set();  // prevents double-load
```

### Load lifecycle
```
User clicks container
  → check loadedVideos (toggle play/pause if loaded)
  → check loadingVideos (bail if already loading)
  → loadVideo():
      show spinner
      create <video> + <source> programmatically
      listen for: loadedmetadata → auto-play
                  error         → auto-retry once after 2s, then show error state
                  play          → hide overlay
                  pause/ended   → show play button
```

### Preloading strategies
- **Interaction-triggered:** first user click/scroll/keydown → preload first video container after 1s delay
- **IntersectionObserver:** when container is 50% visible AND user is hovering/focusing → preload
- **Sequential queue:** after first interaction, background queue preloads all containers, staggered 3s apart

### Keyboard shortcuts (when video is loaded)
| Key | Action |
|-----|--------|
| K or Space | Play / Pause |
| ← | Seek back 10s |
| → | Seek forward 10s |
| ↑ | Volume +10% |
| ↓ | Volume -10% |
| M | Mute toggle |
| F | Fullscreen |

### Analytics
Fires `gtag('event', 'video_play', ...)` if Google Analytics (`gtag`) is present on page.

---

## 🧭 Navbar System (`managers/navbar.js`)

**NavbarManager** — throttled scroll handler (100ms):
- Adds `.scrolled` class when `scrollY > 10` (triggers blur/shadow via CSS)
- Adds `.scroll-down` / `.scroll-up` class for hide-on-scroll behavior
- Ignores scroll while mobile menu is open

**SmoothScrollManager** — all `<a href="#...">` links:
- Intercepts click, calls `window.scrollTo({ behavior: 'smooth' })`
- Accounts for navbar height (56px mobile / 80px desktop)

---

## ♿ Accessibility

| Feature | Implementation |
|---------|---------------|
| Reduced motion | `prefers-reduced-motion` → adds `.reduce-motion` to `<html>`, disables AOS |
| Video keyboard nav | Full shortcut set (see Video System above) |
| Video ARIA | `tabindex="0"`, `role="button"`, `aria-label` on all containers |
| Image alt text | All images have descriptive `alt` attributes |
| External links | All use `rel="noopener noreferrer"` |
| AOS | `once: true` — animations fire once, no repeat performance cost |

---

## 🛠️ Dev Commands

```bash
# Watch mode (rebuilds CSS on save)
npm run dev

# Production build (minified CSS)
npm run build
```

> After editing `data.js` or any JS file, just save — no build step needed for JS (ES Modules load directly).
> Only run `npm run build` after adding new Tailwind classes.

---

## 🔄 Cache Busting

All module imports use a version query string:
```js
import('./sections/hero.js?v=1.5')
```
When deploying, bump `1.5` → `1.6` in:
- `js/config.js` (all section imports)
- `js/main.js` (all manager imports)

This forces browsers to re-download updated files, ignoring stale cache.

---

## 📐 Tailwind Config

Custom tokens defined in `tailwind.config.js`:
- `brand-*` — primary cyan color scale
- `dark-*` — custom dark mode background scale (dark-50 → dark-900)
- Dark mode: `class` strategy (toggled via `dark` class on `<html>`)

---

## 🚨 Error Handling (Dev Only)

`main.js` catches two types of failures and renders a full-screen styled error overlay:

1. **Global JS runtime errors** — `window.addEventListener('error', ...)`
2. **Section module load failures** — `reportError(title, message, stack)`

The overlay shows the error message, source file, line number, and column. Only visible during development — in production, errors are silent to the user.

---

## 📋 Quick Reference — Where Is What?

| I want to change... | Edit this file |
|---------------------|----------------|
| My name, bio, email, phone, CV link | `js/data.js` → `meta` |
| Hero stats (50+ students, etc.) | `js/data.js` → `meta.stats` |
| SEO keywords / description / OG image | `js/data.js` → `seo` |
| Social links | `js/data.js` → `social` |
| Skills list | `js/data.js` → `skills` |
| Work experience / education | `js/data.js` → `experience` |
| Certifications | `js/data.js` → `certifications` |
| Projects | `js/data.js` → `projects` |
| Which sections appear + in what order | `js/config.js` → `sections` |
| Which features are enabled | `js/config.js` → `features` |
| Project card color theme | `js/sections/projects.js` → `projectStyles` |
| Skills category color theme | `js/sections/skills.js` → `categoryStyles` |
| Tailwind custom colors | `tailwind.config.js` |
| Global CSS + animations | `src/input.css` |
