import React, { useState } from 'react';
import TextInput from './TextInput.js';
import firebase from 'firebase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SizeSelector from './SizeSelector.js';
import Alert from '@material-ui/lab/Alert';
import boardToString from './util/boardToString.js';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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

function makeID(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

let selectedGame = '';

function MultiplayerGameMenu(props) {
  const [size, setSize] = useState(4);
  const [redirected, setRedirected] = useState(false);
  const [currentGame, setCurrentGame] = useState('');

  const classes = useStyles();

  function createAndUploadRandomGame(size) {
    let game_id = makeID(4);
    let newboard = boardToString(generateRandomBoggleBoard(size));
    let newhost = props.user.displayName;
    let wordsFound = {};
    let gameState = 'stopped';
    setCurrentGame(game_id);

    // Writing to firestore...
    firebase
      .firestore()
      .collection('multiplayer')
      .doc(game_id)
      .set({
        board: newboard,
        'game-state': gameState,
        host: newhost,
        'words-found': wordsFound,
      })
      .then(() => {
        console.log('Game created!');
      })
      .catch(error => {
        console.error('Error creating game: ', error);
      });
  }

  return (
    <div>
      {redirected ? (
        <Redirect to={'/multiplayer/' + currentGame} />
      ) : (
        <div></div>
      )}

      {!props.loggedIn ? (
        <Alert severity="info">Log-in to play multiplayer!</Alert>
      ) : (
        <Grid container className={classes.root} justify="center" spacing={2}>
          <Grid item>
            <Typography variant="h6" align="center">
              Create a game
            </Typography>
            <Paper className={classes.paper}>
              <SizeSelector parentCallback={setSize} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  align="center"
                  onClick={() => {
                    createAndUploadRandomGame(size);
                    setRedirected(true);
                  }}
                >
                  Create Game
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center">
              Join a game
            </Typography>
            <Paper className={classes.paper}>
              <Grid container>
                <TextField
                  id="outlined-basic"
                  label="Enter game code"
                  variant="outlined"
                  onChange={event => {
                    setCurrentGame(event.target.value);
                  }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    if (currentGame !== '') setRedirected(true);
                  }}
                >
                  Join
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default MultiplayerGameMenu;
