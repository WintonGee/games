import { useState } from 'react';
import './Trivia.css';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

const QUESTIONS: Question[] = [
  {
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
    category: 'Geography',
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
    correctAnswer: 1,
    category: 'Art',
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'],
    correctAnswer: 2,
    category: 'Science',
  },
  {
    question: 'In what year did World War II end?',
    options: ['1943', '1944', '1945', '1946'],
    correctAnswer: 2,
    category: 'History',
  },
  {
    question: 'What is the smallest country in the world?',
    options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
    correctAnswer: 1,
    category: 'Geography',
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    correctAnswer: 1,
    category: 'Literature',
  },
  {
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctAnswer: 2,
    category: 'Science',
  },
  {
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    category: 'Geography',
  },
  {
    question: 'What is the fastest land animal?',
    options: ['Lion', 'Cheetah', 'Leopard', 'Tiger'],
    correctAnswer: 1,
    category: 'Nature',
  },
  {
    question: 'Which programming language is known as the "language of the web"?',
    options: ['Python', 'Java', 'JavaScript', 'C++'],
    correctAnswer: 2,
    category: 'Technology',
  },
];

export const Trivia = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentQuestion = QUESTIONS[currentIndex];

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;

    setSelectedAnswer(answerIndex);
    setAnswered(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      // Quiz finished
      setCurrentIndex(0);
      setScore(0);
      setAnswered(false);
      setSelectedAnswer(null);
    }
  };

  const isLastQuestion = currentIndex === QUESTIONS.length - 1;

  return (
    <div className="game-container">
      <div className="trivia-container">
        <div className="trivia-header">
          <h2 className="trivia-title">Trivia Quiz</h2>
          <div className="trivia-score">
            Score: {score}/{QUESTIONS.length}
          </div>
        </div>

        <div className="trivia-progress">
          Question {currentIndex + 1} of {QUESTIONS.length}
        </div>

        <div className="trivia-category">{currentQuestion.category}</div>

        <div className="trivia-question">{currentQuestion.question}</div>

        <div className="trivia-options">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctAnswer;
            const isSelected = index === selectedAnswer;
            const showResult = answered;

            let className = 'trivia-option';
            if (showResult) {
              if (isCorrect) className += ' correct';
              else if (isSelected) className += ' incorrect';
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswer(index)}
                disabled={answered}
              >
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="trivia-feedback">
            {selectedAnswer === currentQuestion.correctAnswer ? (
              <span className="correct-feedback">✓ Correct!</span>
            ) : (
              <span className="incorrect-feedback">
                ✗ Incorrect. The answer was: {currentQuestion.options[currentQuestion.correctAnswer]}
              </span>
            )}
          </div>
        )}

        <button className="reset-button" onClick={handleNext} disabled={!answered}>
          {isLastQuestion ? 'Finish & Restart' : 'Next Question'}
        </button>

        {isLastQuestion && answered && (
          <div className="trivia-final-score">
            Final Score: {score}/{QUESTIONS.length} (
            {((score / QUESTIONS.length) * 100).toFixed(0)}%)
          </div>
        )}
      </div>
    </div>
  );
};
