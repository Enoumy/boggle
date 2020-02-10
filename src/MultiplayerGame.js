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
import firebase from 'firebase';

function MultiplayerGame(props) {
  const [host, setHost] = useState('dummyHost');
  const [board, setBoard] = useState([[]]);
  const [wordsFoundAll, setWordsFoundAll] = useState({});
  const [gameState, setGameState] = useState('loading');
  const [userScore, setUserScore] = useState(0);

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
        setBoard(stringToBoard(data['board']));
        setGameState(data['game-state']);
        setHost(data['host']);
        setWordsFoundAll(data['words-found']);
      });
    return () => unsubscribe();
  }, []);

  // Updates the user's scores on login.
  useEffect(() => {}, [props.loggedIn]);

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
        <Typography variant="h7">Words found so far</Typography>
        <MultiplayerWordsFound data={wordsFoundAll} />
      </Grid>
    </div>
  );
}

export default MultiplayerGame;
