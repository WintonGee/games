import { useState } from 'react';
import { GameMode } from '../../types/game';
import { rpsEngine, RPSState, RPSChoice } from './RPSEngine';
import './RPS.css';

interface RPSProps {
  mode: GameMode;
}

export const RPS = ({ mode }: RPSProps) => {
  const [state, setState] = useState<RPSState>(rpsEngine.getInitialState());

  const handleChoice = (choice: RPSChoice) => {
    let newState = rpsEngine.makeMove(state, choice);

    // In singleplayer mode, AI makes move immediately
    if (mode === 'singleplayer' && newState.currentPlayer === 2) {
      setTimeout(() => {
        const aiChoice = rpsEngine.getAIMove(newState);
        setState(rpsEngine.makeMove(newState, aiChoice));
      }, 300);
      setState(newState);
    } else {
      setState(newState);
    }
  };

  const handlePlayAgain = () => {
    setState(rpsEngine.resetRound(state));
  };

  const handleNewGame = () => {
    setState(rpsEngine.getInitialState());
  };

  const getChoiceEmoji = (choice: RPSChoice) => {
    if (choice === 'rock') return '✊';
    if (choice === 'paper') return '✋';
    if (choice === 'scissors') return '✌️';
    return '❓';
  };

  const getResultMessage = () => {
    if (!state.isGameOver) {
      if (mode === 'multiplayer' && state.currentPlayer === 2) {
        return 'Player 2: Make your choice!';
      }
      return 'Make your choice!';
    }

    if (state.isDraw) {
      return "It's a tie!";
    }

    if (mode === 'singleplayer') {
      return state.winner === 1 ? 'You win! 🎉' : 'AI wins! 🤖';
    }

    return `Player ${state.winner} wins! 🎉`;
  };

  const choices: RPSChoice[] = ['rock', 'paper', 'scissors'];

  return (
    <div className="game-container">
      <div className="rps-container">
        <div className="rps-scores">
          <div className="score-item">
            <div className="score-label">{mode === 'singleplayer' ? 'You' : 'Player 1'}</div>
            <div className="score-value">{state.scores.player1}</div>
          </div>
          <div className="score-divider">-</div>
          <div className="score-item">
            <div className="score-label">{mode === 'singleplayer' ? 'AI' : 'Player 2'}</div>
            <div className="score-value">{state.scores.player2}</div>
          </div>
        </div>

        <div className="rps-round">Round {state.round}</div>

        {state.isGameOver && (
          <div className="rps-choices-display">
            <div className="choice-display">
              <div className="choice-emoji">{getChoiceEmoji(state.player1Choice)}</div>
              <div className="choice-label">{state.player1Choice}</div>
            </div>
            <div className="vs">VS</div>
            <div className="choice-display">
              <div className="choice-emoji">{getChoiceEmoji(state.player2Choice)}</div>
              <div className="choice-label">{state.player2Choice}</div>
            </div>
          </div>
        )}

        <div className="game-status">{getResultMessage()}</div>

        {!state.isGameOver && (
          <div className="rps-buttons">
            {choices.map((choice) => (
              <button
                key={choice}
                className="rps-choice-button"
                onClick={() => handleChoice(choice)}
                disabled={mode === 'multiplayer' && state.currentPlayer === 2 && state.player1Choice !== null}
              >
                <div className="choice-emoji-large">{getChoiceEmoji(choice)}</div>
                <div className="choice-name">{choice}</div>
              </button>
            ))}
          </div>
        )}

        {state.isGameOver && (
          <div className="rps-actions">
            <button className="reset-button" onClick={handlePlayAgain}>
              Play Again
            </button>
            <button className="reset-button secondary" onClick={handleNewGame}>
              Reset Score
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
