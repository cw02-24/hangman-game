# 🎪 Shadow Circus Hangman

A dark whimsical fantasy hangman game with cinematic animations and a 3D-style visual experience.

![Shadow Circus](assets/images/backgrounds/circus_tent.jpg)

## 🎮 The Game

A puppet brought to life must guess its maker's name or become a permanent exhibit. Each wrong guess brings more strings taut, gradually constraining the puppet. Guess the word before the last string snaps!

## ✨ Features

- **6 Puppet States** - From free to fully strung
- **Lottie Animations** - Smooth, cinematic character animations
- **3D Pseudo-Depth** - CSS transforms and shadows for depth
- **Mobile-First** - Responsive touch-friendly design
- **Victory & Game Over Sequences** - Dramatic reveal animations

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🎨 Tech Stack

- **Vite** - Fast build tool
- **Vanilla JS** - No framework overhead
- **Lottie-web** - Smooth animations
- **GSAP** - Animation orchestration

## 📁 Project Structure

```
hangman-game/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   ├── main.js          # Entry point
│   ├── game.js          # Game logic
│   ├── animations.js    # GSAP orchestration
│   └── lottie-loader.js # Animation utility
├── assets/
│   ├── lottie/          # Animation files
│   ├── images/          # Backgrounds, UI
│   └── sounds/          # (Reserved)
└── SPEC.md              # Full specification
```

## 🎯 MVP Status

- [x] Project Setup
- [ ] CSS Design System
- [ ] Main Menu Screen
- [ ] Game Screen Layout
- [ ] Letter Keyboard
- [ ] Word Display
- [ ] Puppet Animation
- [ ] Game Logic
- [ ] Correct/Wrong Flows
- [ ] Victory Sequence
- [ ] Game Over Sequence
- [ ] Mobile Responsiveness

## 📜 License

MIT