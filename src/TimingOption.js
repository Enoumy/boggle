import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

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

function secondsToTimeString(seconds) {
  let out = '';
  if (seconds >= 60) out = '' + Math.floor(seconds / 60) + ' minutes ' + out;

  out = out + (seconds % 60) + ' seconds';
  return out;
}

function TimingOption(props) {
  const classes = useStyles();
  const [time, setTime] = useState(60);

  const sendTime = newTime => {
    console.log('Sending', newTime);
    props.parentCallback(newTime);
  };

  return (
    <div className={classes.root}>
      <div className={classes.margin}>
        <Typography id="discrete-slider-small-steps" gutterBottom>
          Time: {secondsToTimeString(time)}
        </Typography>
        <Slider
          defaultValue={60}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          min={10}
          max={300}
          onChangeCommitted={(event, value) => {
            if (value !== time) {
              setTime(value);
              sendTime(value);
            }
          }}
        />
      </div>
    </div>
  );
}

export default TimingOption;
