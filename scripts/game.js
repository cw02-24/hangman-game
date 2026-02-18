/**
 * Shadow Circus Hangman - Game Logic
 */

import { UI } from './ui.js';

// Word list for the game
const WORDS = [
  'CIRCUS', 'PUPPET', 'MAGIC', 'SHADOW', 'THEATER',
  'PERFORM', 'ACROBAT', 'JUGGLER', 'TIGHTROPE', 'CLOWN',
  'MAGNET', 'MIDNIGHT', 'MYSTERY', 'WHISPER', 'ILLUSION',
  'CARNIVAL', 'SPECTACLE', 'ENTERTAINER', 'CONTORTIONIST', 'ESCAPE',
  'FREEDOM', 'STRINGS', 'MARIONETTE', 'VIBRANT', 'MYSTICAL',
  'ENIGMA', 'RIDDLE', 'PUZZLE', 'SECRET', 'FANTASY'
];

export class Game {
  constructor(animations, lottieLoader) {
    this.animations = animations;
    this.lottieLoader = lottieLoader;
    this.ui = new UI(lottieLoader);
    this.word = '';
    this.guessedLetters = new Set();
    this.wrongGuesses = 0;
    this.maxWrongGuesses = 5;
    this.score = 0;
    this.isGameOver = false;
  }

  async newGame() {
    // Reset state
    this.word = this.getRandomWord();
    this.guessedLetters = new Set();
    this.wrongGuesses = 0;
    this.isGameOver = false;
    
    // Render/Reset UI using the UI class
    this.ui.renderKeyboard(this.guessedLetters, this.handleGuess.bind(this));
    this.ui.renderWord(this.word, this.guessedLetters);
    this.ui.updateScore(0);
    this.ui.updateWrongGuessCount(this.wrongGuesses, this.maxWrongGuesses);

    // Load and reset puppet animation for the game screen
    await this.animations?.loadGamePuppet();
    this.animations?.resetPuppet();
    
    console.log('🎯 New game started. Word:', this.word);
  }

  getRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  handleGuess(letter) {
    if (this.isGameOver) return;
    if (this.guessedLetters.has(letter)) return;
    
    this.guessedLetters.add(letter);
    
    if (this.word.includes(letter)) {
      // Correct guess
      this.ui.updateKeyboardKey(letter, true);
      const revealedIndexes = this.revealLetters(letter);
      this.animations?.onCorrectLetter(letter, revealedIndexes); // Pass revealedIndexes for precise animation
      
      // Check win
      if (this.checkWin()) {
        this.onWin();
      }
    } else {
      // Wrong guess
      this.ui.updateKeyboardKey(letter, false);
      this.wrongGuesses++;
      this.ui.updateWrongGuessCount(this.wrongGuesses, this.maxWrongGuesses);
      this.animations?.onWrongLetter(this.wrongGuesses); // This is for Issue #10
      
      // Check lose
      if (this.wrongGuesses >= this.maxWrongGuesses) {
        this.onLose();
      }
    }
  }

  revealLetters(letter) {
    const revealedIndexes = [];
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] === letter) {
        revealedIndexes.push(i);
      }
    }
    this.ui.revealLetterInWordDisplay(letter, revealedIndexes);
    return revealedIndexes; // Return indexes for animation orchestration
  }

  checkWin() {
    for (const char of this.word) {
      if (!this.guessedLetters.has(char)) {
        return false;
      }
    }
    return true;
  }

  onWin() {
    this.isGameOver = true;
    const pointsEarned = (this.maxWrongGuesses - this.wrongGuesses + 1) * 100;
    this.ui.updateScore(this.score + pointsEarned);
    
    // Show victory screen
    setTimeout(() => {
      document.getElementById('victory-word').textContent = this.word;
      document.getElementById('victory-score').textContent = this.score.toString(); // Ensure it's a string
      this.animations?.playVictory();
      
      this.ui.showScreen('victory-screen');
    }, 500);
  }

  onLose() {
    this.isGameOver = true;
    
    // Show game over screen
    setTimeout(() => {
      document.getElementById('gameover-word').textContent = this.word;
      this.animations?.playGameOver();
      
      this.ui.showScreen('gameover-screen');
    }, 1000);
  }
}

export { WORDS };