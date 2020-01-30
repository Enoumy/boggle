import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  tile: {
    margin: 5,
    width: 30,
    height: 30,
    textAlign: 'center',
    verticalAlign: 'middle',
    color: theme.palette.text.secondary,
    userSelect: 'none',
  },
}));

function Tile(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.tile} elevation={1}>
      <p style={{ marginTop: 6 }}>{props.data}</p>
    </Paper>
  );
}

export default Tile;
