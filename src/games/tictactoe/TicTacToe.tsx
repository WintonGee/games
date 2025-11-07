import { GameMode } from '../../types/game';
import { useGameState } from '../../hooks/useGameState';
import { ticTacToeEngine, TicTacToeState } from './TicTacToeEngine';
import './TicTacToe.css';

interface TicTacToeProps {
  mode: GameMode;
}

export const TicTacToe = ({ mode }: TicTacToeProps) => {
  const { state, handleMove, resetGame } = useGameState<TicTacToeState>(
    ticTacToeEngine.getInitialState(),
    ticTacToeEngine.makeMove.bind(ticTacToeEngine),
    ticTacToeEngine.getAIMove.bind(ticTacToeEngine),
    mode,
    (state) => state.currentPlayer,
    (state) => state.isGameOver
  );

  const getCellSymbol = (player: number | null) => {
    if (player === 1) return 'X';
    if (player === 2) return 'O';
    return '';
  };

  const getStatusMessage = () => {
    if (state.winner) {
      return `Player ${getCellSymbol(state.winner)} wins!`;
    }
    if (state.isDraw) {
      return "It's a draw!";
    }
    return `Current player: ${getCellSymbol(state.currentPlayer)}`;
  };

  return (
    <div className="game-container">
      <div className="game-status">{getStatusMessage()}</div>
      <div className="tictactoe-board">
        {state.board.map((cell, index) => (
          <button
            key={index}
            className={`tictactoe-cell ${cell !== null ? 'filled' : ''}`}
            onClick={() => handleMove(index)}
            disabled={cell !== null || state.isGameOver}
          >
            {getCellSymbol(cell)}
          </button>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
};
