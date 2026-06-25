# Knowledge Card

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.12-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Bun](https://img.shields.io/badge/Runtime-Bun-FBF0DF?style=for-the-badge&logo=bun&logoColor=black)](https://bun.sh)
[![MIT License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](./LICENSE)

> A **glassmorphism-styled personal author card** powered by the GitHub API, featuring WebGL animated backgrounds, Redux state caching, and a fully custom design token system.

> **Base** and **Theme** changable from settings page

---

## Features

| | Feature |
|---|---|
|   | **Live GitHub data** — avatar, name, bio, followers, following, repo link |
|   | **Redux caching** — fetched data is stored globally, no duplicate API calls |
|   | **Glassmorphism UI** — blurred glass surfaces, gradient strand animations via WebGL |
|   | **Micro‑animations** — hover lifts, color transitions powered by Motion & Anime.js |
|   | **Reusable components** — `Button` (primary / secondary / outline / ghost / soft / danger), `Strands`, `Footer` |
|   | **SPA routing** — React Router v7 with a custom animated 404 page |
|   | **Dark & light themes** — pure CSS custom‑property token system, zero JS needed |
|   | **Responsive** — mobile‑first, fluid layouts |

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 + TypeScript 6 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 + custom design tokens |
| State Management | Redux Toolkit 2 + React‑Redux |
| Routing | React Router DOM 7 |
| Icons | Lucide React |
| Animations | Motion, Anime.js, OGL (WebGL) |
| Package Manager | Bun / Npm |

---

##  Project Structure

```
knowledgeCard/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx      # Multi-variant reusable Button component
│   │   │   └── strands.jsx     # WebGL animated gradient strand background
│   │   └── footer.tsx          # App footer with navigation dock
│   ├── features/
│   │   └── userSlice.tsx       # Redux slice — GitHub user state
│   ├── hooks/
│   │   └── useGithub.tsx       # Custom hook — GitHub REST API fetcher
│   ├── pages/
│   │   ├── author.tsx          # Author profile card page
│   │   ├── home.tsx            # Landing page
│   │   ├── notFound.tsx        # 404 page
│   │   └── settings.tsx        # Settings page
│   ├── store/
│   │   └── store.ts            # Redux store setup
│   ├── App.tsx                 # Root component + route definitions
│   ├── main.tsx                # Entry point
│   ├── index.css               # Tailwind directives
│   └── tailwind.css            # Design tokens & component layer styles
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.app.json
```

---

## Design System

The app ships with a custom CSS design-token system built on top of Tailwind CSS.

**Themes:** `.dark` (default) · `.light`

**Tokens:**
```css
--bg  --fg  --surface  --surface-fg
--primary  --secondary  --success  --warning  --danger
--border  --ring
```

**Component classes:** `.btn` · `.card` · `.badge` · `.input` · `.modal`

**Mode modifiers:** `.glass` · `.clay` · `.mini`

---

## Customisation

To use your own GitHub profile, update the username in **`src/pages/author.tsx`**:

```tsx
const username = 'YOUR_GITHUB_USERNAME';
```

---

## License

MIT © [nishuR31](https://github.com/nishuR31)
