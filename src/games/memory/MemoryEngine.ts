import { GameEngine } from '../../types/game';

export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface MemoryState {
  cards: Card[];
  flippedCards: number[];
  currentPlayer: number;
  scores: { player1: number; player2: number };
  moves: number;
  winner: number | null;
  isDraw: boolean;
  isGameOver: boolean;
}

const CARD_VALUES = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎺', '🎹'];

class MemoryEngine implements GameEngine<MemoryState> {
  getInitialState(): MemoryState {
    const cards = this.shuffleCards();
    return {
      cards,
      flippedCards: [],
      currentPlayer: 1,
      scores: { player1: 0, player2: 0 },
      moves: 0,
      winner: null,
      isDraw: false,
      isGameOver: false,
    };
  }

  private shuffleCards(): Card[] {
    const pairs = [...CARD_VALUES, ...CARD_VALUES];
    const shuffled = pairs
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    return shuffled;
  }

  makeMove(state: MemoryState, cardId: number): MemoryState {
    if (state.isGameOver || state.flippedCards.length >= 2) {
      return state;
    }

    const card = state.cards[cardId];
    if (card.isFlipped || card.isMatched) {
      return state;
    }

    const newCards = [...state.cards];
    newCards[cardId] = { ...card, isFlipped: true };

    const newFlippedCards = [...state.flippedCards, cardId];

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards[firstId];
      const secondCard = newCards[secondId];

      if (firstCard.value === secondCard.value) {
        // Match found
        newCards[firstId] = { ...firstCard, isMatched: true };
        newCards[secondId] = { ...secondCard, isMatched: true };

        const newScores = { ...state.scores };
        if (state.currentPlayer === 1) {
          newScores.player1++;
        } else {
          newScores.player2++;
        }

        const newState = {
          ...state,
          cards: newCards,
          flippedCards: [],
          scores: newScores,
          moves: state.moves + 1,
        };

        const winner = this.checkWinner(newState);
        const isGameOver = winner !== null;

        return {
          ...newState,
          winner,
          isGameOver,
        };
      } else {
        // No match - will flip back after delay
        return {
          ...state,
          cards: newCards,
          flippedCards: newFlippedCards,
          moves: state.moves + 1,
        };
      }
    }

    return {
      ...state,
      cards: newCards,
      flippedCards: newFlippedCards,
    };
  }

  flipCardsBack(state: MemoryState): MemoryState {
    const newCards = state.cards.map((card) =>
      state.flippedCards.includes(card.id) && !card.isMatched
        ? { ...card, isFlipped: false }
        : card
    );

    return {
      ...state,
      cards: newCards,
      flippedCards: [],
      currentPlayer: state.currentPlayer === 1 ? 2 : 1,
    };
  }

  getValidMoves(state: MemoryState): number[] {
    return state.cards
      .filter((card) => !card.isFlipped && !card.isMatched)
      .map((card) => card.id);
  }

  checkWinner(state: MemoryState): number | null {
    const allMatched = state.cards.every((card) => card.isMatched);
    if (!allMatched) return null;

    if (state.scores.player1 > state.scores.player2) return 1;
    if (state.scores.player2 > state.scores.player1) return 2;
    return null; // Draw
  }

  checkDraw(state: MemoryState): boolean {
    const allMatched = state.cards.every((card) => card.isMatched);
    return allMatched && state.scores.player1 === state.scores.player2;
  }

  getAIMove(state: MemoryState): number | null {
    const validMoves = this.getValidMoves(state);
    if (validMoves.length === 0) return null;

    // Simple AI: random move
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }
}

export const memoryEngine = new MemoryEngine();
