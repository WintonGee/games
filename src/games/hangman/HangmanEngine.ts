import { GameEngine } from '../../types/game';

export interface HangmanState {
  word: string;
  guessedLetters: Set<string>;
  currentPlayer: number;
  remainingGuesses: number;
  winner: number | null;
  isDraw: boolean;
  isGameOver: boolean;
}

const WORD_LIST = [
  'JAVASCRIPT',
  'TYPESCRIPT',
  'PROGRAMMING',
  'COMPUTER',
  'ALGORITHM',
  'FUNCTION',
  'VARIABLE',
  'INTERFACE',
  'COMPONENT',
  'DEVELOPER',
  'SOFTWARE',
  'INTERNET',
  'DATABASE',
  'NETWORK',
  'SECURITY',
  'FRAMEWORK',
  'LIBRARY',
  'CONSOLE',
  'BROWSER',
  'DEBUGGING',
];

const MAX_WRONG_GUESSES = 6;

class HangmanEngine implements GameEngine<HangmanState> {
  getInitialState(): HangmanState {
    return {
      word: this.getRandomWord(),
      guessedLetters: new Set(),
      currentPlayer: 1,
      remainingGuesses: MAX_WRONG_GUESSES,
      winner: null,
      isDraw: false,
      isGameOver: false,
    };
  }

  private getRandomWord(): string {
    return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
  }

  makeMove(state: HangmanState, letter: string): HangmanState {
    const upperLetter = letter.toUpperCase();

    if (
      state.isGameOver ||
      state.guessedLetters.has(upperLetter) ||
      !/^[A-Z]$/.test(upperLetter)
    ) {
      return state;
    }

    const newGuessedLetters = new Set(state.guessedLetters);
    newGuessedLetters.add(upperLetter);

    const isCorrectGuess = state.word.includes(upperLetter);
    const newRemainingGuesses = isCorrectGuess
      ? state.remainingGuesses
      : state.remainingGuesses - 1;

    const newState = {
      ...state,
      guessedLetters: newGuessedLetters,
      remainingGuesses: newRemainingGuesses,
      currentPlayer: 1, // Hangman doesn't switch players
    };

    const winner = this.checkWinner(newState);
    const isDraw = this.checkDraw(newState);

    return {
      ...newState,
      winner,
      isDraw,
      isGameOver: winner !== null || isDraw,
    };
  }

  getValidMoves(state: HangmanState): string[] {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet
      .split('')
      .filter((letter) => !state.guessedLetters.has(letter));
  }

  checkWinner(state: HangmanState): number | null {
    // Check if word is completely guessed (player 1 wins in singleplayer, current player wins in multiplayer)
    const isWordGuessed = state.word
      .split('')
      .every((letter) => state.guessedLetters.has(letter));

    if (isWordGuessed) {
      return 1; // Guesser wins
    }

    // Check if out of guesses (player 2/AI wins)
    if (state.remainingGuesses <= 0) {
      return 2; // Word setter wins
    }

    return null;
  }

  checkDraw(_state: HangmanState): boolean {
    return false; // Hangman doesn't have draws
  }

  getAIMove(state: HangmanState, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): string | null {
    const validMoves = this.getValidMoves(state);
    if (validMoves.length === 0) return null;

    if (difficulty === 'easy') {
      return validMoves[Math.floor(Math.random() * validMoves.length)];
    }

    // Medium/Hard: Use letter frequency
    const letterFrequency: { [key: string]: number } = {
      E: 12.7,
      T: 9.1,
      A: 8.2,
      O: 7.5,
      I: 7.0,
      N: 6.7,
      S: 6.3,
      H: 6.1,
      R: 6.0,
      D: 4.3,
      L: 4.0,
      C: 2.8,
      U: 2.8,
      M: 2.4,
      W: 2.4,
      F: 2.2,
      G: 2.0,
      Y: 2.0,
      P: 1.9,
      B: 1.5,
      V: 1.0,
      K: 0.8,
      J: 0.2,
      X: 0.2,
      Q: 0.1,
      Z: 0.1,
    };

    // Sort valid moves by frequency
    const sortedMoves = validMoves.sort(
      (a, b) => (letterFrequency[b] || 0) - (letterFrequency[a] || 0)
    );

    return sortedMoves[0];
  }
}

export const hangmanEngine = new HangmanEngine();
