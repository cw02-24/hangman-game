/**
 * Shadow Circus Hangman - UI Logic
 */

export class UI {
  constructor(lottieLoader) {
    this.lottieLoader = lottieLoader;
    this.keyboardElement = document.getElementById('keyboard');
    this.wordDisplayElement = document.getElementById('word-display');
    this.scoreDisplayElement = document.getElementById('score');
    this.wrongCountDisplayElement = document.getElementById('wrong-count');
    this.tensionFillElement = document.querySelector('.tension-fill');
  }

  renderKeyboard(guessedLetters, handleGuess) {
    if (!this.keyboardElement) return;

    const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    this.keyboardElement.innerHTML = '';

    letters.split('').forEach(letter => {
      const key = document.createElement('button');
      key.className = 'key';
      key.dataset.letter = letter;
      key.textContent = letter;
      
      // Apply correct/wrong styles if already guessed
      if (guessedLetters.has(letter)) {
        // We'll add logic here to differentiate correct/wrong later if needed,
        // but for now, just mark it as guessed to disable further interaction.
        // A full state will be managed by game.js and animations.js
        key.classList.add('guessed'); 
        key.disabled = true; // Disable interaction for already guessed letters
      }

      key.addEventListener('click', () => handleGuess(letter));
      this.keyboardElement.appendChild(key);
    });
  }

  renderWord(word, guessedLetters) {
    if (!this.wordDisplayElement) return;

    this.wordDisplayElement.innerHTML = '';

    word.split('').forEach((letter, index) => {
      const slot = document.createElement('div');
      slot.className = 'letter-slot';
      slot.dataset.index = index.toString();
      slot.dataset.letter = letter;
      if (guessedLetters.has(letter)) {
        slot.textContent = letter;
        slot.classList.add('revealed');
      } else {
        // Placeholder for unguessed letters
        slot.textContent = ''; 
      }
      this.wordDisplayElement.appendChild(slot);
    });
  }

  revealLetterInWordDisplay(letter, indexes) {
    indexes.forEach(index => {
      const slot = this.wordDisplayElement?.querySelector(`.letter-slot[data-index="${index}"][data-letter="${letter}"]`);
      if (slot && !slot.classList.contains('revealed')) {
        slot.textContent = letter;
        slot.classList.add('revealed');
        // Trigger sparkle animation here
        this.lottieLoader.playTemporaryAnimation('sparkle', '/assets/lottie/sparkle.json', slot);
      }
    });
  }

  updateKeyboardKey(letter, isCorrect) {
    const key = this.keyboardElement?.querySelector(`.key[data-letter="${letter}"]`);
    if (key) {
      key.disabled = true;
      if (isCorrect) {
        key.classList.add('correct');
        this.lottieLoader.playTemporaryAnimation('key_correct', '/assets/lottie/key_correct.json', key);
      } else {
        key.classList.add('wrong');
        this.lottieLoader.playTemporaryAnimation('key_incorrect', '/assets/lottie/key_incorrect.json', key); 
      }
    }
  }

  updateScore(score) {
    if (this.scoreDisplayElement) {
      this.scoreDisplayElement.textContent = score.toString();
    }
  }

  updateWrongGuessCount(wrongGuesses, maxWrongGuesses) {
    if (this.wrongCountDisplayElement) {
      this.wrongCountDisplayElement.textContent = `${wrongGuesses}/${maxWrongGuesses}`;
    }
    // Logic for tension meter Lottie will be handled by animations.js
  }

  // Placeholder for screen transitions, will be expanded in later issues
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId)?.classList.add('active');
  }
}
