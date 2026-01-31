# Object Tracking Map (React + TypeScript)

An interactive React application that displays objects on a map, simulates their movement, and changes their status over time. Access to the app is protected by an API key. State is managed with MobX, the map is built with Leaflet/React‑Leaflet, and styling uses MUI and Tailwind CSS.

## Tech stack

- React 19, TypeScript, Vite 7
- MobX (`mobx`, `mobx-react-lite`)
- Leaflet + React‑Leaflet
- MUI (Material UI) + Tailwind CSS
- React Router 7

## Requirements

- Node.js 18+ (LTS recommended)
- npm 9+ or a compatible package manager

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root (next to `package.json`) based on `.env.example` and set your API key:

   ```env
   API_KEY=your_secret_key
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser (Vite will print the URL, typically `http://localhost:5173`). To sign in, use exactly the API key specified in `.env`.

Note: the entered key is stored in `localStorage` under the `apiKey` name. The logout button clears the key and the authentication state.

## npm scripts

- `npm run dev` — start development mode.
- `npm run build` — build to `dist` (TypeScript build + Vite build).
- `npm run preview` — preview the production build.
- `npm run lint` — run ESLint and TypeScript type checks.

## Environment variables

Supported variables are listed in `.env.example`:

```env
API_KEY=
```

Description:
- `API_KEY` — the string used for authentication in the sign‑in dialog. Enter it in the app to access the map.

In Vite, variables are available via `import.meta.env`. The key check is implemented in the `AuthDialog` component.

## Project structure (overview)

```
.
├─ public/                 # static assets
├─ src/
│  ├─ components/
│  │  ├─ AppHeader.tsx
│  │  ├─ AuthDialog.tsx    # sign-in dialog (compares with import.meta.env.API_KEY)
│  │  ├─ MapView.tsx       # toggles Empty/Filled map view by isAuthenticated
│  │  ├─ FilledMapView.tsx # map with markers, OSM tiles, updates subscription
│  │  ├─ EmptyMapView.tsx  # placeholder view for non‑authenticated state
│  │  ├─ MapMarker.tsx     # rendering of a single marker
│  │  └─ Sidebar.tsx       # sidebar
│  ├─ hooks/
│  │  └─ useMapObjectUpdater.ts # initialization and periodic update of objects
│  ├─ stores/
│  │  ├─ authStore.ts          # stores apiKey and authentication status
│  │  ├─ objectTrackerStore.ts # stores objects and their status on the map
│  │  └─ index.ts              # root store
│  ├─ router.tsx           # routing and auth guard
│  ├─ main.tsx             # entry point, MUI theme, RouterProvider
│  ├─ styles/              # styles (Tailwind)
│  └─ theme/               # MUI theme
├─ tailwind.config.js
├─ vite.config.ts
├─ tsconfig*.json
└─ README.md
```

## How it works

- Authentication
  - `AuthDialog.tsx` is shown if `rootStore.auth.isAuthenticated === false`.
  - When you enter the key, it’s compared to `import.meta.env.API_KEY`. If it matches, the key is saved to `localStorage` and access is granted.

- Map and objects
  - `FilledMapView.tsx` uses `useMapObjectUpdater`, which:
    - initializes ~100 objects around several geo points once;
    - slightly “moves” a subset of active objects every 5 seconds;
    - marks objects as “lost” when they haven’t been updated for a while and eventually removes them.
  - Data is stored in `ObjectTrackerStore` (MobX); computed lists `activeObjects` and `lostObjects` are exposed via getters.

## UI and styles

- MUI: global theme is located in `src/theme/`, base layout is built with MUI components (`Box`, `Button`, etc.).
- Tailwind: configured in `tailwind.config.js`, global styles in `src/styles/index.css`.

## Routing

- React Router 7 is used. In `router.tsx` the `AuthGuard` only allows authenticated users to access the primary layout.

## Code quality

- ESLint + `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.
- Prettier with plugins for Tailwind and import sorting.

## Troubleshooting

- “Can’t sign in”: make sure the `API_KEY` value in `.env` matches the key you enter. Restart `npm run dev` after changing `.env`.
- “Map doesn’t render”: check that Leaflet styles are imported in `src/main.tsx` — the line `import 'leaflet/dist/leaflet.css';`.
- “Weird styles”: clear the browser cache/remove `node_modules`, then run `rm -rf node_modules && npm install`.

## License

This project is for demonstration purposes. No license specified.
