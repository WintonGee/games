import { useState } from 'react';
import { GameType, GameMode } from './types/game';
import { GameSelector } from './components/GameSelector';
import { ModeSelector } from './components/ModeSelector';
import { TicTacToe } from './games/tictactoe/TicTacToe';
import { Connect4 } from './games/connect4/Connect4';
import { Hangman } from './games/hangman/Hangman';
import './App.css';

function App() {
  const [selectedGame, setSelectedGame] = useState<GameType>('tictactoe');
  const [selectedMode, setSelectedMode] = useState<GameMode>('singleplayer');
  const [gameKey, setGameKey] = useState(0);

  const handleGameChange = (game: GameType) => {
    setSelectedGame(game);
    setGameKey((prev) => prev + 1);
  };

  const handleModeChange = (mode: GameMode) => {
    setSelectedMode(mode);
    setGameKey((prev) => prev + 1);
  };

  const renderGame = () => {
    switch (selectedGame) {
      case 'tictactoe':
        return <TicTacToe key={gameKey} mode={selectedMode} />;
      case 'connect4':
        return <Connect4 key={gameKey} mode={selectedMode} />;
      case 'hangman':
        return <Hangman key={gameKey} mode={selectedMode} />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Game Collection</h1>
      </header>

      <div className="app-content">
        <div className="selectors">
          <GameSelector selectedGame={selectedGame} onGameChange={handleGameChange} />
          <ModeSelector selectedMode={selectedMode} onModeChange={handleModeChange} />
        </div>

        <div className="game-area">{renderGame()}</div>
      </div>
    </div>
  );
}

export default App;
