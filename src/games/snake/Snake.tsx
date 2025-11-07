import { useState, useEffect, useCallback } from 'react';
import { snakeEngine, SnakeState, Direction } from './SnakeEngine';
import './Snake.css';

export const Snake = () => {
  const [state, setState] = useState<SnakeState>(snakeEngine.getInitialState());
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const moveSnake = useCallback(() => {
    setState((current) => snakeEngine.makeMove(current, null));
  }, []);

  useEffect(() => {
    if (!gameStarted || isPaused || state.gameOver) return;

    const interval = setInterval(() => {
      moveSnake();
    }, 150);

    return () => clearInterval(interval);
  }, [gameStarted, isPaused, state.gameOver, moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        setGameStarted(true);
      }

      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((prev) => !prev);
        return;
      }

      const directionMap: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      };

      const direction = directionMap[e.key];
      if (direction) {
        e.preventDefault();
        setState((current) => snakeEngine.setDirection(current, direction));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted]);

  const handleReset = () => {
    setState(snakeEngine.getInitialState());
    setGameStarted(false);
    setIsPaused(false);
  };

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < state.gridSize; y++) {
      for (let x = 0; x < state.gridSize; x++) {
        const isSnake = state.snake.some((segment) => segment.x === x && segment.y === y);
        const isHead = state.snake[0].x === x && state.snake[0].y === y;
        const isFood = state.food.x === x && state.food.y === y;

        cells.push(
          <div
            key={`${x}-${y}`}
            className={`snake-cell ${isSnake ? 'snake' : ''} ${isHead ? 'head' : ''} ${
              isFood ? 'food' : ''
            }`}
          />
        );
      }
    }
    return cells;
  };

  return (
    <div className="game-container">
      <div className="snake-container">
        <div className="snake-score">
          <div className="score-label">Score</div>
          <div className="score-value">{state.score}</div>
        </div>

        <div className="game-status">
          {!gameStarted && 'Press arrow keys to start'}
          {gameStarted && isPaused && 'Paused - Press SPACE to continue'}
          {gameStarted && !isPaused && !state.gameOver && 'Use arrow keys to move'}
          {state.gameOver && `Game Over! Final Score: ${state.score}`}
        </div>

        <div className="snake-grid">{renderGrid()}</div>

        <div className="snake-controls">
          <button className="reset-button" onClick={handleReset}>
            New Game
          </button>
          {gameStarted && !state.gameOver && (
            <button className="reset-button secondary" onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}
        </div>

        <div className="snake-instructions">
          Use arrow keys to move • SPACE to pause
        </div>
      </div>
    </div>
  );
};
