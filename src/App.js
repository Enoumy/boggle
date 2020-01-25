import React, { useState } from 'react';
import DenseAppBar from './DenseAppBar.js';
import SizeSelector from './SizeSelector.js';
import SquareGrid from './Grid.js';
import CircularIndeterminate from './Loading.js';
import './App.css';

const characters = 'abcdefghijklmnopqrstuvwxyz';

/** Returns a randomly generated sizexsize grid.
 * @param {number} size - Size of square matrix.
 * @returns {string[][]} random square board.
 */
function generateRandomBoggleBoard(size) {
  let board = new Array(size);
  for (let i = 0; i < size; i++) {
    board[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      board[i][j] = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      if (board[i][j] === 'q') board[i][j] += 'u';
    }
  }
  return board;
}

function App() {
  const [board, setBoard] = useState(generateRandomBoggleBoard(4));

  return (
    <div>
      <DenseAppBar />
      <SizeSelector
        parentCallback={gridSize => {
          setBoard(generateRandomBoggleBoard(gridSize));
        }}
      />
      <SquareGrid data={board} />
    </div>
  );
}

export default App;
