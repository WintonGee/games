import { GameEngine } from '../../types/game';

export interface Position {
  x: number;
  y: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface SnakeState {
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  gameOver: boolean;
  gridSize: number;
  currentPlayer: number;
  winner: number | null;
  isDraw: boolean;
  isGameOver: boolean;
}

const GRID_SIZE = 20;

class SnakeEngine implements GameEngine<SnakeState> {
  getInitialState(): SnakeState {
    const initialSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];

    return {
      snake: initialSnake,
      food: this.generateFood(initialSnake),
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
      score: 0,
      gameOver: false,
      gridSize: GRID_SIZE,
      currentPlayer: 1,
      winner: null,
      isDraw: false,
      isGameOver: false,
    };
  }

  private generateFood(snake: Position[]): Position {
    let food: Position;
    do {
      food = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some((segment) => segment.x === food.x && segment.y === food.y));
    return food;
  }

  setDirection(state: SnakeState, direction: Direction): SnakeState {
    // Prevent reversing direction
    const opposites: Record<Direction, Direction> = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    if (opposites[direction] === state.direction) {
      return state;
    }

    return {
      ...state,
      nextDirection: direction,
    };
  }

  makeMove(state: SnakeState, _move: any): SnakeState {
    if (state.gameOver) return state;

    const direction = state.nextDirection;
    const head = state.snake[0];

    const moves: Record<Direction, Position> = {
      UP: { x: head.x, y: head.y - 1 },
      DOWN: { x: head.x, y: head.y + 1 },
      LEFT: { x: head.x - 1, y: head.y },
      RIGHT: { x: head.x + 1, y: head.y },
    };

    const newHead = moves[direction];

    // Check wall collision
    if (
      newHead.x < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y < 0 ||
      newHead.y >= GRID_SIZE
    ) {
      return {
        ...state,
        gameOver: true,
        isGameOver: true,
      };
    }

    // Check self collision
    if (state.snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
      return {
        ...state,
        gameOver: true,
        isGameOver: true,
      };
    }

    const newSnake = [newHead, ...state.snake];

    // Check food collision
    if (newHead.x === state.food.x && newHead.y === state.food.y) {
      return {
        ...state,
        snake: newSnake,
        food: this.generateFood(newSnake),
        direction,
        score: state.score + 10,
      };
    }

    // No food, remove tail
    newSnake.pop();

    return {
      ...state,
      snake: newSnake,
      direction,
    };
  }

  getValidMoves(_state: SnakeState): any[] {
    return [];
  }

  checkWinner(_state: SnakeState): number | null {
    return null;
  }

  checkDraw(_state: SnakeState): boolean {
    return false;
  }

  getAIMove(_state: SnakeState): any {
    return null;
  }
}

export const snakeEngine = new SnakeEngine();
