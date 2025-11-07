import { useState } from 'react';
import './TruthOrDare.css';

const TRUTHS = [
  "What's the most embarrassing thing you've ever done?",
  "What's your biggest fear?",
  "What's the worst lie you've ever told?",
  'Who was your first crush?',
  "What's something you've never told anyone?",
  "What's your most embarrassing childhood memory?",
  'Have you ever cheated on a test?',
  "What's the longest you've gone without showering?",
  'What app do you waste the most time on?',
  "What's the most childish thing you still do?",
  'What secret do you keep from your parents?',
  'What is your biggest insecurity?',
  'What is the worst date you have been on?',
  "What's something you're glad your family doesn't know about you?",
  'Have you ever pretended to be sick to get out of something?',
  'What is your biggest regret?',
  "What's the meanest thing you've ever said to someone?",
  'What is your greatest fear in a relationship?',
  'What are your thoughts on your best friend?',
  "What's the most embarrassing thing in your room?",
];

const DARES = [
  'Do 20 pushups',
  'Sing a song loudly',
  'Dance for 1 minute',
  'Do your best celebrity impression',
  'Speak in an accent for the next 3 rounds',
  'Let someone else style your hair',
  'Do a handstand for 10 seconds',
  'Post an embarrassing photo on social media',
  'Call a friend and tell them a joke',
  'Act like your favorite animal',
  'Do a silly dance',
  'Speak in rhymes for the next 3 rounds',
  'Let the group go through your phone for 1 minute',
  'Eat a spoonful of hot sauce',
  'Do a cartwheel',
  'Try to lick your elbow',
  'Do the worm',
  'Pretend to be a statue for 2 minutes',
  'Do your best opera singing',
  'Walk like a crab for the rest of the game',
];

type Mode = 'select' | 'truth' | 'dare';

export const TruthOrDare = () => {
  const [mode, setMode] = useState<Mode>('select');
  const [currentChallenge, setCurrentChallenge] = useState('');
  const [usedTruths, setUsedTruths] = useState<number[]>([]);
  const [usedDares, setUsedDares] = useState<number[]>([]);

  const getRandomTruth = () => {
    let availableIndices = TRUTHS.map((_, i) => i).filter((i) => !usedTruths.includes(i));

    if (availableIndices.length === 0) {
      setUsedTruths([]);
      availableIndices = TRUTHS.map((_, i) => i);
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setUsedTruths([...usedTruths, randomIndex]);
    return TRUTHS[randomIndex];
  };

  const getRandomDare = () => {
    let availableIndices = DARES.map((_, i) => i).filter((i) => !usedDares.includes(i));

    if (availableIndices.length === 0) {
      setUsedDares([]);
      availableIndices = DARES.map((_, i) => i);
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setUsedDares([...usedDares, randomIndex]);
    return DARES[randomIndex];
  };

  const handleTruth = () => {
    setCurrentChallenge(getRandomTruth());
    setMode('truth');
  };

  const handleDare = () => {
    setCurrentChallenge(getRandomDare());
    setMode('dare');
  };

  const handleNext = () => {
    setMode('select');
    setCurrentChallenge('');
  };

  return (
    <div className="game-container">
      <div className="tod-container">
        <h2 className="tod-title">Truth or Dare</h2>

        {mode === 'select' && (
          <>
            <div className="game-status">Choose your challenge!</div>
            <div className="tod-buttons">
              <button className="tod-button truth" onClick={handleTruth}>
                Truth
              </button>
              <button className="tod-button dare" onClick={handleDare}>
                Dare
              </button>
            </div>
          </>
        )}

        {mode !== 'select' && (
          <>
            <div className={`tod-badge ${mode}`}>{mode.toUpperCase()}</div>
            <div className="tod-challenge">{currentChallenge}</div>
            <button className="reset-button" onClick={handleNext}>
              Next Player
            </button>
          </>
        )}

        <div className="tod-stats">
          Truths used: {usedTruths.length}/{TRUTHS.length} | Dares used: {usedDares.length}/
          {DARES.length}
        </div>
      </div>
    </div>
  );
};
