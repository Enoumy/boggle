import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import copy from 'copy-to-clipboard';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import stringToBoard from './util/stringToBoard.js';
import CircularIndeterminate from './Loading.js';
import SquareGrid from './Grid.js';
import StartButton from './StartButton.js';
import MultiplayerWordsFound from './MultiplayerWordsFound.js';
import MultiplayerLeaderboard from './MultiplayerLeaderboard.js';
import WordInput from './WordInput.js';
import aggregateFoundSolutions from './util/aggregateFoundSolutions.js';
import findAllSolutions from './boggle_solver.js';
import Notification from './Notification.js';
import firebase from 'firebase';

const dictionary = require('./full-wordlist.json')['words'];

let solutions = new Set();
let blacklistedSolutions = new Set();

function MultiplayerGame(props) {
  const [host, setHost] = useState('dummyHost');
  const [board, setBoard] = useState([[]]);
  const [wordsFoundAll, setWordsFoundAll] = useState({});
  const [gameState, setGameState] = useState('loading');
  const [userScore, setUserScore] = useState(0);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');

  let { game } = useParams();

  // Reads the multiplayer board's data in realtime + updates scores.
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('multiplayer')
      .doc(game)
      .onSnapshot(doc => {
        if (!doc.exists) {
          console.log('Game record ' + game + ' not found!');
          setGameState('notFound');
          return;
        }
        console.log(doc.data());
        let data = doc.data();
        let newBoard = stringToBoard(data['board']);
        setBoard(newBoard);
        setGameState(data['game-state']);
        setHost(data['host']);
        setWordsFoundAll(data['words-found']);
        blacklistedSolutions = aggregateFoundSolutions(data['words-found']);
        solutions = new Set(findAllSolutions(newBoard, dictionary));

        console.log('Blacklisted solutions:');
        console.log(blacklistedSolutions);

        console.log('Solutions:');
        console.log(solutions);
      });
    return () => unsubscribe();
  }, []);

  function updateGameState(newState) {
    firebase
      .firestore()
      .collection('multiplayer')
      .doc(game)
      .set(
        {
          'game-state': newState,
        },
        { merge: true }
      )
      .then(() => {
        console.log('Game state updated!');
      })
      .catch(error => {
        console.error('Error updating game state: ', error);
      });
  }

  function startGame() {
    updateGameState('active');
  }

  function stopGame() {
    updateGameState('stopped');
  }

  const handleNotificationOpen = msg => {
    setMessage(msg);
    setNotificationOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotificationOpen(false);
  };

  function uploadWordFound(word) {
    var gameDocRef = firebase
      .firestore()
      .collection('multiplayer')
      .doc(game);

    firebase
      .firestore()
      .runTransaction(function(transaction) {
        return transaction.get(gameDocRef).then(function(gameDoc) {
          if (!gameDoc.exists) {
            throw 'Document does not exist!';
          }

          var newWordsFounds = gameDoc.data()['words-found'];
          if (newWordsFounds[props.user.displayName] == null)
            newWordsFounds[props.user.displayName] = [];
          newWordsFounds[props.user.displayName].push(word);
          transaction.update(gameDocRef, { 'words-found': newWordsFounds });
          return newWordsFounds;
        });
      })
      .then(function(newDoc) {
        console.log('Words found updated!');
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  if (gameState === 'loading') return <CircularIndeterminate />;

  if (gameState === 'notFound')
    return <Alert severity="error">Game {game} not found!</Alert>;

  if (!props.loggedIn)
    return <Alert severity="info">Log-in to play multiplayer!</Alert>;

  return (
    <div>
      <Typography variant="h6" align="center">
        Multiplayer Game {game}
      </Typography>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Paper style={{ padding: 8 }}>
          <Typography variant="h7">Game code: {game}</Typography>
          <Button
            variant="contained"
            style={{ marginLeft: 8 }}
            onClick={() => {
              copy(game);
            }}
          >
            Copy
          </Button>
        </Paper>
        <Paper style={{ padding: 8, marginTop: 8 }}>
          <Typography variant="h7">Host: {host}</Typography>
        </Paper>

        {props.user.displayName !== host ? (
          <Paper style={{ padding: 8, marginTop: 8 }}>
            <Typography variant="h7">
              Please wait for host to{' '}
              {gameState === 'active' ? 'stop' : 'start'} game
            </Typography>
          </Paper>
        ) : (
          <div></div>
        )}

        {props.user.displayName === host ? (
          <StartButton
            state={gameState}
            onClick={() => {
              if (gameState === 'active') stopGame();
              else startGame();
            }}
          />
        ) : (
          <div></div>
        )}
        <SquareGrid data={board} />
        <WordInput
          active={gameState === 'active'}
          onEnter={word => {
            word = word.trim().toLowerCase();
            console.log(word);
            if (solutions.has(word))
              if (blacklistedSolutions.has(word)) {
                setSeverity('warning');
                handleNotificationOpen('Word already found: ' + word);
              } else {
                uploadWordFound(word);
                setSeverity('success');
                handleNotificationOpen("Nice! You found '" + word + "'");
              }
          }}
        />
        <MultiplayerLeaderboard data={wordsFoundAll} />
        <div style={{ height: 16 }}></div>
        <Typography variant="h6">Words found so far</Typography>
        <MultiplayerWordsFound data={wordsFoundAll} />
        <Notification
          notificationOpen={notificationOpen}
          handleClose={handleClose}
          severity={severity}
          message={message}
          horizontal="right"
        />
      </Grid>
    </div>
  );
}

export default MultiplayerGame;
