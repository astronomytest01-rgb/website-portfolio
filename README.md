# Anton Reva Portfolio

Personal portfolio website built with React, TypeScript, and Vite.

Figma source: `00EOD8HMfyToACJKeIOcDw`, main frame starts from node `492:943`.

## Run

```bash
npm install --cache .npm-cache
npm run dev
npm run build
npm run preview
```

Local dev server uses `127.0.0.1`; Vite normally opens on `http://127.0.0.1:5173/`.

## Project Structure

- `src/App.tsx` - page structure, sections, cards, interactive behavior, and image imports.
- `src/content.ts` - editable profile text, CTA labels, links, tags, case study copy, and project metadata.
- `src/styles.css` - layout, typography, responsive rules, themes, animations, and visual styling.
- `src/main.tsx` - React app entry point.
- `src/assets/` - production images, SVG marks, avatars, case study graphics, and project previews.
- `public/` - static files that must be served as-is.
- `dist/` - generated production build output; do not edit manually.

## Assets

Keep all site images used by React/CSS in `src/assets/` and import them with:

```ts
new URL("./assets/file-name.png", import.meta.url).href
```

This lets Vite fingerprint files and generate correct paths for deployment.

Current important assets include:

- `avatar-anton.png`
- `orange-pixel-mark-16.svg`
- `tax-intake-card-bg.jpg`
- `tax-intake-mini-bg.jpg`
- `tax-questionnaire-card.png`
- `filter-case-bg.png`
- `filter-case-visual.png`
- `project-gigradar.png`
- `project-halyk-invest.png`
- `project-rikkyhype.png`
- `project-dovody.png`

Large source/reference files can stay outside the app, but optimized production versions should be copied into `src/assets/`.

## Styling Notes

- The current visual baseline uses Montserrat across the site.
- The layout uses rem-based sizing and responsive media queries.
- The left sidebar is sticky on desktop and becomes static on smaller screens.
- Light/dark theme state is stored in `localStorage`.
- Case study sections currently use local image assets plus CSS overlays.

## Deployment

Build the site with:

```bash
npm run build
```

Deploy the generated `dist/` folder. Do not deploy `src/` directly unless the hosting platform runs the Vite build step.
