import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    marginTop: 16,
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function WordInput(props) {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const sendWord = word => {
    props.onEnter(word);
  };

  return (
    <div className={classes.root}>
      <TextField
        label="Enter words here"
        onChange={event => {
          let word = event.target.value;
          if (word.charAt(word.length - 1) === '\n') {
            sendWord(event.target.value);
            setValue('');
          } else {
            setValue(word);
          }
        }}
        value={value}
        multiline
      />
    </div>
  );
}

export default WordInput;
