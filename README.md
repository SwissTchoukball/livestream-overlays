# Livestream overlays

This generates overlays for livestreams of Swiss Tchoukball matches.

This is build with [Nuxt](https://nuxt.com/).

## Setup

Make sure to install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the SPA for production:

```bash
npm run generate
```

Build for a distinct base path:

```bash
NUXT_APP_BASE_URL=/livestream-overlays/ npm run generate
```

Locally preview production build:

```bash
npm run preview
```

## Deployment

Deployment to the Infomaniak server is handled by a GitHub Actions workflow (see `.github/workflows/deploy.yml`).

The workflow is split into two parts:

1. **Build** — triggered automatically on every push to `main`
   - Generates the static site with `NUXT_APP_BASE_URL=/livestream-overlays/`
   - Stores the output as a workflow artifact

2. **Deploy** — triggered **manually** from the GitHub Actions UI
   - Downloads the latest build artifact
   - Syncs the contents of `.output/public/` to the server via `rsync --delete`

### Deploying manually

Go to **Actions → "Build and Deploy to Infomaniak"** in GitHub, then click **Run workflow**.

The app is deployed to the server at https://site.tchoukball.ch/livestream-overlays/.
