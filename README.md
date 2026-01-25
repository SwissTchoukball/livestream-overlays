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

Build the application for production:

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

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
