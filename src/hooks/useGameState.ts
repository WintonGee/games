import { useState, useCallback } from 'react';
import { GameMode } from '../types/game';

export function useGameState<T>(
  initialState: T,
  makeMove: (state: T, move: any) => T,
  getAIMove: (state: T) => any,
  mode: GameMode,
  _getCurrentPlayer: (state: T) => number,
  isGameOver: (state: T) => boolean
) {
  const [state, setState] = useState<T>(initialState);

  const handleMove = useCallback(
    (move: any) => {
      setState((currentState) => {
        if (isGameOver(currentState)) return currentState;

        const newState = makeMove(currentState, move);

        // In singleplayer mode, make AI move after player move
        if (mode === 'singleplayer' && !isGameOver(newState)) {
          setTimeout(() => {
            const aiMove = getAIMove(newState);
            if (aiMove !== null) {
              setState((state) => makeMove(state, aiMove));
            }
          }, 500);
        }

        return newState;
      });
    },
    [makeMove, getAIMove, mode, isGameOver]
  );

  const resetGame = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  return {
    state,
    handleMove,
    resetGame,
  };
}
