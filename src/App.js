import React, { useState, useEffect } from 'react';
import InputItem from './Input.js';
import DenseAppBar from './DenseAppBar.js';
import SizeSelector from './SizeSelector.js';
import SquareGrid from './Grid.js';
// import useAsyncState from './UseAsync.js';
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
  const [board2, setBoard2] = useState(generateRandomBoggleBoard(4));

  useEffect(() => {
    setBoard(board2);
  }, [board2]);

  return (
    <div>
      <DenseAppBar />
      <SizeSelector
        parentCallback={gridSize => {
          console.log('Received grid size', gridSize);
          setBoard2(generateRandomBoggleBoard(gridSize));
        }}
      />
      <SquareGrid data={board} />
    </div>
  );
}

export default App;
