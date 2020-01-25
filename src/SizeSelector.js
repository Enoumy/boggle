import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
    marginTop: 12,
    marginBottom: 42,
    margin: '0 auto',
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function SizeSelector(props) {
  const defaultValue = 4;
  const [gridSize, setGridSize] = useState(4);
  const classes = useStyles();

  const sendGridSize = size => {
    props.parentCallback(size);
  };

  return (
    <div className={classes.root}>
      <div className={classes.margin}>
        <Typography id="discrete-slider-small-steps" gutterBottom>
          Grid Size
        </Typography>
        <Slider
          defaultValue={defaultValue}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
          onChange={(event, value) => {
            if (value !== gridSize) {
              setGridSize(value);
              sendGridSize(value);
            }
          }}
        />
      </div>
    </div>
  );
}

export default SizeSelector;
