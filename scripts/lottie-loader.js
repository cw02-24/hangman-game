/**
 * Shadow Circus Hangman - Lottie Loader
 * Utility class for loading and controlling Lottie animations
 */

import lottie from 'lottie-web';

export class LottieLoader {
  constructor() {
    this.animations = new Map(); // Stores persistent animation instances
    this.cache = new Map();      // Caches animation data (JSON)
    this.tempAnimationIdCounter = 0;
  }

  /**
   * Fetches animation data from path or cache.
   * @param {string} path - Path to the JSON file.
   * @returns {Promise<Object>} - Resolves to animation data.
   */
  async getAnimationData(path) {
    if (this.cache.has(path)) {
      return this.cache.get(path);
    }

    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load animation data: ${path}`);
      }
      const animationData = await response.json();
      this.cache.set(path, animationData);
      return animationData;
    } catch (error) {
      console.error(`Error fetching animation data for ${path}:`, error);
      return null;
    }
  }

  /**
   * Load a persistent Lottie animation.
   * @param {string} name - Unique name for the animation.
   * @param {string} path - Path to the JSON file.
   * @param {Object} options - Animation options (container, loop, autoplay, etc.).
   * @returns {Promise<Object|null>} - Resolves to animation instance or null if failed.
   */
  async load(name, path, options = {}) {
    const animationData = await this.getAnimationData(path);
    if (!animationData) return null;

    const {
      container,
      loop = true,
      autoplay = true,
      renderer = 'svg'
    } = options;

    if (!container) {
      console.warn(`No container provided for persistent animation: ${name}`);
      return null;
    }

    const animation = lottie.loadAnimation({
      container: container,
      renderer: renderer,
      loop: loop,
      autoplay: autoplay,
      animationData: animationData
    });

    this.animations.set(name, animation);
    return animation;
  }

  /**
   * Play a temporary, one-shot Lottie animation on a specific element.
   * The animation instance is destroyed after completion.
   * @param {string} animationName - The name of the animation (e.g., 'sparkle', 'key_correct').
   * @param {string} path - Path to the Lottie JSON file.
   * @param {HTMLElement} containerElement - The DOM element where the animation should play.
   * @param {Object} options - Options for the animation (e.g., loop, speed).
   * @returns {Promise<Object|null>} - Resolves to the animation instance, or null if it fails.
   */
  async playTemporaryAnimation(animationName, path, containerElement, options = {}) {
    const animationData = await this.getAnimationData(path);
    if (!animationData) return null;

    const tempId = `${animationName}-${this.tempAnimationIdCounter++}`;

    const anim = lottie.loadAnimation({
      container: containerElement,
      renderer: options.renderer || 'svg',
      loop: options.loop || false,
      autoplay: false, // We'll play it manually
      animationData: animationData,
      name: tempId, // Assign a temporary name for tracking
    });

    if (options.speed) {
      anim.setSpeed(options.speed);
    }

    // Remove the animation instance from lottie-web's internal registry after it completes
    anim.addEventListener('complete', () => {
      anim.destroy();
      // console.log(`Temporary animation ${tempId} destroyed.`);
    });

    anim.play();
    return anim;
  }

  /**
   * Get a loaded persistent animation by name.
   */
  get(name) {
    return this.animations.get(name);
  }

  /**
   * Play a persistent animation.
   */
  play(name) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.play();
    }
  }

  /**
   * Pause a persistent animation.
   */
  pause(name) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.pause();
    }
  }

  /**
   * Stop a persistent animation.
   */
  stop(name) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.stop();
    }
  }

  /**
   * Go to a specific frame of a persistent animation.
   */
  goToFrame(name, frame, isFrame = true) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.goToAndStop(frame, isFrame);
    }
  }

  /**
   * Play a segment of a persistent animation.
   */
  playSegment(name, startFrame, endFrame, forceFlag = true) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.playSegments([startFrame, endFrame], forceFlag);
    }
  }

  /**
   * Set speed for a persistent animation.
   */
  setSpeed(name, speed) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.setSpeed(speed);
    }
  }

  /**
   * Set direction for a persistent animation (1 for forward, -1 for reverse).
   */
  setDirection(name, direction) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.setDirection(direction);
    }
  }

  /**
   * Add event listener to a persistent animation.
   */
  on(name, event, callback) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.addEventListener(event, callback);
    }
  }

  /**
   * Destroy a persistent animation.
   */
  destroy(name) {
    const animation = this.animations.get(name);
    if (animation) {
      animation.destroy();
      this.animations.delete(name);
    }
  }

  /**
   * Destroy all persistent animations.
   */
  destroyAll() {
    this.animations.forEach((animation, name) => {
      animation.destroy();
    });
    this.animations.clear();
  }
}

export default LottieLoader;
