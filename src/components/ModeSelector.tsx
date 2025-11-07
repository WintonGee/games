import { GameMode } from '../types/game';
import './ModeSelector.css';

interface ModeSelectorProps {
  selectedMode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

export const ModeSelector = ({
  selectedMode,
  onModeChange,
}: ModeSelectorProps) => {
  return (
    <div className="mode-selector">
      <h2>Select Mode</h2>
      <div className="mode-buttons">
        <button
          className={`mode-button ${selectedMode === 'singleplayer' ? 'active' : ''}`}
          onClick={() => onModeChange('singleplayer')}
        >
          <div className="mode-name">Singleplayer</div>
          <div className="mode-description">Play against AI</div>
        </button>
        <button
          className={`mode-button ${selectedMode === 'multiplayer' ? 'active' : ''}`}
          onClick={() => onModeChange('multiplayer')}
        >
          <div className="mode-name">Multiplayer</div>
          <div className="mode-description">Play with a friend</div>
        </button>
      </div>
    </div>
  );
};
