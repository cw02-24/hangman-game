/**
 * Shadow Circus Hangman - Game Logic
 */

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
    this.word = '';
    this.guessedLetters = new Set();
    this.wrongGuesses = 0;
    this.maxWrongGuesses = 5;
    this.score = 0;
    this.isGameOver = false;
    this.keyboard = null;
    this.wordDisplay = null;
    this.scoreDisplay = null;
    this.wrongCountDisplay = null;
    this.tensionFill = null;
  }

  async newGame() { // Made async to await loadGamePuppet()
    // Reset state
    this.word = this.getRandomWord();
    this.guessedLetters = new Set();
    this.wrongGuesses = 0;
    this.isGameOver = false;
    
    // Get DOM elements
    this.keyboard = document.getElementById('keyboard');
    this.wordDisplay = document.getElementById('word-display');
    this.scoreDisplay = document.getElementById('score');
    this.wrongCountDisplay = document.getElementById('wrong-count');
    this.tensionFill = document.querySelector('.tension-fill');
    
    // Reset UI
    this.renderKeyboard();
    this.renderWord();
    this.updateScore(0);
    this.updateProgress();

    // Load and reset puppet animation for the game screen
    await this.animations?.loadGamePuppet();
    this.animations?.resetPuppet(); // This was already here, but now it will act on the loaded puppet.
    
    console.log('🎯 New game started. Word:', this.word);
  }

  getRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  renderKeyboard() {
    if (!this.keyboard) return;
    
    const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    this.keyboard.innerHTML = '';
    
    letters.split('').forEach(letter => {
      const key = document.createElement('button');
      key.className = 'key';
      key.dataset.letter = letter;
      key.textContent = letter;
      key.addEventListener('click', () => this.handleGuess(letter));
      this.keyboard.appendChild(key);
    });
  }

  renderWord() {
    if (!this.wordDisplay) return;
    
    this.wordDisplay.innerHTML = '';
    
    this.word.split('').forEach((letter, index) => {
      const slot = document.createElement('div');
      slot.className = 'letter-slot';
      slot.dataset.index = index;
      slot.dataset.letter = letter;
      this.wordDisplay.appendChild(slot);
    });
  }

  handleGuess(letter) {
    if (this.isGameOver) return;
    if (this.guessedLetters.has(letter)) return;
    
    this.guessedLetters.add(letter);
    const key = this.keyboard?.querySelector(`[data-letter="${letter}"]`);
    
    if (this.word.includes(letter)) {
      // Correct guess
      key?.classList.add('correct');
      this.revealLetters(letter);
      this.animations?.onCorrectLetter(letter);
      
      // Check win
      if (this.checkWin()) {
        this.onWin();
      }
    } else {
      // Wrong guess
      key?.classList.add('wrong');
      this.wrongGuesses++;
      this.updateProgress();
      this.animations?.onWrongLetter(this.wrongGuesses);
      
      // Check lose
      if (this.wrongGuesses >= this.maxWrongGuesses) {
        this.onLose();
      }
    }
  }

  revealLetters(letter) {
    const slots = this.wordDisplay?.querySelectorAll('.letter-slot');
    slots?.forEach(slot => {
      if (slot.dataset.letter === letter) {
        slot.textContent = letter;
        slot.classList.add('revealed');
      }
    });
  }

  checkWin() {
    const slots = this.wordDisplay?.querySelectorAll('.letter-slot');
    const allRevealed = Array.from(slots || []).every(slot => slot.classList.contains('revealed'));
    return allRevealed;
  }

  onWin() {
    this.isGameOver = true;
    const pointsEarned = (this.maxWrongGuesses - this.wrongGuesses + 1) * 100;
    this.updateScore(this.score + pointsEarned);
    
    // Show victory screen
    setTimeout(() => {
      document.getElementById('victory-word').textContent = this.word;
      document.getElementById('victory-score').textContent = this.score;
      this.animations?.playVictory();
      
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById('victory-screen')?.classList.add('active');
    }, 500);
  }

  onLose() {
    this.isGameOver = true;
    
    // Show game over screen
    setTimeout(() => {
      document.getElementById('gameover-word').textContent = this.word;
      this.animations?.playGameOver();
      
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById('gameover-screen')?.classList.add('active');
    }, 1000);
  }

  updateScore(newScore) {
    this.score = newScore;
    if (this.scoreDisplay) {
      this.scoreDisplay.textContent = this.score;
    }
  }

  updateProgress() {
    if (this.wrongCountDisplay) {
      this.wrongCountDisplay.textContent = `${this.wrongGuesses}/${this.maxWrongGuesses}`;
    }
    
    if (this.tensionFill) {
      const percentage = (this.wrongGuesses / this.maxWrongGuesses) * 100;
      this.tensionFill.style.width = `${percentage}%`;
    }
  }
}

export { WORDS };