/**
 * Shadow Circus Hangman - Main Entry Point
 */

import { Game } from './game.js';
import { AnimationController } from './animations.js';
import { LottieLoader } from './lottie-loader.js';
import { UI } from './ui.js'; // Import UI class

class App {
  constructor() {
    this.game = null;
    this.animations = null;
    this.lottieLoader = null;
    this.ui = null; // Add UI instance
    this.currentScreen = 'loading';
  }

  async init() {
    // Initialize Lottie loader
    this.lottieLoader = new LottieLoader();
    
    // Initialize UI
    this.ui = new UI(this.lottieLoader); // Initialize UI with lottieLoader

    // Initialize animation controller
    this.animations = new AnimationController(this.lottieLoader, this.ui); // Pass UI to animations
    
    // Preload critical animations
    await this.preloadAnimations();
    
    // Initialize game
    this.game = new Game(this.animations, this.lottieLoader, this.ui); // Pass UI to game
    
    // Bind events
    this.bindEvents();
    
    // Show menu
    this.showScreen('menu');
    
    console.log('🎮 Shadow Circus Hangman initialized');
  }

  async preloadAnimations() {
    const animationsToLoad = [
      { name: 'loading', path: '/assets/lottie/loading.json', container: 'loading-spinner', loop: true },
      { name: 'dust', path: '/assets/lottie/dust_particles.json', container: 'dust-layer', loop: true },
      { name: 'puppet_idle', path: '/assets/lottie/puppet_states.json', container: 'menu-puppet', loop: true, autoplay: true }
    ];

    for (const anim of animationsToLoad) {
      await this.lottieLoader.load(anim.name, anim.path, {
        container: document.getElementById(anim.container),
        loop: anim.loop !== false,
        autoplay: anim.autoplay !== false
      });
    }
  }

  bindEvents() {
    // Menu button
    document.getElementById('start-btn')?.addEventListener('click', async () => {
      await this.startGame();
    });

    // Play again buttons
    document.getElementById('play-again-btn')?.addEventListener('click', async () => {
      await this.startGame();
    });

    document.getElementById('try-again-btn')?.addEventListener('click', async () => {
      await this.startGame();
    });

    // Menu buttons
    document.getElementById('menu-btn-victory')?.addEventListener('click', () => {
      this.showScreen('menu');
    });

    document.getElementById('menu-btn-gameover')?.addEventListener('click', () => {
      this.showScreen('menu');
    });

    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (this.currentScreen === 'game' && this.game) {
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
          this.game.handleGuess(key);
        }
      }
    });
  }

  async startGame() {
    this.ui.showScreen('game'); // Use UI class to show screen
    await this.game?.newGame();
  }

  showScreen(screenName) {
    this.ui.showScreen(`${screenName}-screen`); // Use UI class to show screen
    this.currentScreen = screenName;

    // Screen-specific actions
    if (screenName === 'menu') {
      this.animations?.playMenuIdle();
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});

export { App };