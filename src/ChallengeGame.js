import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import stringToBoard from './util/stringToBoard.js';
import Loading from './Loading.js';
import SquareGrid from './Grid.js';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Timer from './Timer.js';
import Score from './Score.js';
import StartButton from './StartButton.js';
import WordInput from './WordInput.js';
import WordList from './WordList.js';
import scoring from './scoring.js';
import findAllSolutions from './boggle_solver.js';

const dictionary = require('./full-wordlist.json')['words'];

function ChallengeGame({ user, loggedIn }) {
  const [gameState, setGameState] = useState('loading');
  const [board, setBoard] = useState();
  const [score, setScore] = useState(0);
  const [wordsFound, setWordsFound] = useState([]);
  const [[wordsFoundSet], setWordsFoundSet] = useState([new Set()]);
  const [[availableWordsSet], setAvailableWordsSet] = useState([new Set()]);

  let { game } = useParams();

  // TODO: Implement Start Game
  function startGame() {
    setScore(0);
    setWordsFound([]);
    setWordsFoundSet([new Set()]);
    setGameState('active');
  }

  // TODO: Implement Stop Game
  function stopGame() {
    setGameState('stopped');
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('challenges')
      .doc(game)
      .get()
      .then(doc => {
        if (doc.exists) {
          let loadedBoard = stringToBoard(doc.data().board);
          setBoard(loadedBoard);
          let solutions = findAllSolutions(loadedBoard, dictionary);
          console.log(solutions);
          setAvailableWordsSet([new Set(solutions)]);
          setGameState('loaded');
        } else {
          console.log('Document ' + game + ' not found!');
          setGameState('notFound');
        }
      });
  }, []);

  return (
    <div>
      {!loggedIn ? (
        <Alert severity="info">Log-in to record your high-score!</Alert>
      ) : (
        <div></div>
      )}

      {gameState === 'loading' ? (
        <Loading />
      ) : (
        <div>
          {gameState === 'notFound' ? (
            <p>Game {game} not found!</p>
          ) : (
            <div>
              <Typography variant="h6" align="center">
                Challenge Game {game}
              </Typography>
              <StartButton
                onClick={() => {
                  if (gameState === 'active') stopGame();
                  else startGame();
                }}
                state={gameState}
              />
              <Timer gameState={gameState} startTime={60} />
              <Score value={score} />
              {gameState === 'active' ? (
                <SquareGrid data={board} />
              ) : (
                <div></div>
              )}
              <WordInput
                active={gameState === 'active'}
                onEnter={word => {
                  word = word.trim();
                  if (availableWordsSet.has(word)) {
                    if (!wordsFoundSet.has(word)) {
                      setWordsFound([word, ...wordsFound]);
                      wordsFoundSet.add(word);
                      setWordsFoundSet([wordsFoundSet]);
                      setScore(score + scoring(word));
                    }
                  }
                }}
              />
              {gameState === 'active' ? (
                <WordList
                  title={'Words found: ' + wordsFound.length}
                  words={wordsFound}
                />
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChallengeGame;
