import { useState } from 'react';
import './Blackjack.css';

type Suit = '♠' | '♥' | '♦' | '♣';
type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

interface Card {
  suit: Suit;
  rank: Rank;
}

export const Blackjack = () => {
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [deck, setDeck] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<'betting' | 'playing' | 'dealer' | 'finished'>('betting');
  const [result, setResult] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  const createDeck = (): Card[] => {
    const suits: Suit[] = ['♠', '♥', '♦', '♣'];
    const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const newDeck: Card[] = [];

    for (const suit of suits) {
      for (const rank of ranks) {
        newDeck.push({ suit, rank });
      }
    }

    return newDeck.sort(() => Math.random() - 0.5);
  };

  const getCardValue = (card: Card): number => {
    if (card.rank === 'A') return 11;
    if (['J', 'Q', 'K'].includes(card.rank)) return 10;
    return parseInt(card.rank);
  };

  const calculateHandValue = (hand: Card[]): number => {
    let value = 0;
    let aces = 0;

    for (const card of hand) {
      const cardValue = getCardValue(card);
      value += cardValue;
      if (card.rank === 'A') aces++;
    }

    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }

    return value;
  };

  const startNewGame = () => {
    const newDeck = createDeck();
    const playerCards = [newDeck.pop()!, newDeck.pop()!];
    const dealerCards = [newDeck.pop()!, newDeck.pop()!];

    setDeck(newDeck);
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setGameState('playing');
    setResult('');
    setPlayerScore(calculateHandValue(playerCards));
    setDealerScore(calculateHandValue([dealerCards[0]]));
  };

  const hit = () => {
    const newDeck = [...deck];
    const newCard = newDeck.pop()!;
    const newPlayerHand = [...playerHand, newCard];
    const newScore = calculateHandValue(newPlayerHand);

    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    setPlayerScore(newScore);

    if (newScore > 21) {
      setGameState('finished');
      setResult('Bust! Dealer wins!');
    }
  };

  const stand = () => {
    setGameState('dealer');
    let newDealerHand = [...dealerHand];
    let newDeck = [...deck];
    let dealerValue = calculateHandValue(newDealerHand);

    while (dealerValue < 17) {
      const newCard = newDeck.pop()!;
      newDealerHand.push(newCard);
      dealerValue = calculateHandValue(newDealerHand);
    }

    setDealerHand(newDealerHand);
    setDealerScore(dealerValue);
    setDeck(newDeck);

    const playerValue = calculateHandValue(playerHand);

    if (dealerValue > 21) {
      setResult('Dealer busts! You win!');
    } else if (playerValue > dealerValue) {
      setResult('You win!');
    } else if (dealerValue > playerValue) {
      setResult('Dealer wins!');
    } else {
      setResult("It's a push!");
    }

    setGameState('finished');
  };

  return (
    <div className="game-container">
      <div className="blackjack-container">
        <h2 className="blackjack-title">Blackjack</h2>

        {gameState === 'betting' && (
          <div className="blackjack-start">
            <button className="reset-button large" onClick={startNewGame}>
              Deal Cards
            </button>
          </div>
        )}

        {gameState !== 'betting' && (
          <>
            <div className="blackjack-table">
              <div className="hand-section">
                <h3>
                  Dealer {gameState === 'playing' ? `(${dealerScore})` : `(${calculateHandValue(dealerHand)})`}
                </h3>
                <div className="card-hand">
                  {dealerHand.map((card, i) => (
                    <div
                      key={i}
                      className={`card ${gameState === 'playing' && i === 1 ? 'hidden' : ''}`}
                    >
                      {gameState === 'playing' && i === 1 ? (
                        '🂠'
                      ) : (
                        <>
                          <span className={card.suit === '♥' || card.suit === '♦' ? 'red' : ''}>
                            {card.rank}
                            {card.suit}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hand-section">
                <h3>You ({playerScore})</h3>
                <div className="card-hand">
                  {playerHand.map((card, i) => (
                    <div key={i} className="card">
                      <span className={card.suit === '♥' || card.suit === '♦' ? 'red' : ''}>
                        {card.rank}
                        {card.suit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {result && <div className="blackjack-result">{result}</div>}

            <div className="blackjack-actions">
              {gameState === 'playing' && (
                <>
                  <button className="reset-button" onClick={hit}>
                    Hit
                  </button>
                  <button className="reset-button secondary" onClick={stand}>
                    Stand
                  </button>
                </>
              )}
              {gameState === 'finished' && (
                <button className="reset-button" onClick={startNewGame}>
                  New Game
                </button>
              )}
            </div>
          </>
        )}

        <div className="blackjack-instructions">
          Get closer to 21 than the dealer without going over. Face cards = 10, Aces = 1 or 11
        </div>
      </div>
    </div>
  );
};
