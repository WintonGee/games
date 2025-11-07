import { GameEngine } from '../../types/game';

export type Direction2048 = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Puzzle2048State {
  grid: number[][];
  score: number;
  gameOver: boolean;
  won: boolean;
  currentPlayer: number;
  winner: number | null;
  isDraw: boolean;
  isGameOver: boolean;
}

const GRID_SIZE = 4;

class Puzzle2048Engine implements GameEngine<Puzzle2048State> {
  getInitialState(): Puzzle2048State {
    const grid = this.createEmptyGrid();
    this.addRandomTile(grid);
    this.addRandomTile(grid);

    return {
      grid,
      score: 0,
      gameOver: false,
      won: false,
      currentPlayer: 1,
      winner: null,
      isDraw: false,
      isGameOver: false,
    };
  }

  private createEmptyGrid(): number[][] {
    return Array(GRID_SIZE)
      .fill(0)
      .map(() => Array(GRID_SIZE).fill(0));
  }

  private addRandomTile(grid: number[][]): void {
    const emptyCells: { row: number; col: number }[] = [];

    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (grid[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length > 0) {
      const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  makeMove(state: Puzzle2048State, direction: Direction2048): Puzzle2048State {
    if (state.gameOver) return state;

    const newGrid = this.copyGrid(state.grid);
    let moved = false;
    let scoreGained = 0;

    if (direction === 'LEFT') {
      for (let row = 0; row < GRID_SIZE; row++) {
        const result = this.mergeLine(newGrid[row]);
        if (result.moved) moved = true;
        scoreGained += result.score;
        newGrid[row] = result.line;
      }
    } else if (direction === 'RIGHT') {
      for (let row = 0; row < GRID_SIZE; row++) {
        const reversed = [...newGrid[row]].reverse();
        const result = this.mergeLine(reversed);
        if (result.moved) moved = true;
        scoreGained += result.score;
        newGrid[row] = result.line.reverse();
      }
    } else if (direction === 'UP') {
      for (let col = 0; col < GRID_SIZE; col++) {
        const column = newGrid.map((row) => row[col]);
        const result = this.mergeLine(column);
        if (result.moved) moved = true;
        scoreGained += result.score;
        for (let row = 0; row < GRID_SIZE; row++) {
          newGrid[row][col] = result.line[row];
        }
      }
    } else if (direction === 'DOWN') {
      for (let col = 0; col < GRID_SIZE; col++) {
        const column = newGrid.map((row) => row[col]).reverse();
        const result = this.mergeLine(column);
        if (result.moved) moved = true;
        scoreGained += result.score;
        const reversedLine = result.line.reverse();
        for (let row = 0; row < GRID_SIZE; row++) {
          newGrid[row][col] = reversedLine[row];
        }
      }
    }

    if (!moved) return state;

    this.addRandomTile(newGrid);

    const won = this.checkWin(newGrid);
    const gameOver = this.checkGameOver(newGrid);

    return {
      ...state,
      grid: newGrid,
      score: state.score + scoreGained,
      won,
      gameOver,
      isGameOver: gameOver,
    };
  }

  private copyGrid(grid: number[][]): number[][] {
    return grid.map((row) => [...row]);
  }

  private mergeLine(line: number[]): { line: number[]; moved: boolean; score: number } {
    const nonZero = line.filter((val) => val !== 0);
    const merged: number[] = [];
    let score = 0;
    let i = 0;

    while (i < nonZero.length) {
      if (i < nonZero.length - 1 && nonZero[i] === nonZero[i + 1]) {
        const mergedValue = nonZero[i] * 2;
        merged.push(mergedValue);
        score += mergedValue;
        i += 2;
      } else {
        merged.push(nonZero[i]);
        i++;
      }
    }

    while (merged.length < GRID_SIZE) {
      merged.push(0);
    }

    const moved = !line.every((val, idx) => val === merged[idx]);

    return { line: merged, moved, score };
  }

  private checkWin(grid: number[][]): boolean {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (grid[row][col] === 2048) return true;
      }
    }
    return false;
  }

  private checkGameOver(grid: number[][]): boolean {
    // Check for empty cells
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (grid[row][col] === 0) return false;
      }
    }

    // Check for possible merges
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const current = grid[row][col];
        if (col < GRID_SIZE - 1 && grid[row][col + 1] === current) return false;
        if (row < GRID_SIZE - 1 && grid[row + 1][col] === current) return false;
      }
    }

    return true;
  }

  getValidMoves(_state: Puzzle2048State): Direction2048[] {
    return ['UP', 'DOWN', 'LEFT', 'RIGHT'];
  }

  checkWinner(_state: Puzzle2048State): number | null {
    return null;
  }

  checkDraw(_state: Puzzle2048State): boolean {
    return false;
  }

  getAIMove(_state: Puzzle2048State): Direction2048 | null {
    return null;
  }
}

export const puzzle2048Engine = new Puzzle2048Engine();
