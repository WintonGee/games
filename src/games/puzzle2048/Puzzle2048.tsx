import { useState, useEffect } from 'react';
import { puzzle2048Engine, Puzzle2048State, Direction2048 } from './Puzzle2048Engine';
import './Puzzle2048.css';

export const Puzzle2048 = () => {
  const [state, setState] = useState<Puzzle2048State>(puzzle2048Engine.getInitialState());

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const directionMap: Record<string, Direction2048> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      };

      const direction = directionMap[e.key];
      if (direction) {
        e.preventDefault();
        setState((current) => puzzle2048Engine.makeMove(current, direction));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleReset = () => {
    setState(puzzle2048Engine.getInitialState());
  };

  const getTileColor = (value: number): string => {
    const colors: Record<number, string> = {
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e',
    };
    return colors[value] || '#3c3a32';
  };

  const getTextColor = (value: number): string => {
    return value <= 4 ? '#776e65' : '#f9f6f2';
  };

  return (
    <div className="game-container">
      <div className="puzzle2048-container">
        <div className="puzzle2048-header">
          <div className="puzzle2048-title">2048</div>
          <div className="puzzle2048-score">
            <div className="score-label">Score</div>
            <div className="score-value">{state.score}</div>
          </div>
        </div>

        <div className="game-status">
          {state.won && !state.gameOver && 'You won! 🎉 Keep playing!'}
          {state.gameOver && 'Game Over!'}
          {!state.won && !state.gameOver && 'Use arrow keys to play'}
        </div>

        <div className="puzzle2048-grid">
          {state.grid.map((row, rowIndex) => (
            <div key={rowIndex} className="puzzle2048-row">
              {row.map((value, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`puzzle2048-tile ${value === 0 ? 'empty' : ''}`}
                  style={{
                    backgroundColor: value === 0 ? '#cdc1b4' : getTileColor(value),
                    color: getTextColor(value),
                  }}
                >
                  {value !== 0 && value}
                </div>
              ))}
            </div>
          ))}
        </div>

        <button className="reset-button" onClick={handleReset}>
          New Game
        </button>

        <div className="puzzle2048-instructions">
          Use arrow keys to move tiles • Merge same numbers to reach 2048!
        </div>
      </div>
    </div>
  );
};
