import React, { useState } from 'react';
import CircularIndeterminate from './Loading.js';
import DenseAppBar from './DenseAppBar.js';
import Grid from '@material-ui/core/Grid';
import Notification from './Notification.js';
import SizeSelector from './SizeSelector.js';
import StartButton from './StartButton';
import SquareGrid from './Grid.js';
import Timer from './Timer.js';
import TimingOption from './TimingOption.js';
import WordInput from './WordInput';
import WordList from './WordList';
import findAllSolutions from './boggle_solver.js';
const dictionary = require('./full-wordlist.json')['words'];

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

function lowerCaseStringArray(stringArray) {
  for (let i = 0; i < stringArray.length; i++)
    stringArray[i] = stringArray[i].toLowerCase();
}

function App() {
  const [board, setBoard] = useState(generateRandomBoggleBoard(4));
  const [gridSize, setGridSize] = useState(4);
  const [gameState, setGameState] = useState('firstTime');
  const [wordsFound, setWordsFound] = useState([]);
  const [[wordsFoundSet], setWordsFoundsSet] = useState([new Set()]);
  const [[remainingSolutions], setRemainingSolutions] = useState([new Set()]);
  const [remainingSolutionsList, setRemainingSolutionsList] = useState([]);
  const [startTime, setStartTime] = useState(60);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const startGame = () => {
    setGameState('loading');
    let newBoard = generateRandomBoggleBoard(gridSize);
    setBoard(newBoard);
    let solutions = findAllSolutions(newBoard, dictionary);
    lowerCaseStringArray(solutions);
    setRemainingSolutions([new Set(solutions)]);
    setWordsFound([]);
    setWordsFoundsSet([new Set()]);
    setGameState('active');
  };

  const stopGame = () => {
    setGameState('stopped');
    setRemainingSolutionsList(Array.from(remainingSolutions));
  };

  const handleClick = msg => {
    setMessage(msg);
    setNotificationOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotificationOpen(false);
  };

  const onEnter = word => {
    word = word.toLowerCase().trim();
    console.log(word);
    if (remainingSolutions.has(word)) {
      setWordsFoundsSet([wordsFoundSet.add(word)]);
      setWordsFound([word, ...wordsFound]);
      remainingSolutions.delete(word);
      setRemainingSolutions([remainingSolutions]);
      setSeverity('success');
      handleClick("Nice! You found '" + word + "'");
    } else if (wordsFoundSet.has(word)) {
      setSeverity('warning');
      handleClick('Word already found: ' + word);
    }
  };

  return (
    <div>
      <DenseAppBar />
      <SizeSelector
        parentCallback={gridSize => {
          setGridSize(gridSize);
        }}
      />
      <TimingOption
        parentCallback={time => {
          setStartTime(time);
        }}
      />
      <StartButton
        onClick={() => {
          if (gameState === 'active') stopGame();
          else startGame();
        }}
        state={gameState}
      />
      <Timer
        startTime={startTime}
        onTimerEnd={() => {
          stopGame();
        }}
        gameState={gameState}
      />
      {gameState === 'loading' ? (
        <CircularIndeterminate />
      ) : (
        <div>
          {['active', 'stopped'].includes(gameState) ? (
            <div>
              <SquareGrid data={board} />
              <WordInput onEnter={onEnter} active={gameState === 'active'} />
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item>
                  <WordList
                    title={'Words found: ' + wordsFound.length}
                    words={wordsFound}
                  />
                </Grid>
                {gameState === 'stopped' ? (
                  <Grid item>
                    <WordList
                      title={
                        'Remaining Words: ' + remainingSolutionsList.length
                      }
                      words={remainingSolutionsList}
                    />
                  </Grid>
                ) : (
                  <div></div>
                )}
              </Grid>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
      <Notification
        notificationOpen={notificationOpen}
        handleClose={handleClose}
        severity={severity}
        message={message}
      />
    </div>
  );
}

export default App;
