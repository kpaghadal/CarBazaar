# CarBazaar

A React web app for buying and selling verified used cars. Login and Signup pages match the provided designs (colors, fonts, layout).

## Folder structure

```
CarBazaar/
├── public/                 # Static assets (e.g. car-hero.jpg)
├── src/
│   ├── assets/             # Images, fonts imported in code
│   ├── components/         # Reusable UI
│   │   ├── auth/           # AuthCard, CarHeroBlock
│   │   ├── CarIcon.jsx
│   │   └── Logo.jsx
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Route-level pages
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── services/           # API client, auth service
│   ├── styles/             # Global CSS, theme variables
│   ├── utils/              # Helpers, formatters
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

## Run

**Important:** All commands must be run from the **CarBazaar** folder (where `package.json` is), not from `react project`.

```bash
cd "d:\react project\CarBazaar"
npm install
npm run dev
```

Or double-click **run-dev.bat** in the CarBazaar folder to start the dev server.

Then open http://localhost:5173 (login) or http://localhost:5173/signup. Add a hero image as `public/car-hero.jpg` to show the car in the left panel.

## Design

- **Accent:** `#FF7A00`
- **Left panel (signup):** `#FDF9F6`  
- **Left panel (login):** `#FBF9F7`
- **Font:** Inter (fallback: system sans-serif)
