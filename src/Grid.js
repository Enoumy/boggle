import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 19
  },
  container: {
    padding: theme.spacing(1),
    margin: 10
  },
  tile: {
    margin: 5,
    width: 30,
    height: 30,
    textAlign: 'center',
    verticalAlign: 'middle',
    color:theme.palette.text.secondary,
  }
}));

function SquareGrid(props) {
  const classes = useStyles();

  function tile(props) {
    return (
      <Paper className={classes.tile} elevation={1}>
        <p style={{marginTop: 6}}>{props.data}</p>
      </Paper>
    );
  }

  function FormRow(props) {
    const cells = [];
    for (let i = 0; i < props.n; i++)
      cells.push(tile(props));
    return (<Grid container> {cells} </Grid>);
  }

  const rows = [];
  for (let i = 0; i < props.n; i++)
    rows.push(FormRow(props));

  return (
    <Grid container direction="column" justify="space-between" alignItems="center">
      <Paper style={{width: 'fit-content'}} justify="center" elevation={2}>
        {rows}
      </Paper>
    </Grid>
  );
}

export default SquareGrid;
