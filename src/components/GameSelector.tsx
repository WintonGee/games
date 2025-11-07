import { GameType } from '../types/game';
import './GameSelector.css';

interface GameSelectorProps {
  selectedGame: GameType;
  onGameChange: (game: GameType) => void;
}

export const GameSelector = ({
  selectedGame,
  onGameChange,
}: GameSelectorProps) => {
  const games: { type: GameType; name: string; description: string }[] = [
    { type: 'tictactoe', name: 'Tic-Tac-Toe', description: 'Classic 3x3 grid game' },
    { type: 'connect4', name: 'Connect 4', description: 'Connect four in a row' },
    { type: 'hangman', name: 'Hangman', description: 'Guess the word' },
  ];

  return (
    <div className="game-selector">
      <h2>Select a Game</h2>
      <div className="game-buttons">
        {games.map((game) => (
          <button
            key={game.type}
            className={`game-button ${selectedGame === game.type ? 'active' : ''}`}
            onClick={() => onGameChange(game.type)}
          >
            <div className="game-name">{game.name}</div>
            <div className="game-description">{game.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
