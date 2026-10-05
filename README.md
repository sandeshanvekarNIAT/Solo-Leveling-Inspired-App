# SYSTEM AWAKEN

> **A sovereign, gamified fitness protocol inspired by dark-fantasy hunter lore.**  
> Turn your daily physical discipline into supernatural combat power. The System does not offer encouragement. It evaluates, commands, and calculates results.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.0-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

> [!WARNING]
> **DEVELOPMENT NOTICE & SYSTEM INSTABILITY (EARLY ALPHA)**  
> This project is currently in **active, heavy development**. 
> - **Expect Bugs & Glitches**: There will exist bugs, unpolished states, interface anomalies, and incomplete mechanics across various screen sizes and browsers.
> - **Performance Warning**: Do not expect optimized performance at this stage. The application leverages complex WebGL/Canvas particles, hardware-accelerated 3D transforms (`rotateY`, `translateZ`), and real-time Web Audio API procedural synthesis which may cause frame drops or high resource utilization on lower-tier hardware.
> - **Experimental State**: State schemas, localStorage keys, and game parameters may change frequently without migration scripts.

---

## 👁️ Overview

**SYSTEM AWAKEN** is an immersive, game-style web application designed to gamify real-world fitness and self-improvement. The user does not simply "open an app" — they are **Awakened**. The System detects biological baseline signatures, delivers daily physical directives, tracks physiological attributes, and penalizes complacency.

Every screen operates as a floating holographic System window rendered with chamfered geometry, neon energy conduits, and procedural audio.

---

## ⚡ Key Features

### 1. Cinematic Awakening Sequence
- **Red Glitch Override**: An aggressive chromatic aberration failure warning upon accepting the Awakening directive (`[SYSTEM WARNING: BIOLOGICAL OVERRIDE]`).
- **Void Heartbeat Sensor**: Total sensory dark void synchronized with low-frequency sub-bass biometric pulses.
- **Matrix Loading Kernel**: Live organic percentage telemetry reconstruction counter (`0% → 100%`) with procedural data blips.
- **Center-Split Mechanical Aperture**: High-voltage laser split opening outward from the center horizon to unveil the operational hunter terminal.

### 2. 3D Cylindrical Left-to-Right Barrel Roll Navigation
- **3D Spatial Carousel**: Smooth horizontal barrel roll between the primary System Interface (`STATUS`) and other command modules (`QUESTS`, `DUNGEONS`, `ARMY`, `SHOP`, `CRAFT`, `GUILD`).
- **Direction-Aware Kinematics**: Panels roll away into depth along the cylinder (`rotateY: ±50°`, `translateZ: -240px`, `scale: 0.88`) with cushioned physics.
- **Omni-Input Controls**:
  - **Touch Gestures**: Horizontal swipe anywhere on mobile and tablet screens.
  - **Keyboard**: <kbd>←</kbd> and <kbd>→</kbd> arrow navigation.
  - **Holographic Chevrons**: One-click peripheral triggers on desktop viewports.

### 3. Tactical Dark Stealth Background Canvas
- **Carbon Hex-Mesh Lattice**: High-definition vector SVG hexagonal honeycomb weave (`rgba(30, 167, 255, 0.12)`).
- **72px Tactical Coordinate Matrix**: Fine square gridlines with intersection crosshairs and micro-node indicators.
- **Volumetric Mana Radial Bloom**: Deep royal abyss gradient (`#030918` → `#040e24` → `#02040a`) centered behind active windows.
- **Animated Scanner Conduit**: Sweeping horizontal laser beam continuously traversing the tactical grid.
- **Live Telemetry Annotations**: Corner HUD brackets with real-time telemetry coordinates, sector markers, and status indicators.

### 4. Core System Modules
- **Hunter Status (`STATUS`)**:
  - Live allocation of unspent ability points across **STR**, **AGI**, **VIT**, **INT**, and **PER**.
  - Dynamic **Combat Power (CP)** formula recalculating live telemetry.
  - Interactive level-up and rank-up promotion cinematics with confetti particle bursts.
- **Daily Quests (`QUESTS`)**:
  - Strict daily physical quotas: 100 Push-ups, 100 Sit-ups, 100 Squats, 10km Running.
  - Live countdown timer to midnight reset with emergency red alert state when under 2 hours.
  - Interactive stopwatch and set tracker modal for active workouts.
- **Penalty Zone (`PENALTY`)**:
  - Automatic isolation zone triggered by missed daily directives or deliberate invocation.
  - Survival protocol: complete 30 high-intensity burpees before the dimensional timer expires to break containment.
- **High-Intensity Dungeon Gates (`DUNGEONS`)**:
  - Procedural boss raids scaled by difficulty rank (E-Rank Goblin Outpost, B-Rank Cerberus Chasm, S-Rank Architect of Abyss).
  - Interval-timed boss encounters with live HP attrition and EXP / Gold rewards.
- **Shadow Army Extraction (`ARMY`)**:
  - Habit compounding protocol: mastered real-world habits (sleep recovery, hydration, cold exposure) are extracted as permanent shadow soldiers via the **ARISE** directive.
  - Compounding passive CP boosts.
- **Armory Shop (`SHOP`)**:
  - Spend accumulated Gold earned from quests and dungeon clears on stat potions, recovery elixirs, and emergency dungeon keys.
- **Guild Syndicate & Alchemy (`GUILD` / `CRAFT`)**:
  - Guild operations and rune merging modules accessible via the top telemetry bar.

### 5. Procedural Web Audio API Sound Engine
- **Zero MP3 Dependencies**: 100% generated in real-time using native browser `AudioContext`, custom oscillators, and biquad filters.
- **Synthesized SFX Suite**:
  - Holographic window open whooshes
  - UI interaction micro-ticks
  - Celestial notification alert chimes
  - Low-frequency penalty bass rumbles
  - Sub-bass physical heartbeats
  - Level-up energy surges
  - Heavy mechanical servo latches
  - Magnetic 3D cylindrical barrel swipe whooshes

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router + Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Design System |
| **Animation Engine** | [Framer Motion 14](https://www.framer.com/motion/) |
| **Audio Synthesizer** | Native [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Effects** | Canvas Confetti, HTML5 Canvas Particle Engine |

---

## 📂 Project Structure

```
Making Solo Leveling App/
├── public/                 # Static public assets and favicons
├── src/
│   ├── app/
│   │   ├── globals.css     # CSS design tokens, chamfer clip-paths & 3D barrel utilities
│   │   ├── layout.tsx      # Root metadata, font definitions, and viewport settings
│   │   └── page.tsx        # Top-level client router and cinematic lifecycle manager
│   ├── components/
│   │   ├── app/
│   │   │   ├── AppShell.tsx           # Core System interface, 3D barrel switcher & HUD dock
│   │   │   └── tabs/
│   │   │       ├── StatusTab.tsx      # Hunter attributes, radar charts & stat allocation
│   │   │       ├── QuestsTab.tsx      # Daily workout checklist, timers & completion status
│   │   │       ├── DungeonsTab.tsx    # Gate raids & boss fight trials
│   │   │       ├── ShadowArmyTab.tsx  # Habit extraction & shadow soldier roster
│   │   │       ├── ShopTab.tsx        # Armory potions, gear & item purchase
│   │   │       ├── CraftTab.tsx       # Rune alchemy & synthesis
│   │   │       └── GuildTab.tsx       # Guild syndicate operations
│   │   ├── landing/
│   │   │   └── LandingPage.tsx        # Cinematic landing page & interactive demos
│   │   └── ui/
│   │       ├── AwakeningCinematic.tsx # Multi-stage cinematic transition
│   │       ├── LevelUpCinematic.tsx   # Matrix surge level-up overlay
│   │       ├── RankUpCinematic.tsx    # Rank promotion cinematic
│   │       ├── TacticalBackground.tsx # Matte carbon hex-mesh & telemetry canvas
│   │       ├── SystemWindow.tsx       # Holographic chamfered window container
│   │       ├── SystemButton.tsx       # Game-style action triggers with audio
│   │       ├── StatBar.tsx            # Animated attribute meters
│   │       ├── RankBadge.tsx          # Glowing rank identifiers (E to National)
│   │       ├── BossFightModal.tsx     # Dungeon boss battle simulator
│   │       ├── WorkoutActiveModal.tsx # Stopwatch workout tracker
│   │       ├── PenaltyModal.tsx       # Survival burpee challenge
│   │       ├── ParticleCanvas.tsx     # Floating background mana motes
│   │       └── TypewriterText.tsx     # Terminal typewriter effect
│   ├── context/
│   │   └── SystemContext.tsx          # Central state engine, RPG math & localStorage sync
│   ├── lib/
│   │   ├── sound.ts                   # Procedural Web Audio API synthesizer
│   │   └── initialData.ts             # Initial hunter baseline telemetry
│   └── types/
│       └── system.ts                  # Domain models, player profiles, ranks & quest types
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `18.18.0` or higher
- **npm**, **pnpm**, or **yarn**

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   git clone https://github.com/sandeshanvekarNIAT/Making-Solo-Leveling-App.git
   cd Making-Solo-Leveling-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 🎮 Keyboard & Gesture Controls

| Key / Gesture | Target | Action |
|---|---|---|
| <kbd>→</kbd> / <kbd>ArrowRight</kbd> | System Interface | 3D Barrel Roll to the next module on the right |
| <kbd>←</kbd> / <kbd>ArrowLeft</kbd> | System Interface | 3D Barrel Roll to the previous module on the left |
| **Touch Swipe Left** | Mobile / Tablet | Roll to next tab |
| **Touch Swipe Right** | Mobile / Tablet | Roll to previous tab |
| <kbd>Space</kbd> / <kbd>Esc</kbd> | Cinematics | Fast-forward / skip cinematic sequences |
| **Audio Toggle** | Top Header | Enable or mute procedural Web Audio synthesis |

---

## 🔒 Data Persistence & Privacy

- All hunter progression data (stats, level, gold, shadow soldiers, and completed quests) is stored locally in your browser's `localStorage`.
- No external tracking scripts, advertising trackers, or telemetry beacons are utilized.
- All audio synthesis runs directly in the client via the browser's native audio hardware.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>[THE SYSTEM IS WATCHING. PROCEED WITH DISCIPLINE.]</sub>
</div>
