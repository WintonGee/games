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
  const gameCategories = [
    {
      category: 'Board Games',
      games: [
        { type: 'tictactoe' as GameType, name: 'Tic-Tac-Toe', description: '3x3 grid game' },
        { type: 'connect4' as GameType, name: 'Connect 4', description: 'Connect four' },
      ],
    },
    {
      category: 'Quick Games',
      games: [
        { type: 'rps' as GameType, name: 'Rock Paper Scissors', description: 'Quick match' },
        { type: 'hangman' as GameType, name: 'Hangman', description: 'Guess the word' },
        { type: 'memory' as GameType, name: 'Memory', description: 'Match cards' },
        { type: 'whackamole' as GameType, name: 'Whack-a-Mole', description: 'Reflex game' },
      ],
    },
    {
      category: 'Puzzle Games',
      games: [
        { type: 'wordle' as GameType, name: 'Wordle', description: 'Word puzzle' },
        { type: 'simon' as GameType, name: 'Simon Says', description: 'Pattern memory' },
        { type: 'snake' as GameType, name: 'Snake', description: 'Classic arcade' },
        { type: 'puzzle2048' as GameType, name: '2048', description: 'Merge tiles' },
        { type: 'wordsearch' as GameType, name: 'Word Search', description: 'Find words' },
      ],
    },
    {
      category: 'Card Games',
      games: [
        { type: 'blackjack' as GameType, name: 'Blackjack', description: 'Beat the dealer' },
      ],
    },
    {
      category: 'Party Games',
      games: [
        { type: 'wouldyourather' as GameType, name: 'Would You Rather', description: 'Tough choices' },
        { type: 'truthordare' as GameType, name: 'Truth or Dare', description: 'Classic party' },
        { type: 'trivia' as GameType, name: 'Trivia', description: 'Test knowledge' },
        { type: 'neverhaveiever' as GameType, name: 'Never Have I Ever', description: 'Share stories' },
        { type: 'charades' as GameType, name: 'Charades', description: 'Act it out' },
      ],
    },
  ];

  return (
    <div className="game-selector">
      <h2>Select a Game</h2>
      {gameCategories.map((category) => (
        <div key={category.category} className="game-category">
          <h3 className="category-title">{category.category}</h3>
          <div className="game-buttons">
            {category.games.map((game) => (
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
      ))}
    </div>
  );
};
