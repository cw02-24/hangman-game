/**
 * Shadow Circus Hangman - Animation Controller
 * Handles GSAP timelines and Lottie animation triggers
 */

import gsap from 'gsap';

export class AnimationController {
  constructor(lottieLoader) {
    this.lottieLoader = lottieLoader;
    this.puppetAnimation = null;
    this.confettiAnimation = null;
  }

  // ==================== PUPPET ANIMATIONS ====================

  async loadGamePuppet() {
    this.puppetAnimation = await this.lottieLoader.load('puppet_game', '/assets/lottie/puppet_states.json', {
      container: document.getElementById('puppet'),
      loop: false,
      autoplay: false
    });
    
    // Start at state 0 (free)
    this.resetPuppet();
  }

  resetPuppet() {
    if (!this.puppetAnimation) return;
    this.puppetAnimation.goToAndStop(0, true);
  }

  setPuppetState(wrongCount) {
    if (!this.puppetAnimation) return;
    
    // Frame markers from puppet_states.json
    const frameMarkers = [0, 35, 65, 95, 125, 155];
    const frame = frameMarkers[Math.min(wrongCount, 5)];
    
    gsap.to('#puppet', {
      x: -5,
      duration: 0.05,
      yoyo: true,
      repeat: 3,
      onComplete: () => {
        this.puppetAnimation.goToAndStop(frame, true);
        gsap.set('#puppet', { x: 0 });
      }
    });
  }

  // ==================== MENU ANIMATIONS ====================

  playMenuIdle() {
    // Animate title
    gsap.from('.game-title', {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });

    gsap.from('.game-subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.2
    });

    gsap.from('#start-btn', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: 0.4,
      ease: 'power2.out'
    });
  }

  // ==================== GAME ANIMATIONS ====================

  // Refactored to accept revealedIndexes for precise animation
  onCorrectLetter(letter, revealedIndexes) {
    // No longer animating the key here, UI class handles Lottie for key.
    // Animate *specific* revealed letters
    revealedIndexes.forEach((index, i) => {
      const slot = document.querySelector(`.letter-slot[data-index="${index}"]`);
      if (slot) {
        gsap.fromTo(slot, 
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.3, 
            delay: i * 0.05, 
            ease: 'back.out(2)', 
            onComplete: () => {
              // Ensure any text content is correctly set after animation if needed
            }
          }
        );
      }
    });
  }

  onWrongLetter(wrongCount) {
    // The UI class handles Lottie for key, so no need for GSAP animation here for the key.

    // Update puppet state
    this.setPuppetState(wrongCount);

    // Shake the game container
    gsap.to('.puppet-container', {
      x: -3,
      duration: 0.05,
      yoyo: true,
      repeat: 5
    });
  }

  // ==================== VICTORY ANIMATIONS ====================

  async playVictory() {
    // Load victory puppet animation
    await this.lottieLoader.load('victory_puppet', '/assets/lottie/puppet_victory.json', {
      container: document.getElementById('victory-puppet'),
      loop: true,
      autoplay: true
    });

    // Load confetti
    await this.lottieLoader.load('confetti', '/assets/lottie/confetti.json', {
      container: document.getElementById('confetti-container'),
      loop: true,
      autoplay: true
    });

    // Play victory star
    this.lottieLoader.load('victory_star', '/assets/lottie/victory.json', {
      container: document.querySelector('.victory-title'),
      loop: false,
      autoplay: true
    });

    gsap.from('.victory-title', {
      scale: 0,
      rotation: -180,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });

    gsap.from('.result-stats', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 0.3
    });

    gsap.from('#play-again-btn', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 0.5
    });
  }

  // ==================== GAME OVER ANIMATIONS ====================

  async playGameOver() {
    // Load game over puppet animation
    await this.lottieLoader.load('gameover_puppet', '/assets/lottie/puppet_gameover.json', {
      container: document.getElementById('gameover-puppet'),
      loop: false,
      autoplay: true
    });

    // Animate curtains closing
    gsap.to('.curtain-left', {
      x: '20%',
      duration: 1.5,
      ease: 'power2.inOut'
    });

    gsap.to('.curtain-right', {
      x: '-20%',
      duration: 1.5,
      ease: 'power2.inOut'
    });

    gsap.from('.gameover-title', {
      opacity: 0,
      duration: 1,
      delay: 1
    });

    gsap.from('.result-stats', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 1.3
    });
  }

  // ==================== UTILITY ANIMATIONS ====================

  // playSparkle is now handled by UI.js through lottieLoader.playTemporaryAnimation
  // and thus removed from here.

  // Screen transitions
  transitionTo(screenName, callback) {
    const currentScreen = document.querySelector('.screen.active');
    
    if (currentScreen) {
      gsap.to(currentScreen, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          currentScreen.classList.remove('active');
          callback?.();
          
          const newScreen = document.getElementById(`${screenName}-screen`);
          if (newScreen) {
            gsap.fromTo(newScreen, 
              { opacity: 0 },
              { opacity: 1, duration: 0.3 }
            );
            newScreen.classList.add('active');
          }
        }
      });
    } else {
      callback?.();
    }
  }
}