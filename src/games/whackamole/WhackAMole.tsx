import { useState, useEffect, useRef } from 'react';
import './WhackAMole.css';

export const WhackAMole = () => {
  const [moles, setMoles] = useState<boolean[]>(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        popRandomMole();
      }, 800);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const popRandomMole = () => {
    const randomIndex = Math.floor(Math.random() * 9);
    setMoles((prev) => {
      const newMoles = [...prev];
      newMoles[randomIndex] = true;
      return newMoles;
    });

    setTimeout(() => {
      setMoles((prev) => {
        const newMoles = [...prev];
        newMoles[randomIndex] = false;
        return newMoles;
      });
    }, 600);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setMoles(Array(9).fill(false));
  };

  const endGame = () => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  const whackMole = (index: number) => {
    if (!isPlaying || !moles[index]) return;

    setScore((prev) => prev + 1);
    setMoles((prev) => {
      const newMoles = [...prev];
      newMoles[index] = false;
      return newMoles;
    });
  };

  return (
    <div className="game-container">
      <div className="whackamole-container">
        <h2 className="whackamole-title">Whack-a-Mole</h2>

        <div className="whackamole-stats">
          <div className="stat-item">
            <div className="stat-label">Score</div>
            <div className="stat-value">{score}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Time</div>
            <div className="stat-value">{timeLeft}s</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">High Score</div>
            <div className="stat-value">{highScore}</div>
          </div>
        </div>

        {!isPlaying && timeLeft === 30 && (
          <button className="reset-button large" onClick={startGame}>
            Start Game
          </button>
        )}

        {isPlaying && (
          <div className="whackamole-grid">
            {moles.map((isUp, index) => (
              <button
                key={index}
                className={`mole-hole ${isUp ? 'mole-up' : ''}`}
                onClick={() => whackMole(index)}
              >
                <div className="mole">{isUp ? '🦫' : ''}</div>
              </button>
            ))}
          </div>
        )}

        {!isPlaying && timeLeft === 0 && (
          <div className="whackamole-result">
            <div className="game-over">Game Over!</div>
            <div className="final-score">Final Score: {score}</div>
            <button className="reset-button" onClick={startGame}>
              Play Again
            </button>
          </div>
        )}

        <div className="whackamole-instructions">
          Click the moles as fast as you can! You have 30 seconds!
        </div>
      </div>
    </div>
  );
};
