# UI Specification Document: Hangman Game - Shadow Circus

**Project**: Hangman Game
**Theme**: Shadow Circus - A dark whimsical fantasy hangman game
**Story**: A puppet brought to life must guess its maker's name or become a permanent exhibit.
**Vibe**: 3D masterpiece, premium mobile game quality, cinematic animations
**Target Platform**: Mobile (console quality experience)
**Core Principle**: Every element should feel alive, dark whimsical, not scary.

---

## 1. Visual Style Guide

### 1.1 Color Palette
The color palette will be dark and rich, utilizing deep, saturated hues with magical, glowing accents. This creates a sense of whimsy within the dark circus theme.

*   **Primary Dark**: `#1A0A2A` (Deepest Plum/Midnight Blue) - Backgrounds, large dark areas.
*   **Secondary Dark**: `#2C1E4F` (Dark Indigo/Violet) - UI panels, subtle gradients.
*   **Accent 1 (Magical Glow)**: `#7B24C0` (Vibrant Orchid/Deep Magenta) - Interactive elements, letter highlights, magical effects.
*   **Accent 2 (Whimsical)**: `#4FC3F7` (Electric Blue/Cyan) - Secondary highlights, ethereal effects, string glow.
*   **Accent 3 (Ethereal)**: `#FFD700` (Gold/Brass) - Theatrical marquee elements, important text.
*   **Text (Primary)**: `#E0E0E0` (Light Gray) - General readable text.
*   **Text (Muted)**: `#A0A0A0` (Medium Gray) - Secondary information.
*   **Error/Danger**: `#D32F2F` (Deep Red) - Warning states, incorrect guesses.

### 1.2 Typography
Typography will blend classical theatrical elegance with a touch of the macabre, ensuring readability and mood.

*   **Headings (Game Title, Major Sections)**: A decorative, slightly ornate serif font with strong presence (e.g., `Playfair Display`, `Cinzel Decorative`). This will evoke old circus posters.
    *   **Weight**: Bold, often with subtle text shadows.
    *   **Color**: Accent 3 (`#FFD700`) or Accent 1 (`#7B24C0`) for glow.
*   **Body Text (Instructions, Scores, UI Labels)**: A clean, legible sans-serif font that pairs well with the heading font (e.g., `Montserrat`, `Lato`, `Nunito`).
    *   **Weight**: Regular to Semibold.
    *   **Color**: Text Primary (`#E0E0E0`).
*   **Game Letters (Word Display, Keyboard)**: A distinct, bold, slightly condensed sans-serif or a strong slab serif font to resemble theatrical letter blocks or old signage (e.g., `Oswald`, `Anton`, `Roboto Slab`).
    *   **Weight**: Bold.
    *   **Color**: Text Primary (`#E0E0E0`) for active, Accent 1 (`#7B24C0`) for glowing correct letters, Muted Text (`#A0A0A0`) for inactive/guessed letters on keyboard.

### 1.3 Shadow/Lighting Treatment for 3D Depth
The game will employ a pseudo-3D aesthetic achieved through clever use of shadows, gradients, and CSS 3D transforms.

*   **Soft Shadows**: Elements will feature subtle, soft, and slightly diffused shadows to suggest depth without harshness. `box-shadow` with `rgba` colors will be used, often with a slight color tint matching the overall dark palette (e.g., `0px 10px 30px rgba(0, 0, 0, 0.5)` blending into a dark purple).
*   **Volumetric Lighting**: Emphasize light rays and dust particles, particularly around the puppet and the word display, simulating a spotlight effect in a dusty circus tent. This will be achieved with Lottie animations for ambient effects and CSS gradients/pseudo-elements for light rays.
*   **Edge Lighting/Rim Lighting**: Key 3D elements (e.g., puppet, keyboard keys) will have subtle rim lighting or inner shadows that simulate light catching their edges, enhancing their perceived volume.
*   **Glow Effects**: Magical elements, correct letters, and interactive UI states will utilize soft, inner/outer glows using `box-shadow` or `text-shadow` with Accent 1 or Accent 2 colors.

---

## 2. Character Design (The Puppet)

The puppet is the central character, a key visual indicator of game progress. It should embody a fragile, whimsical, yet slightly melancholic aesthetic.

*   **Overall Style**: Stylized 2D with strong pseudo-3D depth (achieved via shading, highlights, and subtle CSS 3D transforms). It should appear to be made of carved wood or porcelain, with articulated joints.
*   **String Attachment Points**: Visible, delicate loops on hands, feet, head, and torso where the strings will attach.
*   **Lottie Animation**: The puppet's state changes will be driven by a single, multi-state Lottie animation file. This allows for precise control over frame progression.

### 2.1 Puppet States (0-5 Wrong Guesses)
The puppet's animation will transition smoothly through 6 states (0-5 wrong guesses), representing increasing restriction by strings.

*   **State 0 (0 Wrong Guesses)**: Puppet stands freely, perhaps a slight sway or subtle idle animation. No strings attached.
    *   **Lottie Trigger**: Initial game load.
    *   **Lottie Control**: Loop idle animation, `autoplay: true`.
*   **State 1 (1 Wrong Guess)**: A single string attaches to one arm. Puppet shows a slight, surprised jerk.
    *   **Lottie Trigger**: `incorrectGuess(1)`
    *   **Lottie Control**: Play specific segment (e.g., frames 0-30) that shows string attachment and jerk, then hold.
*   **State 2 (2 Wrong Guesses)**: Second string attaches to the other arm. Puppet looks more constrained.
    *   **Lottie Trigger**: `incorrectGuess(2)`
    *   **Lottie Control**: Play specific segment (e.g., frames 31-60).
*   **State 3 (3 Wrong Guesses)**: Strings attach to both legs. Puppet's stance becomes more rigid, less free.
    *   **Lottie Trigger**: `incorrectGuess(3)`
    *   **Lottie Control**: Play specific segment (e.g., frames 61-90).
*   **State 4 (4 Wrong Guesses)**: String attaches to the head. Puppet's head is pulled slightly askew, a look of despair.
    *   **Lottie Trigger**: `incorrectGuess(4)`
    *   **Lottie Control**: Play specific segment (e.g., frames 91-120).
*   **State 5 (5 Wrong Guesses - Game Over)**: Final string attaches to the torso, lifting the puppet slightly off the ground, fully suspended and lifeless. Its eyes might close or dim. This transitions directly into the Game Over animation.
    *   **Lottie Trigger**: `incorrectGuess(5)`
    *   **Lottie Control**: Play specific segment (e.g., frames 121-150) and then transition to Game Over animation (see Section 5.4).

### 2.2 Victory State
*   **Visuals**: All strings dramatically snap and recoil, freeing the puppet. The puppet performs a short, joyful, dancing animation. Spotlight widens and brightens.
*   **Lottie Animation**: A dedicated Lottie animation for this full sequence (`victory.json`).
*   **Lottie Trigger**: `gameWon()`
*   **Lottie Control**: Play `victory.json` once, then loop an ecstatic idle dance.

---

## 3. Background/Environment

The environment is a dimly lit, ornate circus tent interior, providing depth and atmosphere.

*   **Circus Tent Interior**: Layers of velvet curtains (deep red/purple), dusty wooden floorboards, and the faint outline of circular tent patterns.
*   **Depth Layers**: Multiple background layers will be used (`background-image` or stacked `div`s with `transform: translateZ()`) to create a sense of deep space behind the puppet and UI.
*   **Parallax Elements**:
    *   **Curtains**: Foremost curtains on either side will subtly move at a slower rate than the main view when player interacts or upon scene transitions (controlled via GSAP ScrollTrigger or mouse/touch movement simulation).
    *   **Spotlight**: A dramatic, movable spotlight will illuminate the puppet and the word. Its beam should have visible light rays and dust particles.
    *   **Audience Silhouettes**: Faint, stylized, motionless silhouettes of an audience in the far background, barely visible in the gloom, adding to the eerie atmosphere. These should be very subtle to avoid distraction.
*   **Atmospheric Effects**:
    *   **Dust Particles**: Subtle, slow-moving dust motes animated via a Lottie animation layer (`dust_particles.json`) over the background.
    *   **Light Rays**: Volumetric light rays emanating from the spotlight, achieved with CSS gradients (`linear-gradient`) and subtle animation (opacity, slight movement).
    *   **Haze/Fog**: A very light, transparent layer of dark purple or blue haze to soften distant elements and enhance depth.

---

## 4. Game UI Components

All UI elements will adhere to the Shadow Circus theme, appearing as if crafted props from a theatrical stage.

### 4.1 Letter Keyboard
*   **Style**: Each keycap will be designed as an individual, ornate, pseudo-3D button, possibly resembling vintage typewriter keys or old circus signage letters.
    *   **Active Keys**: Raised, with subtle rim lighting and a soft glow effect (Accent 1 or 2) on hover/focus.
    *   **Pressed State**: Key depresses slightly with a short, satisfying animation.
    *   **Correctly Guessed**: Key remains visually "pressed" or recedes, but glows with Accent 1 color.
    *   **Incorrectly Guessed**: Key remains visually "pressed" or recedes, and turns a muted, slightly desaturated dark red/gray, losing its interactive glow.
*   **Layout**: Standard QWERTY layout, optimized for mobile touch interaction (larger tap targets).
*   **Lottie Animation**: Individual Lottie animations for key press feedback (`key_press.json`), correct guess (`key_correct.json`), and incorrect guess (`key_incorrect.json`). These should be short, impactful bursts.

### 4.2 Word Display
*   **Style**: The word display will resemble a theatrical marquee or a stage sign, with individual letter slots that light up.
    *   **Undiscovered Letters**: Represented by ornate placeholders or dim, unlit slots, consistent with the overall theme.
    *   **Discovered Letters**: Revealed letters will appear in the specified game letter typography, glowing with Accent 1 (`#7B24C0`) or Accent 3 (`#FFD700`). The reveal will be accompanied by a subtle spotlight flash and a short glow animation (Lottie: `letter_reveal_glow.json`).
*   **Animation**: When a word is successfully guessed, the entire marquee should have a celebratory shimmer or twinkle animation (Lottie: `word_marquee_celebration.json`).

### 4.3 Progress Indicator (String Tension Meter)
*   **Concept**: Instead of a traditional progress bar, a visual "string tension meter" will subtly indicate the number of incorrect guesses.
*   **Visuals**: This could be a small, ornate dial or a vertical meter integrated into the puppet's scaffolding/background elements. As wrong guesses accumulate, a needle moves, or a visual indicator (e.g., a string symbol) progresses up the meter, showing increasing tension/danger.
*   **Integration**: Seamlessly blended into the background, perhaps on a side panel resembling old carnival equipment.
*   **Lottie Animation**: Small Lottie animation segments for the needle movement or indicator progression based on game state (`tension_meter_progress.json`).

### 4.4 Score/Level Display
*   **Style**: These will be presented subtly yet elegantly, perhaps etched into an ornate frame or displayed on a small, illuminated panel.
*   **Position**: Typically in the corners of the screen (top-left/top-right) to avoid distracting from the central gameplay.
*   **Animations**: Slight shimmer or glow on score updates.

---

## 5. Animation Flow

All significant game events will be accompanied by cinematic and responsive animations, heavily leveraging Lottie for complex character/UI state changes and GSAP for orchestrating UI transitions.

### 5.1 Wrong Letter
*   **Puppet Action**: When an incorrect letter is chosen, the puppet's corresponding string (based on the next wrong guess state) will quickly snap into place with a subtle "thwip" sound effect. The puppet will perform a short, sharp jerk animation in response to the string attachment (Lottie controlled by game state, see 2.1).
*   **Keyboard Feedback**: The chosen letter on the keyboard will visually "die" (turn muted red/gray and recede).
*   **Progress Indicator**: The "string tension meter" will update with a small, tense visual pulse.

### 5.2 Correct Letter
*   **Word Display**: The correctly guessed letter(s) will instantly appear in the word display with a burst of magical light/spotlight flash (Lottie: `letter_reveal_glow.json`) and a gentle, short glow animation.
*   **Keyboard Feedback**: The chosen letter on the keyboard will visually "lock in" with a magical glow (Accent 1).
*   **Overall Effect**: A momentary brightening of the scene, a soft "chime" sound effect.

### 5.3 Victory
*   **Puppet Animation**: All strings on the puppet will dramatically snap and break with visible Lottie animation (`strings_breaking.json`). The puppet then transitions into a lively, joyful dance (Lottie: `puppet_victory_dance.json`).
*   **Screen Transition**: The background might brighten slightly, or a shower of ethereal confetti/sparkles (Lottie: `celebration_confetti.json`) will fill the screen.
*   **UI Elements**: A "YOU WON!" or "FREED!" message appears in bold, glowing typography, potentially with a shimmering Lottie overlay (`victory_text_shimmer.json`). The victory screen will then load.

### 5.4 Game Over
*   **Puppet Animation**: The puppet, after its final string attachment, will freeze in a lifeless pose. The spotlight on it will dramatically dim and narrow, creating a stark, eerie silhouette. (This is the final state of the character Lottie animation `puppet_game_over_freeze.json`).
*   **Screen Transition**: Dark velvet curtains will slowly and dramatically close in from the sides of the screen, eventually covering everything, accompanied by a somber sound effect. (Lottie: `curtain_close.json`).
*   **UI Elements**: A "GAME OVER" message appears, perhaps in a faded, ghostly font, accompanied by a subtle, melancholic Lottie animation (`game_over_text_fade.json`). The game over screen will then load.

---

## 6. Screen Layouts

All screens will maintain the "Shadow Circus" theme, focusing on visual depth, dramatic lighting, and clear hierarchy.

### 6.1 Main Menu
*   **Visuals**: A grand, dramatic entrance to the circus tent. A large, ornate title (`Playfair Display`, glowing gold) for "Shadow Circus Hangman" centrally placed. The puppet might be present, in its idle State 0, subtly swaying, perhaps interacting with a small stage prop.
*   **Elements**:
    *   **Game Title**: Prominently displayed.
    *   **"Start Game" Button**: Large, inviting, pseudo-3D button with a glow effect.
    *   **"Settings" / "Credits" Buttons**: Smaller, subtler buttons, perhaps integrated into the background ornamentation.
    *   **Ambient Animation**: Subtle Lottie animations for floating dust, gentle spotlight movement.
*   **Transitions**: Smooth fade-in/scale-up for UI elements upon load.

### 6.2 Game Screen
*   **Layout**:
    *   **Top Center**: The puppet character, main visual focus.
    *   **Mid-Center**: Theatrical marquee-style word display, just below the puppet.
    *   **Bottom**: Ornate, pseudo-3D letter keyboard.
    *   **Corners**: Subtle score/level display, "Pause" button.
*   **Background**: Deep circus tent interior with parallax layers.
*   **Dynamic Elements**: Puppet state, word display, keyboard, and progress indicator will dynamically update with animations.

### 6.3 Victory Screen
*   **Visuals**: Brightened scene. The puppet is actively performing its victory dance. The background might show a glimpse of a more open, celebratory area of the circus tent, or a showering of magical particles.
*   **Elements**:
    *   **"YOU WON!" / "FREED!" Message**: Large, glowing, central.
    *   **Score/Stats**: Displayed clearly, perhaps in an ornate frame.
    *   **"Play Again" Button**: Prominent.
    *   **"Main Menu" Button**: Secondary.
    *   **Lottie Animations**: Puppet victory dance, celebration effects.

### 6.4 Game Over Screen
*   **Visuals**: Dark, somber. The puppet is frozen, suspended. The scene is enveloped by the closing velvet curtains, leaving a small, dimly lit area for text.
*   **Elements**:
    *   **"GAME OVER" Message**: Large, faded, melancholic.
    *   **The Revealed Word**: Displayed prominently for educational/closure purposes.
    *   **"Try Again" Button**: Prominent, perhaps with a subtle, somber glow.
    *   **"Main Menu" Button**: Secondary.
    *   **Lottie Animations**: Frozen puppet, closing curtains, subtle game over text animation.

---

## 7. 3D Effects Strategy (Without WebGL)

The game will achieve its "3D masterpiece" vibe primarily through advanced CSS techniques and strategic asset design, avoiding complex WebGL for broader compatibility and performance on mobile.

### 7.1 CSS 3D Transforms Usage
*   **Perspective**: The `perspective` CSS property will be applied to parent containers to establish a 3D viewing context for nested elements.
*   **`transform-style: preserve-3d`**: Used on parent elements to allow children to be positioned in 3D space relative to each other.
*   **`transform: translateZ()`**: Applied to background layers, UI elements (e.g., keyboard keys), and the puppet to position them at different depths along the Z-axis, enhancing the sense of space.
*   **`transform: rotateY()`, `rotateX()`**: Used sparingly for subtle hover effects on buttons/keys, or for very minor camera angle shifts during scene transitions.
*   **Keyframing CSS Transforms**: Animations for depth perception, e.g., elements slightly coming forward on hover.

### 7.2 Shadow Layering Technique
*   **Multiple `box-shadow`**: Instead of a single shadow, multiple `box-shadow` values will be used to simulate depth, ambient occlusion, and colored light.
    *   Example: `box-shadow: 0 5px 15px rgba(0,0,0,0.3), inset 0 -2px 5px rgba(255,255,255,0.1), 0 0 10px rgba(123, 36, 192, 0.4);`
*   **Layered Gradients**: `linear-gradient` and `radial-gradient` will be used extensively, often with `rgba` colors, to create pseudo-volumetric shapes, light sources, and to simulate depth on flat surfaces.
*   **`filter: drop-shadow()`**: Can be used on PNG assets with transparency to create realistic shadows that follow the contour of the element.

### 7.3 Depth Mapping for Parallax
*   **CSS `transform: translateZ()` with `perspective`**: Each parallax layer will be placed at a different `translateZ` value.
*   **JavaScript (GSAP)**: GSAP's `ScrollTrigger` (if applicable for scroll-based parallax, though less likely in a fixed game screen) or event listeners (mouse/touch move) will manipulate the `transform` properties of these layers (`translateX`/`translateY` and `translateZ`) based on user input or predetermined animation paths, creating the parallax effect.
*   **Visual Grouping**: Elements meant to move together will be grouped within a common transformed parent.

### 7.4 Light Source Positioning
*   **Primary Light Source**: Simulated as a dramatic spotlight from above/front, casting elongated, soft shadows. This will be the dominant light source.
*   **Secondary Light Sources**: Subtle ambient light from the sides or background, possibly colored (e.g., a faint purple glow from behind the curtains).
*   **CSS Implementation**: Achieved through careful placement of `box-shadow`, `text-shadow`, `radial-gradient` (for spotlight cones), and `filter: brightness()`/`contrast()` to simulate highlights and dim areas.
*   **Lottie Integration**: Lottie animations can contribute dynamic light elements like shimmering glows, sparkling effects, and moving light rays to enhance the perceived light source.

---

**Important Considerations for Developers:**

*   **Performance**: Prioritize CSS `transform` and `opacity` for animations where possible, as they are GPU-accelerated. Be mindful of complex `box-shadow` and `filter` usage on performance-critical elements.
*   **Lottie Integration**: All Lottie animations should be loaded efficiently. Utilize `lottie-web` for rendering. Ensure correct frame segments are played for specific states (e.g., puppet states, button feedback).
*   **Mobile Responsiveness**: Designs should scale gracefully across various mobile screen sizes. Flexible layouts (Flexbox, Grid) and `vw`/`vh` units are recommended.
*   **Accessibility**: Ensure sufficient contrast for text and interactive elements.
*   **Asset Management**: Organize Lottie JSON files and image assets (`.png` for transparency with `drop-shadow`) in a clear structure as suggested in `research.md` (e.g., `assets/lottie/`, `assets/images/`).
*   **Interaction Feedback**: Every user interaction (button press, letter selection) should have immediate and thematic visual and auditory feedback.
