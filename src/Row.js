import React from 'react';
import Tile from './Tile.js';
import Grid from '@material-ui/core/Grid';

function Row(props) {
  const cells = [];
  for (let i = 0; i < props.n; i++) cells.push(<Tile data={props.data[i]} />);
  return <Grid container> {cells} </Grid>;
}

export default Row;
