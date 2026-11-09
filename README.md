# Sanjai Kumar M | Portfolio v3

An immersive developer portfolio built with React 19, Vite 8, Motion and Lenis. Requires Node.js 20.19 or newer.

## Highlights

- Intro preloader with letter-by-letter name reveal (once per visit)
- Interactive 3D globe in the hero with animated flight routes from Chennai. Drag to spin
- Custom cursor that grows and shows "View" over projects
- About paragraph that lights up word by word as you scroll
- Interactive flight search demo
- Pinned horizontal project gallery driven by vertical scroll, with 3D tilt cards and an expanding details view
- Scroll-linked experience timeline, tabbed skills
- Giant parallax "Let's talk" contact section with a magnetic email button
- Hide-on-scroll navigation, full-screen animated menu on mobile
- Dark and light themes, reduced-motion support, keyboard accessible

## Run locally

```bash
npm install
npm run dev
```

## Edit content

Everything lives in `src/data.js`: profile, stats, projects, experience, skills and the globe routes. Add your GitHub URL to `profile.github`. Replace `public/Sanjai_Kumar_M_Resume.pdf` to update the resume.

## Contact form

Uses Formspree; without a form ID it opens the visitor's email app instead.

1. Create a free form at https://formspree.io
2. Copy `.env.example` to `.env` and set `VITE_FORMSPREE_ID`
3. Never commit `.env` (it is in `.gitignore`) and never paste keys or IDs into the code

## Deploy on Vercel

1. Push this folder to a GitHub repository
2. On https://vercel.com choose Add New Project and import it (Vite is detected automatically)
3. Add `VITE_FORMSPREE_ID` under Environment Variables
4. Deploy. Every push to `main` redeploys
