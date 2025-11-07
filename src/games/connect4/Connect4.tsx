import { GameMode } from '../../types/game';
import { useGameState } from '../../hooks/useGameState';
import { connect4Engine, Connect4State } from './Connect4Engine';
import './Connect4.css';

interface Connect4Props {
  mode: GameMode;
}

export const Connect4 = ({ mode }: Connect4Props) => {
  const { state, handleMove, resetGame } = useGameState<Connect4State>(
    connect4Engine.getInitialState(),
    connect4Engine.makeMove.bind(connect4Engine),
    connect4Engine.getAIMove.bind(connect4Engine),
    mode,
    (state) => state.currentPlayer,
    (state) => state.isGameOver
  );

  const getCellColor = (player: number | null) => {
    if (player === 1) return 'red';
    if (player === 2) return 'yellow';
    return 'empty';
  };

  const getStatusMessage = () => {
    if (state.winner) {
      const color = state.winner === 1 ? 'Red' : 'Yellow';
      return `${color} wins!`;
    }
    if (state.isDraw) {
      return "It's a draw!";
    }
    const color = state.currentPlayer === 1 ? 'Red' : 'Yellow';
    return `Current player: ${color}`;
  };

  return (
    <div className="game-container">
      <div className="game-status">{getStatusMessage()}</div>
      <div className="connect4-board">
        {state.board.map((row, rowIndex) => (
          <div key={rowIndex} className="connect4-row">
            {row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`connect4-cell ${getCellColor(cell)}`}
                onClick={() => handleMove(colIndex)}
                disabled={state.isGameOver || state.board[0][colIndex] !== null}
              >
                <div className="connect4-disc"></div>
              </button>
            ))}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
};
