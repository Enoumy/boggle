import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Row from './Row.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 19,
  },
  container: {
    padding: theme.spacing(1),
    margin: 10,
  },
}));

function SquareGrid(props) {
  const classes = useStyles();

  const rows = [];
  for (let i = 0; i < props.data.length; i++)
    rows.push(<Row n={props.data[i].length} data={props.data[i]} />);

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
      style={{ marginTop: 12, marginBottom: 12 }}
    >
      <Paper style={{ width: 'fit-content' }} justify="center" elevation={2}>
        {rows}
      </Paper>
    </Grid>
  );
}

export default SquareGrid;
