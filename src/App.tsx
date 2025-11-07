import { useState } from 'react';
import { GameType, GameMode } from './types/game';
import { GameSelector } from './components/GameSelector';
import { ModeSelector } from './components/ModeSelector';
import { TicTacToe } from './games/tictactoe/TicTacToe';
import { Connect4 } from './games/connect4/Connect4';
import { Hangman } from './games/hangman/Hangman';
import { RPS } from './games/rps/RPS';
import { Memory } from './games/memory/Memory';
import { Simon } from './games/simon/Simon';
import { Snake } from './games/snake/Snake';
import { Puzzle2048 } from './games/puzzle2048/Puzzle2048';
import { WouldYouRather } from './games/wouldyourather/WouldYouRather';
import { TruthOrDare } from './games/truthordare/TruthOrDare';
import { Trivia } from './games/trivia/Trivia';
import { Wordle } from './games/wordle/Wordle';
import { Blackjack } from './games/blackjack/Blackjack';
import { WhackAMole } from './games/whackamole/WhackAMole';
import { WordSearch } from './games/wordsearch/WordSearch';
import { NeverHaveIEver } from './games/neverhaveiever/NeverHaveIEver';
import { Charades } from './games/charades/Charades';
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

  // Games that support mode selection
  const gamesWithModes: GameType[] = ['tictactoe', 'connect4', 'hangman', 'rps', 'memory'];
  const showModeSelector = gamesWithModes.includes(selectedGame);

  const renderGame = () => {
    switch (selectedGame) {
      case 'tictactoe':
        return <TicTacToe key={gameKey} mode={selectedMode} />;
      case 'connect4':
        return <Connect4 key={gameKey} mode={selectedMode} />;
      case 'hangman':
        return <Hangman key={gameKey} mode={selectedMode} />;
      case 'rps':
        return <RPS key={gameKey} mode={selectedMode} />;
      case 'memory':
        return <Memory key={gameKey} mode={selectedMode} />;
      case 'simon':
        return <Simon key={gameKey} />;
      case 'snake':
        return <Snake key={gameKey} />;
      case 'puzzle2048':
        return <Puzzle2048 key={gameKey} />;
      case 'wouldyourather':
        return <WouldYouRather key={gameKey} />;
      case 'truthordare':
        return <TruthOrDare key={gameKey} />;
      case 'trivia':
        return <Trivia key={gameKey} />;
      case 'wordle':
        return <Wordle key={gameKey} />;
      case 'blackjack':
        return <Blackjack key={gameKey} />;
      case 'whackamole':
        return <WhackAMole key={gameKey} />;
      case 'wordsearch':
        return <WordSearch key={gameKey} />;
      case 'neverhaveiever':
        return <NeverHaveIEver key={gameKey} />;
      case 'charades':
        return <Charades key={gameKey} />;
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
          {showModeSelector && (
            <ModeSelector selectedMode={selectedMode} onModeChange={handleModeChange} />
          )}
        </div>

        <div className="game-area">{renderGame()}</div>
      </div>
    </div>
  );
}

export default App;
