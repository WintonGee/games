import { useState } from 'react';
import './Charades.css';

const CATEGORIES = {
  Movies: [
    'The Lion King', 'Titanic', 'Star Wars', 'Harry Potter', 'Frozen', 'Jurassic Park',
    'The Matrix', 'Toy Story', 'Avatar', 'Inception', 'The Avengers', 'Shrek',
  ],
  Actions: [
    'Riding a bicycle', 'Swimming', 'Dancing', 'Cooking', 'Driving', 'Singing',
    'Playing guitar', 'Running', 'Sleeping', 'Eating spaghetti', 'Brushing teeth', 'Texting',
  ],
  Animals: [
    'Elephant', 'Kangaroo', 'Penguin', 'Monkey', 'Snake', 'Cat',
    'Dog', 'Lion', 'Giraffe', 'Dolphin', 'Eagle', 'Turtle',
  ],
  Occupations: [
    'Doctor', 'Teacher', 'Chef', 'Firefighter', 'Police Officer', 'Astronaut',
    'Pilot', 'Artist', 'Musician', 'Dancer', 'Programmer', 'Photographer',
  ],
};

export const Charades = () => {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORIES>('Movies');
  const [currentWord, setCurrentWord] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  const startRound = () => {
    const words = CATEGORIES[selectedCategory];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setIsPlaying(true);
    setTimeLeft(60);
    setTimerActive(false);
  };

  const startTimer = () => {
    setTimerActive(true);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const nextWord = () => {
    startRound();
  };

  const endRound = () => {
    setIsPlaying(false);
    setTimerActive(false);
  };

  return (
    <div className="game-container">
      <div className="charades-container">
        <h2 className="charades-title">Charades</h2>

        {!isPlaying && (
          <>
            <div className="charades-category-select">
              <h3>Select Category</h3>
              <div className="category-buttons">
                {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((category) => (
                  <button
                    key={category}
                    className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <button className="reset-button large" onClick={startRound}>
              Start Game
            </button>
          </>
        )}

        {isPlaying && (
          <>
            <div className="charades-timer">
              {timerActive ? `Time: ${timeLeft}s` : 'Ready?'}
            </div>

            <div className="charades-word-card">
              <div className="category-badge">{selectedCategory}</div>
              <div className="charades-word">{currentWord}</div>
            </div>

            <div className="charades-actions">
              {!timerActive && (
                <button className="reset-button large" onClick={startTimer}>
                  Start Timer
                </button>
              )}
              {timerActive && (
                <>
                  <button className="reset-button" onClick={nextWord}>
                    Skip / Next Word
                  </button>
                  <button className="reset-button secondary" onClick={endRound}>
                    End Round
                  </button>
                </>
              )}
            </div>
          </>
        )}

        <div className="charades-instructions">
          Act out the word without speaking while others guess. Use gestures and movements only!
        </div>
      </div>
    </div>
  );
};
