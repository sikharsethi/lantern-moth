# 🦋 Lantern Moth

A calm, atmospheric night-garden survival game for the browser. Guide a glowing moth through the dark, keep your light alive, and uncover the garden's stories.

[![Play now](https://img.shields.io/badge/play-live%20demo-f5c26b?style=for-the-badge)](https://lantern-moth-iota.vercel.app)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Canvas](https://img.shields.io/badge/HTML5-Canvas-E34F26?style=for-the-badge&logo=html5&logoColor=white)

**▶ Play it here: [lantern-moth-iota.vercel.app](https://lantern-moth-iota.vercel.app)**

<!--
Add screenshots here once you have them, for example:
![Menu](docs/screenshots/menu.png)
![Gameplay](docs/screenshots/gameplay.png)
-->

---

## About

Your moth's light is always fading. Collect glowing orbs to refill it, chain them into combos, and slip past bats, thorns, spiders and wandering Shades. The longer you survive, the harder the night becomes, with storms, bosses and a growing garden to restore along the way.

Everything is drawn and heard in code. There are no image or audio files: all visuals are rendered on an HTML5 Canvas, and all music and sound effects are synthesised with the Web Audio API.

## Features

**Gameplay**
- Endless survival with a steadily rising difficulty curve and three modes: Calm, Normal and Fierce
- Combo system with a multiplier up to ×5
- Enemies: bats, falling thorns, spiders on threads, and Shades that hunt your light
- Two bosses that alternate: the **Great Gray Moth** and the **Weaver**
- Events: Golden Hour (double score), firefly trails, thunderstorms, and a short breather after each boss
- Power-ups: shield, magnet, slow time, lantern burst, and a companion summon
- Dash move with a cooldown

**Progression**
- **Skins** (some with perks), **wing trails** and **companions** (Helper moth, Firefly, Owl, Beetle)
- **Eight permanent upgrades**, each with three levels
- **Restore the garden:** spend dust to bring back lanterns, flowers and glowing plants that appear in the scene and give small bonuses
- Achievements, 12 unlockable story entries, and daily goals
- **Tonight's lantern:** a daily challenge seeded from the date, so everyone gets the same night

**Experience**
- Slow, ambient generated music and soft sound effects, with separate volume sliders
- Works on desktop, tablets and phones, with drag and touch controls
- A Calm motion option (enabled automatically when the device asks for reduced motion)
- Progress saved locally, with a copy-and-paste save code for moving between devices

## Controls

| Action | Desktop | Mobile |
| --- | --- | --- |
| Move | Mouse, `WASD` or arrow keys | Drag a finger |
| Dash | `Space` | Double-tap |
| Pause | `P` or `Esc` | Pause button |

## Getting started

**Requirements:** [Node.js](https://nodejs.org) 20.19+ or 22.12+ (the current LTS is recommended) and npm.

```bash
git clone https://github.com/sikharsethi/lantern-moth.git
cd lantern-moth/lantern-moth   # the game lives in the inner folder
npm install
npm run dev
```

Open the address printed in the terminal (usually `http://localhost:5173`).

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Type-checks with `tsc` and produces a production build in `dist/` |
| `npm run preview` | Serves the production build locally |

## Project structure

```
lantern-moth/
├── index.html          # Page shell and menu containers
├── package.json
├── tsconfig.json
└── src/
    ├── main.ts         # Game loop, state, rendering, audio, UI
    ├── style.css       # Menus, HUD and button styles
    └── vite-env.d.ts
```

## How it works

- **Game loop:** a `requestAnimationFrame` loop with a clamped delta time drives updates and drawing. States are `menu`, `play`, `pause` and `over`.
- **Rendering:** everything is drawn on one canvas, including the sky, garden, creatures and effects. Menus, the HUD and the journal are DOM overlays.
- **Audio:** sound effects and the ambient pad are generated with oscillators and filters. Browsers block audio until the first interaction, so sound starts after the player presses a button.
- **Daily challenge:** a seeded random number generator keyed to the date gives every player the same layout for that day.
- **Persistence:** progress, settings and purchases are stored in `localStorage` under a single key. A save code (Base64-encoded JSON) lets players move progress between devices without a server.

## Deployment

The project deploys to [Vercel](https://vercel.com) with no extra configuration.

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Set the **Root Directory** to `lantern-moth`. Vercel detects Vite automatically (build command `npm run build`, output `dist`).

Every push to `main` redeploys the site.

## Known limitations

- Progress is stored per browser, so it does not sync automatically between devices. Use the save code in **Settings** to transfer it.
- The game needs an internet connection to load the first time. Offline play is planned.

## Roadmap

- [ ] First-time tutorial
- [ ] Installable app (PWA) with offline support
- [ ] New environments, such as a frozen garden and a misty forest
- [ ] A living garden: changing moonlight, shooting stars and swaying plants
- [ ] Split `main.ts` into focused modules (entities, rendering, audio, UI)

## Credits

- Built by [@sikharsethi](https://github.com/sikharsethi)
- Title font: [Fraunces](https://fonts.google.com/specimen/Fraunces), loaded from Google Fonts under the SIL Open Font License

## License

A license has not been added yet. Until one is, all rights are reserved by the author.