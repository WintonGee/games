import { GameEngine } from '../../types/game';

export type SimonColor = 'red' | 'blue' | 'green' | 'yellow';

export interface SimonState {
  sequence: SimonColor[];
  playerSequence: SimonColor[];
  currentLevel: number;
  isPlaying: boolean;
  isShowingSequence: boolean;
  gameOver: boolean;
  highScore: number;
  currentPlayer: number;
  winner: number | null;
  isDraw: boolean;
  isGameOver: boolean;
}

class SimonEngine implements GameEngine<SimonState> {
  getInitialState(): SimonState {
    return {
      sequence: [],
      playerSequence: [],
      currentLevel: 1,
      isPlaying: false,
      isShowingSequence: false,
      gameOver: false,
      highScore: 0,
      currentPlayer: 1,
      winner: null,
      isDraw: false,
      isGameOver: false,
    };
  }

  startNewRound(state: SimonState): SimonState {
    const colors: SimonColor[] = ['red', 'blue', 'green', 'yellow'];
    const newColor = colors[Math.floor(Math.random() * colors.length)];

    return {
      ...state,
      sequence: [...state.sequence, newColor],
      playerSequence: [],
      isPlaying: true,
      isShowingSequence: true,
      gameOver: false,
    };
  }

  makeMove(state: SimonState, color: SimonColor): SimonState {
    if (!state.isPlaying || state.isShowingSequence || state.gameOver) {
      return state;
    }

    const newPlayerSequence = [...state.playerSequence, color];

    // Check if the player's move is correct
    const currentIndex = newPlayerSequence.length - 1;
    if (newPlayerSequence[currentIndex] !== state.sequence[currentIndex]) {
      // Wrong move - game over
      return {
        ...state,
        playerSequence: newPlayerSequence,
        gameOver: true,
        isPlaying: false,
        isGameOver: true,
        highScore: Math.max(state.highScore, state.currentLevel),
      };
    }

    // Correct move
    if (newPlayerSequence.length === state.sequence.length) {
      // Player completed the sequence
      return {
        ...state,
        playerSequence: newPlayerSequence,
        currentLevel: state.currentLevel + 1,
      };
    }

    // Continue with current sequence
    return {
      ...state,
      playerSequence: newPlayerSequence,
    };
  }

  finishShowingSequence(state: SimonState): SimonState {
    return {
      ...state,
      isShowingSequence: false,
    };
  }

  getValidMoves(_state: SimonState): SimonColor[] {
    return ['red', 'blue', 'green', 'yellow'];
  }

  checkWinner(_state: SimonState): number | null {
    return null;
  }

  checkDraw(_state: SimonState): boolean {
    return false;
  }

  getAIMove(_state: SimonState): SimonColor | null {
    return null;
  }
}

export const simonEngine = new SimonEngine();
