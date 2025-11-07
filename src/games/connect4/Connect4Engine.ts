import { GameEngine } from '../../types/game';

export interface Connect4State {
  board: (number | null)[][];
  currentPlayer: number;
  winner: number | null;
  isDraw: boolean;
  isGameOver: boolean;
}

const ROWS = 6;
const COLS = 7;

class Connect4Engine implements GameEngine<Connect4State> {
  getInitialState(): Connect4State {
    return {
      board: Array(ROWS)
        .fill(null)
        .map(() => Array(COLS).fill(null)),
      currentPlayer: 1,
      winner: null,
      isDraw: false,
      isGameOver: false,
    };
  }

  makeMove(state: Connect4State, column: number): Connect4State {
    if (state.isGameOver || column < 0 || column >= COLS) {
      return state;
    }

    // Find the lowest empty row in the column
    let row = -1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (state.board[r][column] === null) {
        row = r;
        break;
      }
    }

    if (row === -1) return state; // Column is full

    const newBoard = state.board.map((r) => [...r]);
    newBoard[row][column] = state.currentPlayer;

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

  getValidMoves(state: Connect4State): number[] {
    const validMoves: number[] = [];
    for (let col = 0; col < COLS; col++) {
      if (state.board[0][col] === null) {
        validMoves.push(col);
      }
    }
    return validMoves;
  }

  checkWinner(state: Connect4State): number | null {
    // Check horizontal
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c <= COLS - 4; c++) {
        const player = state.board[r][c];
        if (
          player !== null &&
          state.board[r][c + 1] === player &&
          state.board[r][c + 2] === player &&
          state.board[r][c + 3] === player
        ) {
          return player;
        }
      }
    }

    // Check vertical
    for (let r = 0; r <= ROWS - 4; r++) {
      for (let c = 0; c < COLS; c++) {
        const player = state.board[r][c];
        if (
          player !== null &&
          state.board[r + 1][c] === player &&
          state.board[r + 2][c] === player &&
          state.board[r + 3][c] === player
        ) {
          return player;
        }
      }
    }

    // Check diagonal (down-right)
    for (let r = 0; r <= ROWS - 4; r++) {
      for (let c = 0; c <= COLS - 4; c++) {
        const player = state.board[r][c];
        if (
          player !== null &&
          state.board[r + 1][c + 1] === player &&
          state.board[r + 2][c + 2] === player &&
          state.board[r + 3][c + 3] === player
        ) {
          return player;
        }
      }
    }

    // Check diagonal (down-left)
    for (let r = 0; r <= ROWS - 4; r++) {
      for (let c = 3; c < COLS; c++) {
        const player = state.board[r][c];
        if (
          player !== null &&
          state.board[r + 1][c - 1] === player &&
          state.board[r + 2][c - 2] === player &&
          state.board[r + 3][c - 3] === player
        ) {
          return player;
        }
      }
    }

    return null;
  }

  checkDraw(state: Connect4State): boolean {
    return (
      state.board.every((row) => row.every((cell) => cell !== null)) &&
      this.checkWinner(state) === null
    );
  }

  getAIMove(state: Connect4State, difficulty: 'easy' | 'medium' | 'hard' = 'hard'): number | null {
    const validMoves = this.getValidMoves(state);
    if (validMoves.length === 0) return null;

    if (difficulty === 'easy') {
      return validMoves[Math.floor(Math.random() * validMoves.length)];
    }

    // Check for winning move
    for (const move of validMoves) {
      const newState = this.makeMove(state, move);
      if (newState.winner === state.currentPlayer) {
        return move;
      }
    }

    // Check for blocking move
    for (const move of validMoves) {
      const testState = { ...state, currentPlayer: state.currentPlayer === 1 ? 2 : 1 };
      const newState = this.makeMove(testState, move);
      if (newState.winner !== null) {
        return move;
      }
    }

    // Prefer center columns
    const centerMoves = validMoves.filter((m) => m >= 2 && m <= 4);
    if (centerMoves.length > 0) {
      return centerMoves[Math.floor(Math.random() * centerMoves.length)];
    }

    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }
}

export const connect4Engine = new Connect4Engine();
