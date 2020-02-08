import React from 'react';
import Typography from '@material-ui/core/Typography';

function Score({ value, prefix }) {
  return (
    <Typography align="center">
      {prefix}: {value}
    </Typography>
  );
}

export default Score;
