import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Row from './Row.js';

function SquareGrid(props) {
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
