import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

function InputItem() {
  const [text, setText] = useState('')
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => {
        const promptResponse = prompt("Input something");
        console.log(promptResponse);
        setText(promptResponse);
      }}>
        Hello World
      </Button>
      <p>
      {text}
      </p>
    </div>
  );
}

export default InputItem;
