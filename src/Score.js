import React from 'react';
import Typography from '@material-ui/core/Typography';

function Score({ value }) {
  return <Typography align="center">Score: {value}</Typography>;
}

export default Score;
