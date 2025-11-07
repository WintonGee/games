import { useState, useEffect } from 'react';
import './Wordle.css';

const WORD_LIST = [
  'REACT', 'TYPESCRIPT', 'GAMES', 'CODER', 'LEARN', 'BUILD', 'DEBUG', 'ASYNC',
  'STATE', 'PROPS', 'HOOKS', 'STYLE', 'CLOUD', 'STACK', 'FRONT', 'QUERY',
  'ARRAY', 'CLASS', 'CONST', 'SUPER', 'WHILE', 'THROW', 'CATCH', 'BREAK',
];

type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

interface LetterGuess {
  letter: string;
  status: LetterStatus;
}

export const Wordle = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<LetterGuess[][]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [usedLetters, setUsedLetters] = useState<Map<string, LetterStatus>>(new Map());

  const MAX_GUESSES = 6;
  const WORD_LENGTH = 5;

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      if (e.key === 'Enter') {
        handleSubmitGuess();
      } else if (e.key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentGuess, gameOver, targetWord]);

  const startNewGame = () => {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setTargetWord(randomWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setWon(false);
    setUsedLetters(new Map());
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== WORD_LENGTH) return;

    const guessResult: LetterGuess[] = [];
    const targetLetters = targetWord.split('');
    const guessLetters = currentGuess.split('');

    // First pass: mark correct positions
    const remainingTargetLetters = [...targetLetters];
    guessLetters.forEach((letter, i) => {
      if (letter === targetLetters[i]) {
        guessResult[i] = { letter, status: 'correct' };
        remainingTargetLetters[i] = '';
      }
    });

    // Second pass: mark present and absent
    guessLetters.forEach((letter, i) => {
      if (!guessResult[i]) {
        const index = remainingTargetLetters.indexOf(letter);
        if (index !== -1) {
          guessResult[i] = { letter, status: 'present' };
          remainingTargetLetters[index] = '';
        } else {
          guessResult[i] = { letter, status: 'absent' };
        }
      }
    });

    // Update used letters
    const newUsedLetters = new Map(usedLetters);
    guessResult.forEach(({ letter, status }) => {
      const currentStatus = newUsedLetters.get(letter);
      if (!currentStatus || status === 'correct' || (status === 'present' && currentStatus !== 'correct')) {
        newUsedLetters.set(letter, status);
      }
    });
    setUsedLetters(newUsedLetters);

    const newGuesses = [...guesses, guessResult];
    setGuesses(newGuesses);
    setCurrentGuess('');

    if (currentGuess === targetWord) {
      setWon(true);
      setGameOver(true);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
    }
  };

  const keyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  return (
    <div className="game-container">
      <div className="wordle-container">
        <h2 className="wordle-title">Wordle</h2>

        <div className="wordle-board">
          {Array.from({ length: MAX_GUESSES }).map((_, i) => (
            <div key={i} className="wordle-row">
              {Array.from({ length: WORD_LENGTH }).map((_, j) => {
                const guess = guesses[i];
                const isCurrentRow = i === guesses.length && !gameOver;
                const letter = guess ? guess[j].letter : isCurrentRow ? currentGuess[j] || '' : '';
                const status = guess ? guess[j].status : 'empty';

                return (
                  <div key={j} className={`wordle-cell ${status}`}>
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {gameOver && (
          <div className="wordle-result">
            {won ? (
              <div className="wordle-win">
                🎉 You won in {guesses.length} {guesses.length === 1 ? 'guess' : 'guesses'}!
              </div>
            ) : (
              <div className="wordle-lose">
                The word was: <strong>{targetWord}</strong>
              </div>
            )}
          </div>
        )}

        <div className="wordle-keyboard">
          {keyboard.map((row, i) => (
            <div key={i} className="keyboard-row">
              {row.map((letter) => (
                <button
                  key={letter}
                  className={`keyboard-key ${usedLetters.get(letter) || ''}`}
                  onClick={() => {
                    if (!gameOver && currentGuess.length < WORD_LENGTH) {
                      setCurrentGuess(currentGuess + letter);
                    }
                  }}
                >
                  {letter}
                </button>
              ))}
            </div>
          ))}
          <div className="keyboard-row">
            <button
              className="keyboard-key wide"
              onClick={() => setCurrentGuess(currentGuess.slice(0, -1))}
            >
              ⌫
            </button>
            <button
              className="keyboard-key wide"
              onClick={handleSubmitGuess}
              disabled={currentGuess.length !== WORD_LENGTH}
            >
              ENTER
            </button>
          </div>
        </div>

        <button className="reset-button" onClick={startNewGame}>
          New Game
        </button>

        <div className="wordle-instructions">
          Guess the 5-letter word in 6 tries. Green = correct position, Yellow = wrong position
        </div>
      </div>
    </div>
  );
};
