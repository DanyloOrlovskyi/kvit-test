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

2. Create a `.env` file in the project root (next to `package.json`) and set your API key (optional for demo):

   ```env
   VITE_API_KEY=your_secret_key
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser (Vite will print the URL, typically `http://localhost:5173`). If `VITE_API_KEY` is set, enter exactly this value in the sign‑in dialog.

Note: the entered key is stored in `localStorage` under the `apiKey` name. The logout button clears the key and the authentication state.

## npm scripts

- `npm run dev` — start development mode.
- `npm run build` — build to `dist` (TypeScript build + Vite build).
- `npm run preview` — preview the production build.
- `npm run lint` — run ESLint and TypeScript type checks.

## Environment variables

Supported variables (create `.env` in the project root):

```env
VITE_API_KEY=
```

Description:

- `VITE_API_KEY` — the string used for authentication in the sign‑in dialog. Enter it in the app to access the map.

In Vite, variables are available via `import.meta.env`. The key is validated in the MobX auth store (`AuthStore.checkApiKey`) using `import.meta.env.VITE_API_KEY`, and the flow is wired to the UI via `pages/AuthPage.tsx` and `routes/ProtectedRoute.tsx`.

## Project structure

```
.
├─ public/                      # static assets
├─ src/
│  ├─ App.tsx                   # root application component
│  ├─ assets/                   # optional static assets for bundling
│  ├─ components/
│  │  ├─ ActiveObjectItem.tsx   # list item for active objects
│  │  ├─ AppHeader.tsx          # app header
│  │  ├─ LostObjectItem.tsx     # list item for lost objects
│  │  ├─ MapMarker.tsx          # renders a single marker on the map
│  │  ├─ Sidebar.tsx            # sidebar
│  │  └─ index.tsx              # barrel export of components
│  ├─ hooks/
│  │  ├─ useCurrentTime.ts      # current time hook
│  │  └─ useMapObjectUpdater.ts # initialization and periodic updates of objects
│  ├─ interfaces/               # domain model types/interfaces
│  │  ├─ auth.types.ts
│  │  ├─ map.types.ts
│  │  └─ index.ts
│  ├─ layouts/
│  │  └─ AppLayout.tsx          # main layout (header + sidebar + content)
│  ├─ pages/
│  │  ├─ AuthPage.tsx           # API key input page
│  │  ├─ MapPage.tsx            # main page with map/content
│  │  └─ NotFoundPage.tsx       # 404
│  ├─ routes/
│  │  └─ ProtectedRoute.tsx     # route guard for authentication check
│  ├─ stores/
│  │  ├─ authStore.ts           # authentication state
│  │  ├─ objectTrackerStore.ts  # objects and their statuses on the map
│  │  ├─ sidebarStore.ts        # sidebar state
│  │  └─ index.ts               # root store (exports store/provider)
│  ├─ styles/
│  │  ├─ App.css                # base app styles
│  │  └─ index.css              # global styles
│  ├─ theme/
│  │  └─ theme.ts               # MUI theme
│  ├─ types/
│  │  └─ mui.d.ts               # MUI type augmentations
│  ├─ constants.ts              # application constants
│  └─ main.tsx                  # entry point; mounts theme and router
├─ vite.config.ts
├─ tsconfig*.json
└─ README.md
```

## How it works

- Authentication
  - `authStore.ts` holds the login state in the `isAuthenticated` field.
  - The API key is validated by `checkApiKey`, which compares the entered value with `import.meta.env.VITE_API_KEY`.
  - On success, a login marker is saved to `localStorage` (`apiKey: 'true'`); on logout it is removed.
  - The UI uses `routes/ProtectedRoute.tsx` to restrict access to protected pages (e.g., `MapPage`). `pages/AuthPage.tsx` renders the key input form.

- Map and objects
  - Initialization and periodic updates of data are handled in the `useMapObjectUpdater` hook.
  - A subset of active objects “moves” periodically; stale ones are marked as "lost" and later removed.
  - Data is stored in `objectTrackerStore.ts` (MobX); it exposes lists of active and lost objects.

## UI and styles

- MUI: global theme — `src/theme/theme.ts`; layout built with `AppLayout.tsx` and MUI components (`Box`, `Button`, etc.).

## Routing

- React Router 7 is used. Private route access is controlled by `routes/ProtectedRoute.tsx`.
- Main layout — `layouts/AppLayout.tsx`; pages are located in `src/pages/`.

## Code quality

- ESLint + `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.
- Prettier.

## Troubleshooting

- “Can’t sign in”: make sure the `VITE_API_KEY` value in `.env` matches the key you enter. Restart `npm run dev` after changing `.env`.
- “Map doesn’t render”: check that Leaflet styles are imported in `src/main.tsx` — the line `import 'leaflet/dist/leaflet.css';`.
- “Weird styles”: clear the browser cache/remove `node_modules`, then run `rm -rf node_modules && npm install`.

## License

This project is for demonstration purposes. No license specified.
