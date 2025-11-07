# Game Collection

A modern, responsive web-based game collection featuring Tic-Tac-Toe, Connect 4, and Hangman with both singleplayer (vs AI) and multiplayer (local) modes.

## Features

- **Three Classic Games**
  - Tic-Tac-Toe with unbeatable AI using Minimax algorithm
  - Connect 4 with strategic AI
  - Hangman with word guessing

- **Two Game Modes**
  - Singleplayer: Play against AI opponents
  - Multiplayer: Play locally with a friend

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

## How to Play

### Tic-Tac-Toe
- Classic 3x3 grid game
- Get three in a row (horizontal, vertical, or diagonal) to win
- In singleplayer mode, the AI uses the Minimax algorithm for optimal play

### Connect 4
- Drop colored discs into a 7x6 grid
- Connect four discs in a row (horizontal, vertical, or diagonal) to win
- In singleplayer mode, the AI uses strategic positioning and blocking

### Hangman
- Guess the hidden word by selecting letters
- You have 6 wrong guesses before losing
- Words are tech-related terms

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
