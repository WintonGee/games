import { useState } from 'react';
import './WouldYouRather.css';

interface Question {
  option1: string;
  option2: string;
}

const QUESTIONS: Question[] = [
  { option1: 'Have the ability to fly', option2: 'Have the ability to be invisible' },
  { option1: 'Travel to the past', option2: 'Travel to the future' },
  { option1: 'Be able to speak all languages', option2: 'Be able to talk to animals' },
  { option1: 'Live without music', option2: 'Live without TV' },
  { option1: 'Be a famous musician', option2: 'Be a famous actor' },
  { option1: 'Have unlimited money', option2: 'Have unlimited time' },
  { option1: 'Always be 10 minutes late', option2: 'Always be 20 minutes early' },
  { option1: 'Read minds', option2: 'Predict the future' },
  { option1: 'Lose the ability to read', option2: 'Lose the ability to speak' },
  { option1: 'Live in a world without coffee', option2: 'Live in a world without tea' },
  { option1: 'Have a rewind button for your life', option2: 'Have a pause button for your life' },
  { option1: 'Always have to say everything on your mind', option2: 'Never speak again' },
  { option1: 'Be stuck in traffic for 2 hours', option2: 'Wait in a long line for 2 hours' },
  { option1: 'Have a personal chef', option2: 'Have a personal driver' },
  { option1: 'Explore space', option2: 'Explore the ocean' },
  { option1: 'Win the lottery', option2: 'Find true love' },
  { option1: 'Be the funniest person in the room', option2: 'Be the smartest person in the room' },
  { option1: 'Have superhuman strength', option2: 'Have superhuman intelligence' },
  { option1: 'Live in a city', option2: 'Live in the countryside' },
  { option1: 'Have the best house in a bad neighborhood', option2: 'Have the worst house in a great neighborhood' },
];

export const WouldYouRather = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votes, setVotes] = useState<{ option1: number; option2: number }>({
    option1: 0,
    option2: 0,
  });
  const [hasVoted, setHasVoted] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];

  const handleVote = (option: 'option1' | 'option2') => {
    setVotes((prev) => ({
      ...prev,
      [option]: prev[option] + 1,
    }));
    setHasVoted(true);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % QUESTIONS.length;
    setCurrentIndex(nextIndex);
    setHasVoted(false);
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
    setCurrentIndex(randomIndex);
    setHasVoted(false);
  };

  const totalVotes = votes.option1 + votes.option2;
  const option1Percentage = totalVotes > 0 ? (votes.option1 / totalVotes) * 100 : 0;
  const option2Percentage = totalVotes > 0 ? (votes.option2 / totalVotes) * 100 : 0;

  return (
    <div className="game-container">
      <div className="wyr-container">
        <h2 className="wyr-title">Would You Rather?</h2>

        <div className="wyr-question-number">
          Question {currentIndex + 1} of {QUESTIONS.length}
        </div>

        <div className="wyr-options">
          <button
            className={`wyr-option ${hasVoted ? 'voted' : ''}`}
            onClick={() => !hasVoted && handleVote('option1')}
            disabled={hasVoted}
          >
            <div className="wyr-option-text">{currentQuestion.option1}</div>
            {hasVoted && (
              <div className="wyr-votes">
                <div className="vote-bar" style={{ width: `${option1Percentage}%` }} />
                <div className="vote-text">
                  {votes.option1} ({option1Percentage.toFixed(0)}%)
                </div>
              </div>
            )}
          </button>

          <div className="wyr-or">OR</div>

          <button
            className={`wyr-option ${hasVoted ? 'voted' : ''}`}
            onClick={() => !hasVoted && handleVote('option2')}
            disabled={hasVoted}
          >
            <div className="wyr-option-text">{currentQuestion.option2}</div>
            {hasVoted && (
              <div className="wyr-votes">
                <div className="vote-bar" style={{ width: `${option2Percentage}%` }} />
                <div className="vote-text">
                  {votes.option2} ({option2Percentage.toFixed(0)}%)
                </div>
              </div>
            )}
          </button>
        </div>

        <div className="wyr-actions">
          <button className="reset-button" onClick={handleNext}>
            Next Question
          </button>
          <button className="reset-button secondary" onClick={handleRandom}>
            Random
          </button>
        </div>

        <div className="wyr-stats">Total votes: {totalVotes}</div>
      </div>
    </div>
  );
};
