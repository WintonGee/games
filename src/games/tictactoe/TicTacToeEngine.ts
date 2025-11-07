import { GameEngine } from '../../types/game';

export interface TicTacToeState {
  board: (number | null)[];
  currentPlayer: number;
  winner: number | null;
  isDraw: boolean;
  isGameOver: boolean;
}

class TicTacToeEngine implements GameEngine<TicTacToeState> {
  getInitialState(): TicTacToeState {
    return {
      board: Array(9).fill(null),
      currentPlayer: 1,
      winner: null,
      isDraw: false,
      isGameOver: false,
    };
  }

  makeMove(state: TicTacToeState, position: number): TicTacToeState {
    if (
      state.isGameOver ||
      state.board[position] !== null ||
      position < 0 ||
      position >= 9
    ) {
      return state;
    }

    const newBoard = [...state.board];
    newBoard[position] = state.currentPlayer;

    const winner = this.checkWinner({ ...state, board: newBoard });
    const isDraw = this.checkDraw({ ...state, board: newBoard });
    const isGameOver = winner !== null || isDraw;

    return {
      board: newBoard,
      currentPlayer: isGameOver ? state.currentPlayer : state.currentPlayer === 1 ? 2 : 1,
      winner,
      isDraw,
      isGameOver,
    };
  }

  getValidMoves(state: TicTacToeState): number[] {
    return state.board
      .map((cell, index) => (cell === null ? index : null))
      .filter((index): index is number => index !== null);
  }

  checkWinner(state: TicTacToeState): number | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (
        state.board[a] !== null &&
        state.board[a] === state.board[b] &&
        state.board[a] === state.board[c]
      ) {
        return state.board[a];
      }
    }

    return null;
  }

  checkDraw(state: TicTacToeState): boolean {
    return state.board.every((cell) => cell !== null) && this.checkWinner(state) === null;
  }

  getAIMove(state: TicTacToeState, difficulty: 'easy' | 'medium' | 'hard' = 'hard'): number | null {
    const validMoves = this.getValidMoves(state);
    if (validMoves.length === 0) return null;

    if (difficulty === 'easy') {
      return validMoves[Math.floor(Math.random() * validMoves.length)];
    }

    // Use minimax for medium and hard difficulty
    let bestScore = -Infinity;
    let bestMove = validMoves[0];

    for (const move of validMoves) {
      const newState = this.makeMove(state, move);
      const score = this.minimax(newState, 0, false);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }

  private minimax(state: TicTacToeState, depth: number, isMaximizing: boolean): number {
    const winner = this.checkWinner(state);
    if (winner === 2) return 10 - depth;
    if (winner === 1) return depth - 10;
    if (this.checkDraw(state)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      const validMoves = this.getValidMoves(state);
      for (const move of validMoves) {
        const newState = this.makeMove(state, move);
        const score = this.minimax(newState, depth + 1, false);
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      const validMoves = this.getValidMoves(state);
      for (const move of validMoves) {
        const newState = this.makeMove(state, move);
        const score = this.minimax(newState, depth + 1, true);
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  }
}

export const ticTacToeEngine = new TicTacToeEngine();
