# Game Collection

A modern, responsive web-based game collection featuring 17 different games including board games, puzzles, arcade classics, card games, and party games!

## Features

- **17 Diverse Games**
  - **Board Games**: Tic-Tac-Toe, Connect 4
  - **Quick Games**: Rock Paper Scissors, Hangman, Memory, Whack-a-Mole
  - **Puzzle Games**: Simon Says, Snake, 2048, Wordle, Word Search
  - **Card Games**: Blackjack
  - **Party Games**: Would You Rather, Truth or Dare, Trivia, Never Have I Ever, Charades

- **Multiple Game Modes**
  - Singleplayer: Play against AI opponents
  - Multiplayer: Play locally with a friend
  - Party Mode: Great for groups and gatherings

- **Modern Tech Stack**
  - React 18 with TypeScript
  - Vite for fast development and building
  - CSS modules for styling
  - Fully typed with TypeScript

- **Clean Architecture**
  - Reusable game engine interfaces
  - Shared UI components
  - Easy to extend with new games

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`

### Build

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

### Preview

```bash
npm run preview
```

Preview the production build locally.

## Project Structure

```
src/
├── components/           # Shared UI components
│   ├── GameSelector.tsx  # Game selection UI
│   └── ModeSelector.tsx  # Mode selection UI
├── games/               # Game implementations
│   ├── tictactoe/
│   │   ├── TicTacToe.tsx
│   │   ├── TicTacToeEngine.ts
│   │   └── TicTacToe.css
│   ├── connect4/
│   │   ├── Connect4.tsx
│   │   ├── Connect4Engine.ts
│   │   └── Connect4.css
│   └── hangman/
│       ├── Hangman.tsx
│       ├── HangmanEngine.ts
│       └── Hangman.css
├── hooks/               # Custom React hooks
│   └── useGameState.ts  # Shared game state management
├── types/               # TypeScript type definitions
│   └── game.ts          # Game engine interfaces
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Games Overview

### Board Games

**Tic-Tac-Toe**
- Classic 3x3 grid game
- AI uses unbeatable Minimax algorithm
- Supports singleplayer and multiplayer modes

**Connect 4**
- Drop colored discs into a 7x6 grid
- Connect four in a row to win
- Strategic AI opponent in singleplayer mode

### Quick Games

**Rock Paper Scissors**
- Classic hand game with score tracking
- Play against AI or a friend
- Best-of-many rounds format

**Hangman**
- Guess the hidden word letter by letter
- 6 wrong guesses allowed
- Tech-themed word list

**Memory**
- Match pairs of cards
- Compete for best score in multiplayer
- Track moves in singleplayer

**Whack-a-Mole**
- Fast-paced reflex game
- 30 second time limit
- Click moles as they pop up to score points

### Puzzle Games

**Simon Says**
- Pattern memory challenge
- Increasing difficulty levels
- Beat your high score

**Snake**
- Classic arcade game
- Use arrow keys to navigate
- Eat food to grow and score points

**2048**
- Slide and merge number tiles
- Reach the 2048 tile to win
- Keyboard-controlled puzzle game

**Wordle**
- Guess the 5-letter word in 6 tries
- Color-coded feedback for each guess
- On-screen keyboard with letter status

**Word Search**
- Find hidden words in a 12x12 grid
- Words can be horizontal, vertical, or diagonal
- Click and drag to select words

### Card Games

**Blackjack**
- Classic 21 card game
- Beat the dealer without going over 21
- Dealer hits until 17

### Party Games

**Would You Rather**
- Tough choice questions
- Vote tracking and statistics
- Perfect for groups

**Truth or Dare**
- Classic party game
- Randomized truths and dares
- No repeats until all used

**Trivia**
- Multiple choice quiz game
- Various categories
- Track your score and accuracy

**Never Have I Ever**
- Classic party game prompts
- Random selection without repeats
- Perfect for group gatherings

**Charades**
- Act out words from different categories
- 60-second timer per round
- Categories: Movies, Actions, Animals, Occupations

## Architecture Highlights

### Game Engine Pattern
Each game implements a common `GameEngine<T>` interface:
- `getInitialState()`: Returns the initial game state
- `makeMove()`: Processes a move and returns new state
- `checkWinner()`: Checks for a winning condition
- `checkDraw()`: Checks for a draw condition
- `getAIMove()`: Calculates the AI's next move

### Shared Game State Hook
The `useGameState` hook provides:
- State management for game state
- Automatic AI move execution in singleplayer mode
- Game reset functionality

## Technologies Used

- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Vite 4** - Build tool and dev server
- **CSS3** - Styling with modern features

## Browser Support

Works in all modern browsers that support ES2020:
- Chrome/Edge 80+
- Firefox 80+
- Safari 14+

## License

MIT
