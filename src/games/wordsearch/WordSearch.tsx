import { useState, useEffect } from 'react';
import './WordSearch.css';

const WORDS = ['REACT', 'TYPESCRIPT', 'JAVASCRIPT', 'CODE', 'DEBUG', 'STATE', 'PROPS', 'HOOK'];
const GRID_SIZE = 12;

interface Position {
  row: number;
  col: number;
}

export const WordSearch = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [wordsToFind, setWordsToFind] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<Position | null>(null);

  useEffect(() => {
    generatePuzzle();
  }, []);

  const generatePuzzle = () => {
    const newGrid: string[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(''));

    const words = [...WORDS];
    const placedWords: string[] = [];

    // Place words
    for (const word of words) {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 50) {
        const direction = Math.floor(Math.random() * 3); // 0: horizontal, 1: vertical, 2: diagonal
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);

        if (canPlaceWord(newGrid, word, row, col, direction)) {
          placeWord(newGrid, word, row, col, direction);
          placedWords.push(word);
          placed = true;
        }
        attempts++;
      }
    }

    // Fill remaining cells with random letters
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (newGrid[i][j] === '') {
          newGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    setGrid(newGrid);
    setWordsToFind(placedWords);
    setFoundWords(new Set());
    setSelectedCells(new Set());
  };

  const canPlaceWord = (grid: string[][], word: string, row: number, col: number, direction: number): boolean => {
    if (direction === 0) { // horizontal
      if (col + word.length > GRID_SIZE) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) return false;
      }
    } else if (direction === 1) { // vertical
      if (row + word.length > GRID_SIZE) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) return false;
      }
    } else { // diagonal
      if (row + word.length > GRID_SIZE || col + word.length > GRID_SIZE) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col + i] !== '' && grid[row + i][col + i] !== word[i]) return false;
      }
    }
    return true;
  };

  const placeWord = (grid: string[][], word: string, row: number, col: number, direction: number) => {
    for (let i = 0; i < word.length; i++) {
      if (direction === 0) {
        grid[row][col + i] = word[i];
      } else if (direction === 1) {
        grid[row + i][col] = word[i];
      } else {
        grid[row + i][col + i] = word[i];
      }
    }
  };

  const getCellKey = (row: number, col: number) => `${row},${col}`;

  const handleMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setSelectionStart({ row, col });
    setSelectedCells(new Set([getCellKey(row, col)]));
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isSelecting || !selectionStart) return;

    const newSelected = new Set<string>();
    const startRow = selectionStart.row;
    const startCol = selectionStart.col;

    // Check if selection is horizontal, vertical, or diagonal
    if (row === startRow) { // horizontal
      const start = Math.min(startCol, col);
      const end = Math.max(startCol, col);
      for (let c = start; c <= end; c++) {
        newSelected.add(getCellKey(row, c));
      }
    } else if (col === startCol) { // vertical
      const start = Math.min(startRow, row);
      const end = Math.max(startRow, row);
      for (let r = start; r <= end; r++) {
        newSelected.add(getCellKey(r, col));
      }
    } else if (Math.abs(row - startRow) === Math.abs(col - startCol)) { // diagonal
      const steps = Math.abs(row - startRow);
      const rowDir = row > startRow ? 1 : -1;
      const colDir = col > startCol ? 1 : -1;
      for (let i = 0; i <= steps; i++) {
        newSelected.add(getCellKey(startRow + i * rowDir, startCol + i * colDir));
      }
    }

    setSelectedCells(newSelected);
  };

  const handleMouseUp = () => {
    if (!isSelecting) return;

    // Check if selected word matches any word to find
    const selectedLetters = Array.from(selectedCells)
      .sort()
      .map(key => {
        const [row, col] = key.split(',').map(Number);
        return grid[row][col];
      })
      .join('');

    for (const word of wordsToFind) {
      if (selectedLetters === word || selectedLetters === word.split('').reverse().join('')) {
        setFoundWords(prev => new Set([...prev, word]));
      }
    }

    setIsSelecting(false);
    setSelectionStart(null);
    setSelectedCells(new Set());
  };

  return (
    <div className="game-container">
      <div className="wordsearch-container">
        <h2 className="wordsearch-title">Word Search</h2>

        <div className="wordsearch-words">
          {wordsToFind.map(word => (
            <span key={word} className={`word-item ${foundWords.has(word) ? 'found' : ''}`}>
              {word}
            </span>
          ))}
        </div>

        <div
          className="wordsearch-grid"
          onMouseLeave={() => {
            setIsSelecting(false);
            setSelectedCells(new Set());
          }}
        >
          {grid.map((row, i) => (
            <div key={i} className="wordsearch-row">
              {row.map((letter, j) => (
                <div
                  key={j}
                  className={`wordsearch-cell ${selectedCells.has(getCellKey(i, j)) ? 'selected' : ''}`}
                  onMouseDown={() => handleMouseDown(i, j)}
                  onMouseEnter={() => handleMouseEnter(i, j)}
                  onMouseUp={handleMouseUp}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        {foundWords.size === wordsToFind.length && (
          <div className="wordsearch-complete">
            🎉 You found all the words!
          </div>
        )}

        <button className="reset-button" onClick={generatePuzzle}>
          New Puzzle
        </button>

        <div className="wordsearch-instructions">
          Click and drag to select words. They can be horizontal, vertical, or diagonal.
        </div>
      </div>
    </div>
  );
};
