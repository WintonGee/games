import { useState, useEffect } from 'react';
import { simonEngine, SimonState, SimonColor } from './SimonEngine';
import './Simon.css';

export const Simon = () => {
  const [state, setState] = useState<SimonState>(simonEngine.getInitialState());
  const [activeColor, setActiveColor] = useState<SimonColor | null>(null);

  useEffect(() => {
    if (state.isShowingSequence && state.sequence.length > 0) {
      showSequence();
    }
  }, [state.isShowingSequence, state.sequence.length]);

  useEffect(() => {
    if (
      state.isPlaying &&
      !state.isShowingSequence &&
      state.playerSequence.length === state.sequence.length &&
      state.playerSequence.length > 0 &&
      !state.gameOver
    ) {
      // Player completed the sequence correctly, start new round
      setTimeout(() => {
        setState(simonEngine.startNewRound(state));
      }, 1000);
    }
  }, [state.playerSequence.length, state.sequence.length, state.isPlaying, state.isShowingSequence, state.gameOver]);

  const showSequence = async () => {
    for (let i = 0; i < state.sequence.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setActiveColor(state.sequence[i]);
      await new Promise((resolve) => setTimeout(resolve, 400));
      setActiveColor(null);
    }
    setState(simonEngine.finishShowingSequence(state));
  };

  const handleColorClick = (color: SimonColor) => {
    if (state.isShowingSequence || state.gameOver || !state.isPlaying) return;

    setActiveColor(color);
    setTimeout(() => setActiveColor(null), 300);

    setState(simonEngine.makeMove(state, color));
  };

  const handleStart = () => {
    const newState = simonEngine.getInitialState();
    setState(simonEngine.startNewRound(newState));
  };

  const colors: SimonColor[] = ['red', 'blue', 'green', 'yellow'];

  return (
    <div className="game-container">
      <div className="simon-container">
        <div className="simon-stats">
          <div className="stat-item">
            <div className="stat-label">Level</div>
            <div className="stat-value">{state.currentLevel}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">High Score</div>
            <div className="stat-value">{state.highScore}</div>
          </div>
        </div>

        <div className="game-status">
          {!state.isPlaying && !state.gameOver && 'Press Start to begin!'}
          {state.isShowingSequence && 'Watch the sequence...'}
          {state.isPlaying && !state.isShowingSequence && !state.gameOver && 'Your turn!'}
          {state.gameOver && `Game Over! You reached level ${state.currentLevel}`}
        </div>

        <div className="simon-board">
          {colors.map((color) => (
            <button
              key={color}
              className={`simon-button simon-${color} ${
                activeColor === color ? 'active' : ''
              }`}
              onClick={() => handleColorClick(color)}
              disabled={state.isShowingSequence || !state.isPlaying || state.gameOver}
            />
          ))}
        </div>

        <button className="reset-button" onClick={handleStart}>
          {state.isPlaying && !state.gameOver ? 'Restart' : 'Start Game'}
        </button>
      </div>
    </div>
  );
};
