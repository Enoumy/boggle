import React, { useState } from 'react';
import TextInput from './TextInput.js';
import firebase from 'firebase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SizeSelector from './SizeSelector.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

function MultiplayerGameMenu(props) {
  const [size, setSize] = useState(4);

  const classes = useStyles();

  return (
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
            <Button variant="contained" color="primary" align="center">
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
            />
            <Button variant="outlined" color="primary">
              Join
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MultiplayerGameMenu;
