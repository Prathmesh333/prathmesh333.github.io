# PrathameshOS · Curiosity edition

An interactive developer portfolio disguised as a bright personal workstation. Visitors can open draggable applications, browse all 34 public GitHub repositories, launch lightweight UI previews, run three flagship simulations, use a fake terminal, complete a coding challenge, and switch to a direct 30-second recruiter view.

## Highlights

- Desktop window manager with focus, stacking, minimize, maximize, close, drag, floating dock, and shareable deep links
- Keyboard command search (Ctrl/Cmd K) across apps, projects, and technologies
- Three wallpaper palettes and a saved motion preference
- Mobile OS adaptation with a touch app grid and full-screen applications
- Complete 34-repository catalog from [Prathamesh's public GitHub profile](https://github.com/Prathmesh333), including clearly labeled forks, learning work, and experiments
- Eight project categories with Featured and All Repositories views
- Reusable lightweight UI previews for research, AI products, developer tools, learning projects, mobile work, and experiments
- Interactive HQDE distributed-inference, VSFeed, and CanIPlay simulations
- Simulated terminal filesystem with professional Easter eggs and a secret-folder challenge
- Persistent achievements, unlocks, and appearance preferences via `localStorage`
- Recruiter Mode keeps profile, projects, research, skills, education, resume, and contact one click away
- Keyboard-visible focus, reduced-motion behavior, semantic controls, dialog focus containment, and 44px mobile targets
- Static-hosting support for Vercel, Netlify, and GitHub Pages

## Visual direction

The interface is a personal OS with warm paper surfaces, orange accents, a floating app dock, and tactile desktop files. An original silver-loop sculpture anchors the welcome window. Large editorial typography and illustrated project covers give the work room to breathe. The generation prompt and artwork path are recorded in `DESIGN-NOTES.md`.

## Public work catalog

The project configuration includes all 34 public repositories visible on September 1, 2026. They are classified as AI Research, AI Products, Developer Tools, Learning & Knowledge, Web & Platforms, Mobile & Immersive, Experiments & Foundations, or Open Source & Meta. Featured work is surfaced first, while forks and foundational exercises remain available and are labeled honestly.

## Tech stack

- React 19 and TypeScript
- Vite
- Lucide icons
- CSS variables, Grid, Flexbox, and lightweight CSS animation
- No backend and no runtime GitHub API dependency

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
├── apps/          Portfolio applications, terminal, and demos
├── components/    Reusable OS window chrome
├── data/          Profile, résumé facts, skills, and complete project catalog
├── StudioOS.tsx   Current desktop shell, routing, preferences, and window manager
├── types.ts       Shared application/window types
├── styles.css     Base application structure and preview skins
├── theme-light.css Base light application styling
└── studio-os.css  Curiosity edition tokens, shell, and responsive refinements
```

## Customize profile, resume, and contact

Edit `src/data/profile.ts` for public profile values. The verified application résumé lives at `public/resume/resume.pdf`, and the Resume application embeds that exact file. The contact address matches the latest supplied résumé.

## Add another project

Add one object to `src/data/projects.ts`. Keep the description factual, provide a public GitHub URL, choose one of the existing categories, and use the `evidence` field to state what was verified. Choose a `preview` family for its lightweight in-portfolio interface. Only add a `demo` value when a dedicated flagship simulation exists.

## Deep links

Routes such as `/projects`, `/research`, `/terminal`, `/about`, and `/contact` launch the relevant application. Vercel and Netlify rewrites are included. The GitHub Pages workflow also copies the built entry point to `404.html` so direct application URLs return to the client shell.

## Deployment

### Vercel

Import the repository. Vercel detects Vite; `vercel.json` supplies the SPA fallback.

### Netlify

Import the repository with build command `npm run build` and publish directory `dist`. `netlify.toml` supplies the fallback.

### GitHub Pages

Enable **Settings → Pages → Source → GitHub Actions** and push to `main`. The included workflow reads the Pages base path and builds `dist` for that path. Local, Netlify, and Vercel builds default to the domain root so nested app URLs resolve their scripts correctly.

## Accessibility and performance notes

The primary accessibility packet is keyboard/focus because custom window and overlay interactions are the highest-risk surface. The recruiter overlay traps and restores focus, all icon controls have names, and motion collapses under `prefers-reduced-motion`. Manual release checks should still cover keyboard traversal, VoiceOver/NVDA application naming, 320px reflow, 400% zoom, and long labels.

The interface uses no video, 3D engine, canvas dependency, backend, or runtime GitHub API request. The generated desktop illustration is delivered as a compressed WebP asset. Run `npm run build` for the current bundle report.

## Content integrity

Interactive demos are labeled simulations. The site does not invent employer history, email addresses, benchmark numbers, repository stars, or model results. Update facts in the data files when the public source changes.
