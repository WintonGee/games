export type GameMode = 'singleplayer' | 'multiplayer' | 'party';

export type GameType =
  | 'tictactoe'
  | 'connect4'
  | 'hangman'
  | 'rps'
  | 'memory'
  | 'simon'
  | 'snake'
  | 'puzzle2048'
  | 'wouldyourather'
  | 'truthordare'
  | 'trivia';

export interface GameEngine<T> {
  getInitialState(): T;
  makeMove(state: T, move: any): T;
  getValidMoves(state: T): any[];
  checkWinner(state: T): number | null;
  checkDraw(state: T): boolean;
  getAIMove(state: T, difficulty?: 'easy' | 'medium' | 'hard'): any;
}
