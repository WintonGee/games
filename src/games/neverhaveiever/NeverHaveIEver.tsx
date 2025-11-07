import { useState } from 'react';
import './NeverHaveIEver.css';

const PROMPTS = [
  'Never have I ever lied about my age',
  'Never have I ever broken a bone',
  'Never have I ever been in a car accident',
  'Never have I ever gone skydiving',
  'Never have I ever sung karaoke',
  'Never have I ever traveled to another continent',
  'Never have I ever been on TV',
  'Never have I ever met a celebrity',
  'Never have I ever pulled an all-nighter',
  'Never have I ever had a pet',
  'Never have I ever been to a concert',
  'Never have I ever dyed my hair',
  'Never have I ever gotten a tattoo',
  'Never have I ever gone camping',
  'Never have I ever been fishing',
  'Never have I ever cooked a full meal',
  'Never have I ever watched an entire TV series in one sitting',
  'Never have I ever cheated on a test',
  "Never have I ever forgotten someone's birthday",
  'Never have I ever regifted a present',
];

export const NeverHaveIEver = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [usedPrompts, setUsedPrompts] = useState<number[]>([]);

  const getNextPrompt = () => {
    let availableIndices = PROMPTS.map((_, i) => i).filter((i) => !usedPrompts.includes(i));

    if (availableIndices.length === 0) {
      setUsedPrompts([]);
      availableIndices = PROMPTS.map((_, i) => i);
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setCurrentIndex(randomIndex);
    setUsedPrompts([...usedPrompts, randomIndex]);
  };

  const resetGame = () => {
    setUsedPrompts([]);
    setCurrentIndex(0);
  };

  return (
    <div className="game-container">
      <div className="nhie-container">
        <h2 className="nhie-title">Never Have I Ever</h2>

        <div className="nhie-card">
          <div className="nhie-prompt">{PROMPTS[currentIndex]}</div>
        </div>

        <div className="nhie-actions">
          <button className="reset-button" onClick={getNextPrompt}>
            Next Prompt
          </button>
          <button className="reset-button secondary" onClick={resetGame}>
            Reset
          </button>
        </div>

        <div className="nhie-stats">
          Prompts used: {usedPrompts.length}/{PROMPTS.length}
        </div>

        <div className="nhie-instructions">
          Players who have done the action put a finger down. First to put all fingers down loses!
        </div>
      </div>
    </div>
  );
};
