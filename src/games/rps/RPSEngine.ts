import { GameEngine } from '../../types/game';

export type RPSChoice = 'rock' | 'paper' | 'scissors' | null;

export interface RPSState {
  player1Choice: RPSChoice;
  player2Choice: RPSChoice;
  currentPlayer: number;
  winner: number | null;
  isDraw: boolean;
  isGameOver: boolean;
  scores: { player1: number; player2: number };
  round: number;
}

class RPSEngine implements GameEngine<RPSState> {
  getInitialState(): RPSState {
    return {
      player1Choice: null,
      player2Choice: null,
      currentPlayer: 1,
      winner: null,
      isDraw: false,
      isGameOver: false,
      scores: { player1: 0, player2: 0 },
      round: 1,
    };
  }

  makeMove(state: RPSState, choice: RPSChoice): RPSState {
    if (state.isGameOver || choice === null) {
      return state;
    }

    if (state.currentPlayer === 1 && state.player1Choice === null) {
      return {
        ...state,
        player1Choice: choice,
        currentPlayer: 2,
      };
    }

    if (state.currentPlayer === 2 && state.player2Choice === null) {
      const newState = {
        ...state,
        player2Choice: choice,
      };
      return this.evaluateRound(newState);
    }

    return state;
  }

  private evaluateRound(state: RPSState): RPSState {
    const { player1Choice, player2Choice } = state;

    if (!player1Choice || !player2Choice) {
      return state;
    }

    const winner = this.determineWinner(player1Choice, player2Choice);
    const isDraw = winner === null;

    const newScores = { ...state.scores };
    if (winner === 1) newScores.player1++;
    if (winner === 2) newScores.player2++;

    return {
      ...state,
      winner,
      isDraw,
      isGameOver: true,
      scores: newScores,
    };
  }

  private determineWinner(p1: RPSChoice, p2: RPSChoice): number | null {
    if (p1 === p2) return null;

    const wins: Record<string, string> = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper',
    };

    return wins[p1!] === p2 ? 1 : 2;
  }

  getValidMoves(_state: RPSState): RPSChoice[] {
    return ['rock', 'paper', 'scissors'];
  }

  checkWinner(state: RPSState): number | null {
    return state.winner;
  }

  checkDraw(state: RPSState): boolean {
    return state.isDraw;
  }

  getAIMove(_state: RPSState): RPSChoice {
    const choices: RPSChoice[] = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  resetRound(state: RPSState): RPSState {
    return {
      ...state,
      player1Choice: null,
      player2Choice: null,
      currentPlayer: 1,
      winner: null,
      isDraw: false,
      isGameOver: false,
      round: state.round + 1,
    };
  }
}

export const rpsEngine = new RPSEngine();
