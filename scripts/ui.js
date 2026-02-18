/**
 * Shadow Circus Hangman - UI Controller
 * Handles all direct DOM manipulation and UI rendering
 */

import { LottieLoader } from './lottie-loader.js';

export class UI {
  constructor(lottieLoader) {
    this.lottieLoader = lottieLoader;
    this.keyboardElement = document.getElementById('keyboard');
    this.wordDisplayElement = document.getElementById('word-display');
    this.scoreDisplayElement = document.getElementById('score');
    this.wrongCountDisplayElement = document.getElementById('wrong-count');
    this.tensionFillElement = document.querySelector('.tension-fill');

    // Ensure all screens are hidden initially except loading
    this.screens = {
      loading: document.getElementById('loading-screen'),
      menu: document.getElementById('menu-screen'),
      game: document.getElementById('game-screen'),
      victory: document.getElementById('victory-screen'),
      gameover: document.getElementById('gameover-screen'),
    };
  }

  showScreen(screenName) {
    for (const key in this.screens) {
      if (this.screens[key]) {
        this.screens[key].classList.remove('active');
      }
    }
    if (this.screens[screenName]) {
      this.screens[screenName].classList.add('active');
    }
  }

  renderKeyboard(guessedLetters, handleGuessCallback) {
    if (!this.keyboardElement) return;
    
    const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    this.keyboardElement.innerHTML = '';
    
    letters.split('').forEach(letter => {
      const key = document.createElement('button');
      key.className = 'key';
      key.dataset.letter = letter;
      key.textContent = letter;
      key.disabled = guessedLetters.has(letter);
      if (guessedLetters.has(letter)) {
        // Apply appropriate class if already guessed (e.g., correct/wrong handled by updateKeyboardKey)
        // For initial render, just disable
      }
      key.addEventListener('click', () => handleGuessCallback(letter));
      this.keyboardElement.appendChild(key);
    });
  }

  updateKeyboardKey(letter, isCorrect) {
    const key = this.keyboardElement?.querySelector(`[data-letter="${letter}"]`);
    if (key) {
      key.disabled = true;
      if (isCorrect) {
        key.classList.add('correct');
        // Optional: play a short Lottie animation for correct key feedback
        // this.lottieLoader.playTemporaryAnimation('key_correct', '/assets/lottie/key_correct.json', key);
      } else {
        key.classList.add('wrong');
        // Optional: play a short Lottie animation for wrong key feedback
        // this.lottieLoader.playTemporaryAnimation('key_wrong', '/assets/lottie/key_wrong.json', key);
      }
    }
  }

  renderWord(word, guessedLetters) {
    if (!this.wordDisplayElement) return;
    
    this.wordDisplayElement.innerHTML = '';
    
    word.split('').forEach((char, index) => {
      const slot = document.createElement('div');
      slot.className = 'letter-slot';
      slot.dataset.index = index;
      slot.dataset.letter = char;
      if (guessedLetters.has(char)) {
        slot.textContent = char;
        slot.classList.add('revealed');
      }
      this.wordDisplayElement.appendChild(slot);
    });
  }

  revealLetterInWordDisplay(letter, revealedIndexes) {
    const slots = this.wordDisplayElement?.querySelectorAll('.letter-slot');
    slots?.forEach(slot => {
      if (slot.dataset.letter === letter) {
        slot.textContent = letter;
        slot.classList.add('revealed');
        // Trigger sparkle animation for revealed letter
        this.lottieLoader.playTemporaryAnimation('sparkle', '/assets/lottie/sparkle.json', slot);
      }
    });
  }

  updateScore(newScore) {
    if (this.scoreDisplayElement) {
      this.scoreDisplayElement.textContent = newScore.toString();
    }
  }

  updateWrongGuessCount(wrongGuesses, maxWrongGuesses) {
    if (this.wrongCountDisplayElement) {
      this.wrongCountDisplayElement.textContent = `${wrongGuesses}/${maxWrongGuesses}`;
    }
    if (this.tensionFillElement) {
      const percentage = (wrongGuesses / maxWrongGuesses) * 100;
      this.tensionFillElement.style.width = `${percentage}%`;
    }
  }
}