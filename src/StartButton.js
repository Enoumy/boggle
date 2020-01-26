import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function StartButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color={props.state === 'active' ? 'secondary' : 'primary'}
        onClick={() => {
          props.onClick();
        }}
        disabled={props.state === 'loading'}
      >
        {props.state === 'active' ? 'Stop' : 'Start'}
      </Button>
    </div>
  );
}

export default StartButton;
