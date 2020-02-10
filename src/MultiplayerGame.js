import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import copy from 'copy-to-clipboard';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function MultiplayerGame(props) {
  const [host, setHost] = useState('');
  const [board, setBoard] = useState([[]]);
  const [wordsFoundAll, setWordsFoundAll] = useState({});
  const [gameState, setGameState] = useState('not-found');

  let { game } = useParams();

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
        <Paper style={{ padding: 8 }}>
          <Typography variant="h7">Game code: {host}</Typography>
        </Paper>
      </Grid>
    </div>
  );
}

export default MultiplayerGame;
