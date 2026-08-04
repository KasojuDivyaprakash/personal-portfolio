# Manoj Portfolio

A premium dark portfolio website built with React, TypeScript, Tailwind CSS, Framer Motion, and Vite.

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

### GitHub Pages

1. Create a GitHub repository.
2. Run:

```bash
npm run build
```

3. Upload the contents of the dist folder to the repository or configure a static hosting workflow.

### Vercel

1. Import the repository into Vercel.
2. Set the build command to `npm run build`.
3. Deploy.

## Updating content

- Update personal details in `src/constants/content.ts`.
- Update projects in the same file.
- Replace the placeholder GitHub link in `src/constants/content.ts` when ready.
- Add a real resume PDF to the public folder and update the download link in `src/App.tsx`.
