/**
 * Shadow Circus Hangman - Lottie Loader
 * Utility class for loading and controlling Lottie animations
 */

import lottie from 'lottie-web';

export class LottieLoader {
  constructor() {
    this.animations = new Map();
    this.cache = new Map();
  }

  /**
   * Load a Lottie animation
   * @param {string} name - Unique name for the animation
   * @param {string} path - Path to the JSON file
   * @param {Object} options - Animation options
   * @returns {Promise} - Resolves to animation instance
   */
  async load(name, path, options = {}) {
    // Check cache first
    if (this.cache.has(path)) {
      console.log(`📦 Using cached animation: ${name}`);
      const cachedData = this.cache.get(path);
      return this.createFromData(name, cachedData, options);
    }

    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load animation: ${path}`);
      }
      
      const animationData = await response.json();
      
      // Cache the data
      this.cache.set(path, animationData);
      
      return this.createFromData(name, animationData, options);
    } catch (error) {
      console.warn(`⚠️ Could not load animation: ${name} from ${path}`, error);
      return null;
    }
  }

  /**
   * Create animation from cached data
   */
  createFromData(name, animationData, options) {
    const {
      container,
      loop = true,
      autoplay = true,
      renderer = 'svg'
    } = options;

    if (!container) {
      console.warn(`No container for animation: ${name}`);
      return null;
    }

    const animation = lottie.loadAnimation({
      container: container,
      renderer: renderer,
      loop: loop,
      autoplay: autoplay,
      animationData: animationData
    });

    // Store reference
    this.animations.set(name, animation);

    return animation;
  }

  /**
   * Get a loaded animation by name
   */
  get(name) {
    return this.animations.get(name);
  }

  /**
   * Play an animation
   */
  play(name) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.play();
    }
  }

  /**
   * Pause an animation
   */
  pause(name) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.pause();
    }
  }

  /**
   * Stop an animation
   */
  stop(name) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.stop();
    }
  }

  /**
   * Go to a specific frame
   */
  goToFrame(name, frame, isFrame = true) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.goToAndStop(frame, isFrame);
    }
  }

  /**
   * Play a segment
   */
  playSegment(name, startFrame, endFrame, forceFlag = true) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.playSegments([startFrame, endFrame], forceFlag);
    }
  }

  /**
   * Set speed
   */
  setSpeed(name, speed) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.setSpeed(speed);
    }
  }

  /**
   * Set direction (1 for forward, -1 for reverse)
   */
  setDirection(name, direction) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.setDirection(direction);
    }
  }

  /**
   * Add event listener
   */
  on(name, event, callback) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.addEventListener(event, callback);
    }
  }

  /**
   * Destroy an animation
   */
  destroy(name) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.destroy();
      this.animations.delete(name);
    }
  }

  /**
   * Destroy all animations
   */
  destroyAll() {
    this.animations.forEach((animation, name) => {
      animation.destroy();
    });
    this.animations.clear();
  }
}

export default LottieLoader;