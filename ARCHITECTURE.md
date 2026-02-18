# ARCHITECTURE: Shadow Circus Hangman

## 1. Overview

This document outlines the technical architecture for "Shadow Circus Hangman," a mobile-first, web-based game. The core principle is to deliver a cinematic, pseudo-3D experience without relying on complex WebGL frameworks, focusing instead on performant CSS3, Lottie for animations, and GSAP for orchestration.

## 2. Core Technologies

-   **Vite**: Fast development build tool for a streamlined developer experience and optimized production builds.
-   **Vanilla JavaScript (ESM)**: For core game logic, UI interactions, and state management, promoting lightweight and efficient code.
-   **HTML5 & CSS3**: Semantic markup and advanced styling, including Flexbox, Grid, and critical CSS 3D transforms.
-   **lottie-web**: A JavaScript library for rendering Adobe After Effects animations exported as JSON via the Bodymovin plugin. Used for character animations, UI feedback, and atmospheric effects.
-   **GSAP (GreenSock Animation Platform)**: A robust JavaScript animation library for orchestrating complex timelines, UI transitions, and subtle interactive animations.

## 3. File Structure

The project will adhere to a clear, modular file structure to separate concerns and enhance maintainability.

```
hangman-game/
├── index.html                    # Main entry point, responsive meta tags, root UI structure
├── styles/
│   └── main.css                  # Global styles, typography, color palette variables, CSS 3D helpers, animation keyframes
├── scripts/
│   ├── main.js                   # Application initialization, scene/screen management, event binding
│   ├── game.js                   # Core game logic: word selection, guess tracking, win/loss conditions, state transitions
│   ├── ui.js                     # UI rendering and updates for keyboard, word display, score, menu elements
│   ├── animations.js             # GSAP timelines and orchestration for UI elements and transitions
│   └── lottie-loader.js          # Utility class/module for loading, caching, and controlling Lottie animations
├── assets/
│   ├── lottie/                   # All Lottie animation JSON files
│   ├── images/                   # Backgrounds, UI elements, character assets
│   │   ├── backgrounds/
│   │   ├── ui/
│   │   └── character/
│   └── sounds/                   # Reserved for audio files (SFX, BGM)
├── research/                     # Supporting research and design documents
├── design/                       # UI/UX design mockups and assets
├── SPEC.md                       # Project Specification
└── ARCHITECTURE.md               # This technical architecture document
└── package.json                  # Project dependencies and scripts (managed by Vite/npm)
```

## 4. CSS 3D Depth Strategy (Pseudo-3D)

To achieve a rich, theatrical pseudo-3D look without WebGL, the following CSS techniques will be employed:

-   **`perspective` Property**: Applied to a parent container to establish a 3D viewing context for its children.
-   **`transform-style: preserve-3d`**: Enables children of a 3D-transformed element to be positioned in 3D space.
-   **`translateZ()`**: Used to push elements forward or backward along the Z-axis, creating layers and perceived depth (e.g., puppet, word marquee, keyboard).
-   **Soft Shadows & Volumetric Lighting**: Multi-layer `box-shadow` with `rgba` values will simulate depth. CSS gradients and Lottie animations will create light rays and spotlight effects.
-   **Edge Lighting/Rim Lighting**: Achieved with inner shadows and subtle glows on key UI components (e.g., keyboard keys).
-   **`filter: drop-shadow()`**: Applied to PNG assets to cast realistic shadows that follow the alpha channel of the image, enhancing depth for layered elements.

## 5. Animation System

The project heavily relies on Lottie and GSAP for all dynamic visual feedback and cinematic sequences.

### Lottie Animations (`lottie-web`)

-   **Purpose**: Character state changes (puppet's reactions), complex UI flourishes (sparkles, key glows), and atmospheric looping effects (dust particles, loading spinners).
-   **Control**: A dedicated `lottie-loader.js` module will manage loading, caching, and playback. It will expose methods to play specific segments (via markers for `puppet_states.json`), control speed, and handle completion callbacks.
-   **Asset Location**: All Lottie JSON files will reside in `assets/lottie/`.

### GSAP Timelines & Orchestration (`gsap`)

-   **Purpose**: Choreographing UI element movements, screen transitions (fade, scale, slide), staggered animations (letter reveals), and synchronized sequences (e.g., wrong guess feedback combining key press, puppet jerk, and tension meter update).
-   **Integration**: GSAP timelines will be used to sequence multiple CSS property changes and Lottie playback triggers.
-   **Key Examples**:
    -   **Wrong Guess**: `gsap.timeline()` will animate the pressed key, trigger a slight puppet "jerk" animation, and update the tension meter Lottie progress.
    -   **Correct Guess**: A timeline will handle letter reveal animation in the marquee, play a sparkle Lottie, and glow the corresponding keyboard key.
    -   **Victory/Game Over**: Complex timelines will coordinate background changes, puppet animations (e.g., `puppet_victory.json` playback), overlay effects (confetti, curtains), and message display.

## 6. Game Logic and State Management

-   **Modular JavaScript**: The `game.js` module will encapsulate all core game logic:
    -   **Word Selection**: Randomly select a word from a predefined list.
    -   **Guess Tracking**: Maintain guessed letters, correctly revealed letters, and incorrect guess count.
    -   **Game State**: Manage transitions between `MENU`, `PLAYING`, `VICTORY`, `GAME_OVER` states.
    -   **Event Handling**: Process keyboard input (physical and on-screen) and delegate updates to UI and animation modules.
-   **Reactive UI**: UI components (keyboard, word display, score) will update based on changes in the central game state, leveraging a simple publish-subscribe pattern or direct function calls for rendering.

## 7. Performance and Accessibility

### Performance
-   **GPU Acceleration**: Prioritize CSS `transform` and `opacity` for animations to leverage GPU rendering.
-   **Lazy Loading/Pre-fetching**: Lottie animations will be loaded efficiently, with core assets potentially pre-fetched.
-   **Optimized Assets**: Image assets will be compressed and in modern formats (e.g., WebP). Lottie JSONs are inherently small.
-   **Debouncing/Throttling**: Input event listeners will be optimized to prevent excessive function calls.

### Accessibility
-   **Semantic HTML**: Use appropriate HTML elements for structure and meaning.
-   **ARIA Attributes**: Implement ARIA roles and properties where standard HTML semantics are insufficient, especially for dynamic UI updates (e.g., announcing revealed letters).
-   **Keyboard Navigation**: Ensure all interactive elements are reachable and operable via keyboard.
-   **Contrast Ratios**: Adhere to WCAG guidelines for text and UI element contrast.
-   **Reduced Motion**: Consider implementing `prefers-reduced-motion` media query to offer a less animated experience for sensitive users.

## 8. Development Workflow

-   **Vite Development Server**: Hot Module Replacement (HMR) for rapid iteration.
-   **Browser-Based Testing**: Primary testing will occur directly in mobile browsers (Chrome, Safari, Firefox) to ensure responsiveness and performance.
-   **Version Control**: Git will be used for source control, with a GitHub repository for collaboration and issue tracking.

This architecture aims to provide a robust, performant, and maintainable foundation for the Shadow Circus Hangman game, delivering a rich user experience across mobile devices.