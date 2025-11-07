import { useState } from 'react';
import { GameMode } from '../../types/game';
import { hangmanEngine, HangmanState } from './HangmanEngine';
import './Hangman.css';

interface HangmanProps {
  mode: GameMode;
}

export const Hangman = ({ mode: _mode }: HangmanProps) => {
  const [state, setState] = useState<HangmanState>(hangmanEngine.getInitialState());

  const handleMove = (letter: string) => {
    if (!state.isGameOver) {
      setState(hangmanEngine.makeMove(state, letter));
    }
  };

  const resetGame = () => {
    setState(hangmanEngine.getInitialState());
  };

  const getDisplayWord = () => {
    return state.word
      .split('')
      .map((letter) => (state.guessedLetters.has(letter) ? letter : '_'))
      .join(' ');
  };

  const getStatusMessage = () => {
    if (state.winner === 1) {
      return `You won! The word was: ${state.word}`;
    }
    if (state.winner === 2) {
      return `Game Over! The word was: ${state.word}`;
    }
    return `Remaining guesses: ${state.remainingGuesses}`;
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="game-container">
      <div className="hangman-container">
        <div className="hangman-drawing">
          <svg width="200" height="250" viewBox="0 0 200 250">
            {/* Gallows */}
            <line x1="10" y1="230" x2="150" y2="230" stroke="#333" strokeWidth="4" />
            <line x1="50" y1="230" x2="50" y2="20" stroke="#333" strokeWidth="4" />
            <line x1="50" y1="20" x2="130" y2="20" stroke="#333" strokeWidth="4" />
            <line x1="130" y1="20" x2="130" y2="50" stroke="#333" strokeWidth="4" />

            {/* Head */}
            {state.remainingGuesses <= 5 && (
              <circle cx="130" cy="70" r="20" stroke="#333" strokeWidth="4" fill="none" />
            )}

            {/* Body */}
            {state.remainingGuesses <= 4 && (
              <line x1="130" y1="90" x2="130" y2="150" stroke="#333" strokeWidth="4" />
            )}

            {/* Left arm */}
            {state.remainingGuesses <= 3 && (
              <line x1="130" y1="110" x2="100" y2="130" stroke="#333" strokeWidth="4" />
            )}

            {/* Right arm */}
            {state.remainingGuesses <= 2 && (
              <line x1="130" y1="110" x2="160" y2="130" stroke="#333" strokeWidth="4" />
            )}

            {/* Left leg */}
            {state.remainingGuesses <= 1 && (
              <line x1="130" y1="150" x2="110" y2="190" stroke="#333" strokeWidth="4" />
            )}

            {/* Right leg */}
            {state.remainingGuesses <= 0 && (
              <line x1="130" y1="150" x2="150" y2="190" stroke="#333" strokeWidth="4" />
            )}
          </svg>
        </div>

        <div className="game-status">{getStatusMessage()}</div>

        <div className="hangman-word">{getDisplayWord()}</div>

        <div className="hangman-keyboard">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className={`hangman-key ${
                state.guessedLetters.has(letter) ? 'guessed' : ''
              } ${
                state.guessedLetters.has(letter) && state.word.includes(letter)
                  ? 'correct'
                  : ''
              } ${
                state.guessedLetters.has(letter) && !state.word.includes(letter)
                  ? 'incorrect'
                  : ''
              }`}
              onClick={() => handleMove(letter)}
              disabled={state.guessedLetters.has(letter) || state.isGameOver}
            >
              {letter}
            </button>
          ))}
        </div>

        <button className="reset-button" onClick={resetGame}>
          New Game
        </button>
      </div>
    </div>
  );
};
