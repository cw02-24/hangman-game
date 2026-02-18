# SPEC: Shadow Circus Hangman

## Overview

**Theme**: Shadow Circus - A dark whimsical fantasy hangman game where a puppet brought to life must guess its maker's name or become a permanent exhibit.

**Story**: A small puppet comes to life in a dimly lit circus tent, bound by invisible strings to its creator. As the player guesses words letter by letter, each wrong guess brings more strings taut, gradually constraining the puppet. Guess the creator's name before the last string snaps and the puppet freezes forever.

**Vibe**: Premium mobile game experience with cinematic animations, pseudo-3D depth, and a theatrical atmosphere—dark but not scary, whimsical yet melancholic.

**Core Gameplay Loop**:
1. Player starts with full puppet freedom (0 wrong guesses, idle animation)
2. Player guesses letters for the hidden word
3. Correct letter → Letter reveals in marquee, magical sparkles, keyboard glow
4. Wrong letter → Puppet state advances (1-5 strings attach), keyboard turns muted, tension rises
5. All letters revealed → Victory: strings break, puppet dances, celebration animation
6. 5 wrong guesses → Game over: puppet freezes, curtains close, dark ending

**Target Platform**: Mobile (responsive design with console-quality visual experience).
**Tech Stack**: Vanilla JS + Vite for simplicity, plus Lottie-based animations and GSAP for orchestration.

## Visual Design

### Color Palette
| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary Dark | `#1A0A2A` | Backgrounds, large dark areas |
| Secondary Dark | `#2C1E4F` | UI panels, subtle gradients |
| Accent 1 (Magic Glow) | `#7B24C0` | Interactive elements, correct letters |
| Accent 2 (Whimsical Blue) | `#4FC3F7` | Secondary highlights, string glow effects |
| Accent 3 (Gold/Brass) | `#FFD700` | Game title, theatrical marquee elements |
| Text Primary | `#E0E0E0` | Readable text, main content |
| Text Muted | `#A0A0A0` | Secondary information, disabled states |
| Error/Danger | `#D32F2F` | Wrong guesses, danger states |

### Typography
| Element | Font Family | Weight | Color | Purpose |
|---------|-------------|--------|-------|---------|
| Game Title, Major Headings | `Playfair Display` (serif) | Bold | Accent 3 (`#FFD700`) with text-shadow | Cinematic, ornamental |
| Body Text (instructions, scores) | `Montserrat` or `Nunito` (sans-serif) | Regular/Semibold | Text Primary (`#E0E0E0`) | Readable, modern |
| Game Letters (word display, keyboard) | `Oswald` or `Roboto Slab` (slab serif) | Bold | Text Primary (`#E0E0E0`); Accent 1 (`#7B24C0`) on correct letters; Muted (`#A0A0A0`) on incorrect letters | Blocky, theatrical look |

### 3D Depth Strategy (Pseudo-3D Without WebGL)
- **Soft Shadows**: Multi-layer `box-shadow` with `rgba` for depth and ambient lighting
- **Volumetric Lighting**: Spotlights and light rays simulated via CSS gradients and Lottie animations
- **Edge Lighting/Rim Lighting**: Inner shadows and glows on key elements (puppet, keyboard keys)
- **Glow Effects**: `box-shadow` and `text-shadow` with Accent 1/2 for magical and interactive states
- **Perspective & Transforms**: `perspective`, `transform-style: preserve-3d`, and `translateZ()` on layered elements
- **Filter Utilities**: `drop-shadow()` for PNG assets to create realistic shadows following contours

## Character System

### Puppet Design
Central character—a stylized 2D puppet appearing to be made from carved wood or porcelain with articulated joints and visible string attachment points (hands, feet, head, torso). Served by a single multi-state Lottie animation rather than multiple static images.

### Puppet Game States (0-5 Wrong Guesses)

| Wrong Guesses | Visual State | Lottie Trigger | Animation Notes |
|---------------|--------------|----------------|-----------------|
| **0** | Freed, swaying slightly | Initial load (`state_0_free`) | Idle loop, autoplay: true |
| **1** | One arm string attached, slight jerk | `incorrectGuess(1)` → `state_1_left_arm_string` | Show attachment, then hold |
| **2** | Second arm string on other arm, more constrained | `incorrectGuess(2)` → `state_2_right_arm_string` | More rigid, constrained pose |
| **3** | Both legs strings, stance becomes rigid | `incorrectGuess(3)` → `state_3_head_string` | Very limited movement |
| **4** | Head string pulled askew, despair | `incorrectGuess(4)` → `state_4_left_leg_string` | Despairing expression |
| **5** | Final torso string lifts puppet slightly, eyes dim | `incorrectGuess(5)` → `state_5_right_leg_string` | Lifeless, transitions to Game Over animation |

**Lottie File**: `assets/lottie/puppet_states.json` with markers:
- `state_0_free`: frames 0
- `state_1_left_arm_string`: frames 35
- `state_2_right_arm_string`: frames 65
- `state_3_head_string`: frames 95
- `state_4_left_leg_string`: frames 125
- `state_5_right_leg_string`: frames 155

### Victory Animation
Full sequence in `assets/lottie/puppet_victory.json`: all strings dramatically break and recoil, puppet performs a joyful dance with spotlight brightening, transitions to victory screen.

### Game Over Animation
Freeze in final state from `puppet_states.json` (frame 155), spotlight dims and narrows, darker vignette effect, followed by curtain close animation.

## UI Components

### Letter Keyboard
- Layout: Standard QWERTY, optimized for touch (large tap targets)
- Style: Ornate pseudo-3D keys (vintage typewriter or circus signage aesthetic)
- States:
  - Default: Raised with soft rim lighting
  - Hover/Focus: Inner glow (Accent 1, `#7B24C0`)
  - Pressed: Subtle depress animation (0.1s)
  - Correctly Guessed: Locked in with Accent 1 glow, no interaction
  - Incorrectly Guessed: Desaturated, muted red/gray color, receded (Error/Danger `#D32F2F`)
- **Lottie Feedback**: `key_press.json`, `key_correct.json`, `key_incorrect.json`

### Word Display (Marquee Style)
- Appearance: Theatrical marquee with individual letter slots
- Undiscovered letters: Dim, ornate placeholders
- Discovered letters: Revealed in `Oswald`/`Roboto Slab` bold font with Accent 1 (`#7B24C0`) glow
- **Animations**: `letter_reveal_glow.json` sparkles on reveal, `word_marquee_celebration.json` on win

### Progress Indicator (String Tension Meter)
- Concept: Subtle dial or vertical meter integrated into background (not a traditional progress bar)
- Display: Needle movement or string symbol progress showing tension/danger
- **Lottie**: `tension_meter_progress.json` for dynamic updates

### Score/Level Display
- Subtle, ornate frame above or below the word display
- Updates on word completion with a shimmer or glow animation
- Positioned to avoid distraction from gameplay

## Animation System

### Lottie Files & Usage (Cross-Referenced from `/assets/lottie/`)

| File | Animation Type | Trigger | Playback Control | Notes |
|------|----------------|---------|------------------|-------|
| `puppet_states.json` | Core puppet states (0-5) | `gameLoad` → `incorrectGuess(n)` | Segment markers (`goToAndStop`) | Multi-state Lottie for puppet progress |
| `puppet_victory.json` | Victory dance | `gameWon()` | Play once, then loop dance | Strings breaking then joyful movement |
| `puppet_gameover.json` | Freeze + dark vignette | `gameOver()` | Play once | Final state followed by curtain close |
| `confetti.json` | Falling celebration particles | `celebrationStart()` | Play once, infinite loop | Overlay effect on victory |
| `victory.json` | Golden star burst | `celebrationStart()` | Play once | Accent element on victory screen |
| `sparkle.json` | Small sparkle | `letterRevealed()` | Short burst | Used per correct letter |
| `loading.json` | Purple spinner | `appLoading` | Loop | Loading screen/prefetch states |
| `dust_particles.json` | Ambient floating dust | Always rendering | Slow loop | Background atmosphere layer |
| `key_press.json` | Button keypress feedback | `keyClick()` | Short impact | Keyboard key animation |
| `key_correct.json` | Correct guess feedback | `correctLetter()` | Burst | Keyboard glow on correct guess |
| `key_incorrect.json` | Incorrect guess feedback | `wrongLetter()` | Muted pulse | Keyboard turns muted for wrong letter |
| `tension_meter_progress.json` | Meter/needle animation | `updateTension()` | Segment based on wrongGuess | Shows danger level |
| `curtain_close.json` | Velvet curtains closing slowly | `curtainClose()` | Play once | Dark cinematic effect for game over |

### GSAP Timeline Integration
```javascript
// Wrong guess sequence
gsap.timeline({
  onComplete: () => updatePuppetState(wrongGuessCount)
})
.to('.key-' + letter, { scale: 0.9, opacity: 0.5, duration: 0.1 })
.to('.puppet', { x: -5, duration: 0.05 })
.add(() => playSFX('wrong'));

// Correct guess sequence
gsap.timeline()
.to('.letter-slot', { scale: 1.1, duration: 0.2 })
.add(() => {
  showLetter(letter);
  playSFX('correct');
  playAnimation('sparkle');
});

// Victory sequence
const tl = gsap.timeline();
tl.to('.puppet', { scale: 1.1, duration: 0.3 })
  .add(() => playAnimation('puppet_victory'))
  .to('.confetti', { opacity: 1, duration: 0.5 });
```

**Use Cases**:
- UI element staggers (staggered letter reveals)
- Scale/rotate effects on buttons and key interactions
- Parallax movement on background layers (mouse/touch interaction)
- Scene transitions (fade-in, slide-up, scale-up effects)
- Sequenced animation orchestration

## Screen Specifications

### Main Menu
- Background: `assets/images/backgrounds/circus_tent.jpg` with subtle parallax dust particles
- Title: "Shadow Circus Hangman" in `Playfair Display` gold with glow
- "Start Game" Button: Large, ornate pseudo-3D with Accent 1 glow (`#7B24C0`)
- "Settings"/"Credits": Smaller integrated buttons
- Puppet: Idle State 0, subtle swaying (Lottie loop)
- Transitions: Fade-in/scale-up on load, smooth blur transition to game screen

### Game Screen
- Background: `assets/images/backgrounds/dark_stage.jpg` with depth layers and curtain side panels
- Top Center: Puppet at Z-depth ~200px, main visual focus
- Mid-Center: Word display marquee (Z-depth ~100px), just below puppet
- Bottom: Keyboard (Z-depth ~300px) with layered shadows for 3D key appearance
- Corners: Score (top-left), Level (top-right), Pause (bottom-left or top-right)
- Atmosphere: `dust_particles.json` in background, spotlight overlay (`spotlight.jpg`)
- Responsive: Touch-friendly layout (no pinch/zoom, full viewport)

### Victory Screen
- Background: Brightened circus tent interior (`circus_tent.jpg` slightly lighter), spotlight expanded
- Central Message: "YOU WON!" or "FREED!" in bold glowing typography (Accent 3 gold, `#FFD700`)
- Stats Display: Score and maybe max streak, framed ornately
- Buttons: "Play Again" (prominent), "Main Menu" (secondary)
- Animations: `puppet_victory.json` (dance), `confetti.json` (falling particles), `victory.json` (star burst)
- Transition: Scale-up/fade-in from previous state

### Game Over Screen
- Background: `dark_stage.jpg` with dark vignette overlay, velvet curtains closing slowly
- Center: Frozen puppet at final state (Z-depth ~200px), spotlight narrowed
- Message: "GAME OVER" in faded, cinematic font (desaturated purple/gray gradients)
- Revealed Word: Displayed clearly (educational/closure purpose)
- Buttons: "Try Again" (prominent), "Main Menu" (secondary)
- Animations: `puppet_gameover.json` (freeze), `curtain_close.json` (slow curtain fall), `game_over_text_fade.json`
- Transition: Dramatic curtain closure with fade to black, then screen load

## Asset Manifest

### Lottie Files (`/assets/lottie/`)
| Filename | Type | Markers | Notes |
|----------|------|---------|-------|
| `puppet_states.json` | Multi-state | `state_0_free`–`state_5_right_leg_string` | Core gameplay, frame markers |
| `puppet_victory.json` | Single | N/A | Victory dance loop |
| `puppet_gameover.json` | Single | N/A | Freeze with dark vignette |
| `confetti.json` | Single | N/A | Falling celebration particles |
| `victory.json` | Single | N/A | Golden star burst accent |
| `sparkle.json` | Single | N/A | Small sparkle per reveal |
| `loading.json` | Single | N/A | Purple spinner |
| `dust_particles.json` | Single | N/A | Ambient floating dust |
| `key_press.json` | Single | N/A | Keyboard keypress bump |
| `key_correct.json` | Single | N/A | Keyboard glow burst |
| `key_incorrect.json` | Single | N/A | Keyboard muted pulse |
| `tension_meter_progress.json` | Single | N/A | Meter/needle movement |
| `curtain_close.json` | Single | N/A | Curtain fall effect |

### Image Assets (`/assets/images/`)
| Category | Filename | Usage |
|----------|----------|-------|
| Backgrounds | `dark_stage.jpg` | Main game background |
| Backgrounds | `circus_tent.jpg` | Menu/alternate background |
| Backgrounds | `spotlight.jpg` | Volumetric light overlay |
| UI | `button_glow.png` | Glowing button icon on UI elements |
| UI | `star.png` | Score, achievements icon |
| UI | `crown.png` | High score, level indicator icon |
| Character | *[Reserved]* | For sprite sheets, static overlays, or alternative formats if needed |

### Sounds (`/assets/sounds/`)
**Reserved** (to be sourced):
- `correct.mp3` - Correct letter chime
- `wrong.mp3` - Wrong letter "thwip" sound
- `victory.mp3` - Victory fanfare
- `gameover.mp3` - Game over somber tone
- `ambient.mp3` - Background circus music

**Missing Assets Needing Sourcing**:
- All Lottie files in `/assets/lottie/` (especially `puppet_states.json` with exact frame markers)
- Background images (`dark_stage.jpg`, `circus_tent.jpg`, `spotlight.jpg`)
- UI icons (`button_glow.png`, `star.png`, `crown.png`)
- Sound effects and background music (if added)
- Custom curtain animation Lottie (`curtain_close.json`) and game over text animation (`game_over_text_fade.json`)

## Technical Architecture

### File Structure
```
hangman-game/
├── index.html                    # Entry point (responsive meta tags)
├── styles/
│   └── main.css                  # Global styles, CSS 3D transforms, typography, animations
├── scripts/
│   ├── main.js                   # App initialization, event listeners
│   ├── game.js                   # Game logic (word list, state management)
│   ├── animations.js             # GSAP timeline orchestration, animation triggers
│   └── lottie-loader.js          # Class/function for loading and controlling Lottie animations
├── assets/
│   ├── lottie/                   # All Lottie JSON files (as listed above)
│   │   ├── puppet_states.json
│   │   ├── puppet_victory.json
│   │   ├── puppet_gameover.json
│   │   ├── confetti.json
│   │   ├── victory.json
│   │   ├── sparkle.json
│   │   ├── loading.json
│   │   ├── dust_particles.json
│   │   ├── key_press.json
│   │   ├── key_correct.json
│   │   ├── key_incorrect.json
│   │   ├── tension_meter_progress.json
│   │   └── curtain_close.json
│   ├── images/                   # All image assets
│   │   ├── backgrounds/
│   │   │   ├── dark_stage.jpg
│   │   │   ├── circus_tent.jpg
│   │   │   └── spotlight.jpg
│   │   ├── ui/
│   │   │   ├── button_glow.png
│   │   │   ├── star.png
│   │   │   └── crown.png
│   │   └── character/            # (Reserved for sprite sheets or overlays)
│   └── sounds/                   # (Reserved for audio files)
├── research/                     # Existing research documents
├── design/                       # Existing design documents
├── SPEC.md                       # This consolidated specification
└── package.json                  # Dependencies if using npm/Vite
```

### Key Dependencies
- **HTML5 & CSS3**: `display: flex`, `display: grid`, `position: absolute`, responsive units (`vh`, `vw`, `rem`, `em`)
- **CSS 3D Transforms**:
  - `perspective(1000px)` for 3D viewing context
  - `transform-style: preserve-3d` on interactive containers
  - `translateZ(depth)` for layered background and foreground elements
  - `transform: rotateY()`, `rotateX()` for hover effects
- **lottie-web** (CDN or npm): `lottie.loadAnimation()` for rendering Lottie JSON files and controlling markers
- **GSAP** (CDN or npm): `gsap.timeline()` for UI transitions, element animations, and parallax
- **Mobile-First Layout**: Touch-optimized touch targets, viewport meta tags, responsive sizing
- **Performance**: GPU-accelerated properties (`transform`, `opacity`) and minimal repaints

### Implementation Notes
- Use modular JavaScript functions/classes for state management (Word list, current game state, wrong guess count)
- Load Lottie animations lazily or pre-fetch on app load to avoid jank
- Implement debounced and throttled event listeners for touch/mouse interactions
- Use CSS media queries to adjust keyboard size and spacing for different screen orientations
- Ensure all animations provide accessibility (visible UI states, screen readers can read revealed letters)
- Optimize image assets: spritesheets preferred to individual PNGs, compressed formats (WebP preferred over JPEG for transparency support)
- Implement a generic `playSFX(name)` function for audio file placeholders (or placeholder UI feedback if no audio)
- Cross-browser testing needed (Chrome Mobile, Safari iOS, Firefox Mobile)
- Fallback to CSS-only animations if assets are not available or loaded (graceful degradation)
- Use semantic HTML where possible, ARIA attributes for accessible keyboard navigation

## Acceptance Criteria (MVP)

**Features for MVP**:
✓ Shadow Circus theme with deep, whimsical color palette (`#1A0A2A`, `#7B24C0`, `#FFD700`, etc.)
✓ Responsive mobile layout with game screens (Menu, Game, Victory, Game Over)
✓ Puppet character with 6 states (0-5 wrong guesses) using Lottie animation (markers: `state_0_free`–`state_5_right_leg_string`)
✓ Win condition: All letters revealed, strings break, puppet dances, victory sequence plays
✓ Loss condition: 5 wrong guesses, puppet freezes, curtain closes, game over sequence
✓ Correct letter: Letter appears in marquee, visual sparkles, key glows with Accent 1 (`#7B24C0`)
✓ Incorrect letter: Wrong guess reduces puppet freedom, key turns muted, tension rises
✓ QWERTY keyboard with interactive states (default, hover, pressed, correct, incorrect)
✓ Progress indicator (string tension meter) integrated into the environment
✓ Game score tracking and word completion display
✓ Main Menu with Start Game and Options/Settings placeholders
✓ Responsive transitions between screens (fade, scale, curtain close)
✓ CSS 3D depth effects (shadows, layered depth via `perspective` and `translateZ()`)
✓ Lottie animations for:
  - Puppet states (0-5), victory, and game over
  - Key and UI feedback (key_press, key_correct, key_incorrect, sparkle, loading, dust_particles)
  - Progress meter tension updates
✓ Cross-browser mobile compatibility (Chrome Mobile, Safari iOS)

**Optional/Stretch**:
- Sound effects and background music (sound placeholders)
- Parallax effects in response to mouse/touch movement
- Settings (word length difficulty, sound toggle)
- High score tracking (stored locally)
- Multiple word lists/themes
- Additional Lottie animations (curtain close, victory star burst, game over text fade)
- More advanced UI effects (shimmering buttons, glowing borders)
- Achievement/badge system