import { useState, useEffect } from 'react';
import { GameMode } from '../../types/game';
import { memoryEngine, MemoryState } from './MemoryEngine';
import './Memory.css';

interface MemoryProps {
  mode: GameMode;
}

export const Memory = ({ mode }: MemoryProps) => {
  const [state, setState] = useState<MemoryState>(memoryEngine.getInitialState());

  useEffect(() => {
    if (state.flippedCards.length === 2) {
      const timer = setTimeout(() => {
        setState(memoryEngine.flipCardsBack(state));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.flippedCards.length, state]);

  const handleCardClick = (cardId: number) => {
    if (state.flippedCards.length >= 2) return;
    setState(memoryEngine.makeMove(state, cardId));
  };

  const handleReset = () => {
    setState(memoryEngine.getInitialState());
  };

  const getStatusMessage = () => {
    if (state.isGameOver) {
      if (state.isDraw || state.winner === null) {
        return "It's a draw!";
      }
      if (mode === 'singleplayer') {
        return `Game Over! Moves: ${state.moves}`;
      }
      return `Player ${state.winner} wins! 🎉`;
    }

    if (mode === 'singleplayer') {
      return `Moves: ${state.moves} | Matches: ${state.scores.player1}`;
    }

    return `Player ${state.currentPlayer}'s turn`;
  };

  return (
    <div className="game-container">
      <div className="memory-container">
        <div className="game-status">{getStatusMessage()}</div>

        {mode === 'multiplayer' && (
          <div className="memory-scores">
            <div className="score-item">
              <div className="score-label">Player 1</div>
              <div className="score-value">{state.scores.player1}</div>
            </div>
            <div className="score-item">
              <div className="score-label">Player 2</div>
              <div className="score-value">{state.scores.player2}</div>
            </div>
          </div>
        )}

        <div className="memory-grid">
          {state.cards.map((card) => (
            <button
              key={card.id}
              className={`memory-card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${
                card.isMatched ? 'matched' : ''
              }`}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched || state.flippedCards.length >= 2}
            >
              <div className="memory-card-inner">
                <div className="memory-card-front">?</div>
                <div className="memory-card-back">{card.value}</div>
              </div>
            </button>
          ))}
        </div>

        <button className="reset-button" onClick={handleReset}>
          New Game
        </button>
      </div>
    </div>
  );
};
