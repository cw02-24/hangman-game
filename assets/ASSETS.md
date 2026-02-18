# Assets Manifest - Shadow Circus Hangman

## Lottie Animations (`/assets/lottie/`)

| File | Description | Usage |
|------|-------------|-------|
| `puppet_states.json` | Main puppet with 6 states (0-5 strings) | Core gameplay - markers for each state |
| `puppet_victory.json` | Strings break + puppet dances | Win screen |
| `puppet_gameover.json` | Puppet freezes + dark vignette | Game over screen |
| `confetti.json` | Falling confetti particles | Victory celebration overlay |
| `victory.json` | Golden star burst | Victory screen accent |
| `sparkle.json` | Small sparkle effect | Letter reveal, correct guess |
| `loading.json` | Purple spinner | Loading states |
| `dust_particles.json` | Ambient floating particles | Background atmosphere |

### Puppet States Animation Markers
Use `puppet_states.json` with Lottie's `goToAndStop()` or marker-based playback:

| Marker Name | Frame | Game State |
|-------------|-------|------------|
| `state_0_free` | 0 | 0 wrong guesses (initial) |
| `state_1_left_arm_string` | 35 | 1 wrong guess |
| `state_2_right_arm_string` | 65 | 2 wrong guesses |
| `state_3_head_string` | 95 | 3 wrong guesses |
| `state_4_left_leg_string` | 125 | 4 wrong guesses |
| `state_5_right_leg_string` | 155 | 5 wrong guesses (game over) |

## Images (`/assets/images/`)

### Backgrounds (`/assets/images/backgrounds/`)
| File | Description | Usage |
|------|-------------|-------|
| `dark_stage.jpg` | Dark theatrical stage | Main game background |
| `circus_tent.jpg` | Circus tent interior | Menu/alt background |
| `spotlight.jpg` | Dramatic spotlight | Overlay effect |

### UI Elements (`/assets/images/ui/`)
| File | Description | Usage |
|------|-------------|-------|
| `button_glow.png` | Glowing button icon | UI buttons |
| `star.png` | Star icon | Score, achievements |
| `crown.png` | Crown icon | High score, level indicator |

### Character (`/assets/images/character/`)
*Reserved for static character assets, overlays, or sprite sheets*

## Sounds (`/assets/sounds/`)
*Reserved for:
- `correct.mp3` - Correct letter chime
- `wrong.mp3` - Wrong letter sound
- `victory.mp3` - Victory fanfare
- `gameover.mp3` - Game over somber tone
- `ambient.mp3` - Background circus music*

## Color Palette Reference

| Name | Hex | Usage |
|------|-----|-------|
| Primary Dark | `#1A0A2A` | Backgrounds |
| Secondary Dark | `#2C1E4F` | UI panels |
| Accent 1 (Magic) | `#7B24C0` | Interactive elements |
| Accent 2 (Cyan) | `#4FC3F7` | Effects, strings glow |
| Accent 3 (Gold) | `#FFD700` | Marquee, important text |
| Error/Danger | `#D32F2F` | Wrong guesses |

## Source Attribution

- **LottieFiles**: https://lottiefiles.com (free animations, account required for most)
- **Unsplash**: https://unsplash.com (background images, free no attribution)
- **Flaticon**: https://flaticon.com (icons, free with attribution)
- **Custom Lottie**: Created in-house for puppet animations

## Next Steps

1. Source additional premium Lottie animations from LottieFiles
2. Create/find background music
3. Find sound effects (correct/wrong/victory/gameover)
4. Optionally create SVG puppet for sharper scaling