# Prathamesh Nikam portfolio

This repository powers [prathmesh333.github.io](https://prathmesh333.github.io/). It is a static GitHub Pages site with no build step.

The site is designed as a personal editorial portfolio: Prathamesh's name and current focus come first, followed by four selected projects, a short background section, the full project archive and direct contact links. Jet black, warm ivory and papaya orange carry the visual identity. One animated orange line connects the late-night notebook artwork to the rest of the page.

Project descriptions are tied to the public repositories. Architecture-only, simulated-data and resume-only work is labeled instead of being presented as a finished deployment.

## What is included

- Four featured projects: ShortList'd, ForecastForge, HQDE and PsychoTA
- Search and category filters across 15 projects
- Project notes in an accessible dialog
- Education, Teaching Assistant experience and the TRACE hackathon win
- The current resume, GitHub and LinkedIn links
- Anime.js letter choreography, line drawing, reveals and project-cover motion
- Lenis scrolling with reduced-motion support
- A generated editorial workbench hero image
- Keyboard navigation, visible focus states and responsive layouts

## Run locally

```powershell
python -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

## Update the projects

The `projects` array at the top of [`script.js`](script.js) is the source for the archive, filters, search and project dialog. Add or update project facts there.

The four featured projects are written in [`index.html`](index.html). The downloadable resume is [`Prathamesh_Nikam_Resume.pdf`](Prathamesh_Nikam_Resume.pdf).

## Visual assets

The current hero uses [`assets/generated/hero-workbench.webp`](assets/generated/hero-workbench.webp). Its final prompt is recorded in [`assets/ASSET-PROMPTS.md`](assets/ASSET-PROMPTS.md). The four featured covers are generated in the browser as SVG, which lets Anime.js draw their paths without adding more image weight.

## Libraries

- [Anime.js](https://animejs.com/) for orchestrated motion
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling

## Quick checks

```powershell
node --check script.js
git diff --check
```
