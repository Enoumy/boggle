import React, { useState } from 'react';
import DenseAppBar from './DenseAppBar.js';
import SizeSelector from './SizeSelector.js';
import SquareGrid from './Grid.js';
import CircularIndeterminate from './Loading.js';
import TimingOption from './TimingOption.js';
import StartButton from './StartButton';
import WordInput from './WordInput';
import './App.css';

const dictionary = require('./full-wordlist.json');

/** Returns a randomly generated sizexsize grid.
 * @param {number} size - Size of square matrix.
 * @returns {string[][]} random square board.
 */
function generateRandomBoggleBoard(size) {
  // prettier-ignore
  const dice = ["AAAFRS", "AAEEEE", "AAFIRS", "ADENNN", "AEEEEM",
                "AEEGMU", "AEGMNN", "AFIRSY", "BJKQXZ", "CCNSTW",
                "CEIILT", "CEILPT", "CEIPST", "DHHNOT", "DHHLOR",
                "DHLNOR", "DDLNOR", "EIIITT", "EMOTTT", "ENSSSU",
                "FIPRSY", "GORRVW", "HIPRRY", "NOOTUW", "OOOTTU"];

  let board = new Array(size);
  for (let i = 0; i < size; i++) {
    board[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      let diceIndex = Math.floor(Math.random() * dice.length);
      board[i][j] = dice[diceIndex].charAt(
        Math.floor(Math.random() * dice[diceIndex].length)
      );
      if (board[i][j] === 'Q') board[i][j] += 'u';
    }
  }
  return board;
}

function App() {
  const [board, setBoard] = useState(generateRandomBoggleBoard(4));
  const [started, setStarted] = useState(true);

  return (
    <div>
      <DenseAppBar />
      <SizeSelector
        parentCallback={gridSize => {
          setBoard(generateRandomBoggleBoard(gridSize));
        }}
      />
      <TimingOption parentCallback={time => {}} />
      <StartButton started={started} />
      <SquareGrid data={board} />
      <WordInput
        onEnter={word => {
          console.log(word);
        }}
      />
    </div>
  );
}

export default App;
