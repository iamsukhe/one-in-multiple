# 🕹️ React Arcade 99-in-1

A high-performance, retro-neon mini-game platform built with **React + Vite**.

## 🚀 The Tech Stack

- **Framework:** React 18
- **Bundler:** Vite (Lightning fast HMR)
- **Routing:** React Router 6 (Lazy-loaded "Cartridges")
- **Styles:** Pure CSS3 (Neon-glow aesthetic)

## 📂 Architecture

Every game is treated as an independent "Cartridge" inside the `src/games/` directory, wrapped in a universal `<GameWrapper />` to handle navigation and layout consistency.

## 🎮 Game Progress

- [x] **Tic-Tac-Toe**: Strategy grid logic.
- [x] **Pong**: 60fps physics engine with AI.
- [ ] **Memory Match**: (Coming Soon)
- [ ] **Whack-A-Mole**: (Coming Soon)

## 🛠️ Quick Start

```bash
npm install
npm run dev
```
