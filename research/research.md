# Hangman Game - Research Document

## 1. Lottie Animation Resources

### Primary Sources

| Source | URL | License | Notes |
|--------|-----|---------|-------|
| **LottieFiles** | https://lottiefiles.com | Free/Premium | 800,000+ animations, largest library |
| **LottieFiles Victory** | https://lottiefiles.com/free-animations/victory | Free | Victory celebrations |
| **LottieFiles Win** | https://lottiefiles.com/free-animations/win | Free | Gaming win animations |
| **LottieFiles Celebration** | https://lottiefiles.com/free-animations/celebration | Free | Confetti, party effects |
| **IconScout** | https://iconscout.com/lottie-animations | Free/Premium | 877K+ animations, high quality |
| **Jitter.video** | https://jitter.video/lottie-animations/ | Free | Create custom Lottie animations |

### Recommended Animation Categories (Search on LottieFiles)

1. **Hangman/Character Progress**
   - Search: "skeleton", "stick figure", "character build"
   - Search: "rope", "hang", "swing"
   - Alternative: Create custom animation in Jitter.video

2. **Victory/Celebration**
   - Search: "victory", "win", "celebration", "confetti", "trophy"
   - Search: "fireworks", "stars", "sparkle"

3. **Game Over/Death**
   - Search: "fail", "game over", "sad", "broken heart"
   - Search: "ghost", "skull", "death"

4. **UI Elements**
   - Search: "button", "loading", "transition", "menu"
   - Search: "particle", "sparkle", "glow"

5. **Background Ambient**
   - Search: "background", "particles", "stars", "float"
   - Search: "gradient", "wave", "abstract"

### Custom Animation Creation
- **After Effects + Lottie Plugin** → Professional quality
- **Jitter.video** → Free, browser-based, no skills required
- **Figma + LottieFiles Plugin** → Design in Figma, export as Lottie

---

## 2. Image Assets & 3D Style Resources

### Free Image Resources

| Source | URL | Type | License |
|--------|-----|------|---------|
| **Unsplash** | https://unsplash.com | Photos | Free (no attribution) |
| **Pexels** | https://pexels.com | Photos/Videos | Free |
| **Freepik** | https://freepik.com | Vectors/3D | Free with attribution |
| **Craftwork** | https://craftwork.design | 3D Assets | Free/Premium |
| **Sketchfab** | https://sketchfab.com | 3D Models | Free/Premium |

### 3D-Style 2D Assets (Recommended)

1. **3D Character Packs**
   - Freepik: "3d character", "cute character", "cartoon character"
   - Craftwork: 3D illustration packs

2. **Background/Environment**
   - Unsplash: Cinematic backgrounds with depth
   - Freepik: "3d background", "isometric scene"

3. **UI Elements**
   - Figma Community: Free UI kits with 3D style
   - Craftwork: 3D icons and buttons

### Recommended Aesthetic Direction
- **Style**: "Premium mobile game" - soft shadows, gradients, depth
- **Color Palette**: Dark theme with neon accents OR warm colors with soft glow
- **Typography**: Bold, rounded fonts (Poppins, Nunito, Quicksand)

---

## 3. Plot & Narrative Framework

### Option A: "The Detective's Last Case" 🕵️
**Theme**: Noir detective mystery
**Story**: A detective trapped in a kidnapper's game. Each wrong letter brings the victim closer to doom.
**Character**: Detective silhouette with noir aesthetic
**Progress**: Rope tightens / clock ticks down
**Win**: Victim rescued, case closed animation
**Lose**: Dark ending with newspaper headline

### Option B: "Escape the Dungeon" 🏰
**Theme**: Fantasy dungeon escape
**Story**: An adventurer captured by dark forces. Guess the spell word to break free.
**Character**: Adventurer in prison cell
**Progress**: Chains appear, darkness creeps in
**Win**: Portal opens, character escapes with treasure
**Lose**: Character transforms into skeleton/ghost

### Option C: "Space Station Crisis" 🚀
**Theme**: Sci-fi space thriller
**Story**: Astronaut locked in failing station. Guess the override code before oxygen runs out.
**Character**: Astronaut in spacesuit
**Progress**: Warning lights flash, air meter drops
**Win**: Escape pod launches with cinematic flyaway
**Lose**: Station explodes in slow motion

### Option D: "Shadow Circus" 🎪
**Theme**: Dark whimsical fantasy
**Story**: A puppet brought to life must guess its maker's name or become a permanent exhibit.
**Character**: Strings attach to puppet progressively
**Progress**: More strings, more control lost
**Win**: Strings break, puppet dances freely
**Lose**: Puppet freezes, spotlight fades

**RECOMMENDED**: Option B (Escape the Dungeon) or Option D (Shadow Circus)
- Both have clear visual progression
- Strong emotional stakes
- Great animation potential

---

## 4. Tech Stack Recommendations

### Core Framework
```
Vanilla JS + Vite (or)
React + Vite (if component-based preferred)
```

### Animation Libraries

| Library | Purpose | Size | Learning Curve |
|---------|---------|------|----------------|
| **lottie-web** | Render Lottie animations | 160KB | Easy |
| **GSAP** | Advanced timeline controls | 50KB+ | Medium |
| **Motion One** | Lightweight animations | 5KB | Easy |
| **Anime.js** | CSS/JS animations | 17KB | Easy |

### Recommended Stack
```
lottie-web     → Play all Lottie animations
GSAP           → Timeline control, sequencing, parallax
Motion One     → Simple UI transitions
Web Audio API  → Sound effects (optional)
```

### 3D Effects Without WebGL

1. **CSS 3D Transforms**
   - `transform: perspective(1000px) rotateY(45deg)`
   - Layer multiple elements with depth

2. **Parallax Scrolling**
   - GSAP ScrollTrigger
   - Different speeds for background layers

3. **Pseudo-3D with Shadows**
   - Multiple box-shadows
   - Layered gradients

4. **SVG Filters**
   - FeGaussianBlur for depth
   - FeDropShadow for elevation

### Project Structure
```
hangman-game/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   ├── main.js
│   ├── game.js
│   └── animations.js
├── assets/
│   ├── lottie/
│   │   ├── victory.json
│   │   ├── gameover.json
│   │   └── character/
│   │       ├── state-0.json
│   │       ├── state-1.json
│   │       └── ...
│   ├── images/
│   │   ├── backgrounds/
│   │   └── ui/
│   └── sounds/ (optional)
├── research/
│   └── research.md
├── SPEC.md (after Editor)
└── package.json
```

---

## 5. Key Implementation Tips

### Lottie Animation Control
```javascript
import lottie from 'lottie-web';

// Load animation
const anim = lottie.loadAnimation({
  container: document.getElementById('character'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'assets/lottie/character.json'
});

// Control progress for hangman states
anim.goToAndStop(frameNumber, true);
```

### GSAP Timeline for Sequences
```javascript
import gsap from 'gsap';

const tl = gsap.timeline();
tl.to('.letter', { opacity: 1, stagger: 0.1 })
  .to('.character', { scale: 1.1, duration: 0.3 })
  .add(() => victoryAnimation.play());
```

### CSS 3D Card Effect
```css
.game-card {
  transform-style: preserve-3d;
  perspective: 1000px;
}
.game-card:hover {
  transform: rotateY(5deg) rotateX(-5deg);
  box-shadow: 20px 20px 60px rgba(0,0,0,0.3);
}
```

---

## 6. Next Steps

1. **K approves research** → Spawn UI Designer
2. **UI Designer creates** `design/ui_spec.md`
3. **Editor consolidates** → `SPEC.md`
4. **K approves SPEC** → PM creates GitHub Issues
5. **Coder implements** → Test → Screenshot → Deliver

---

*Research compiled: 2026-02-18*