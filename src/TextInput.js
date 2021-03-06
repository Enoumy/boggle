import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';

function TextInput({ promptText, user, field }) {
  const [text, setText] = useState('');

  function getUserInput() {
    const promptResponse = prompt(promptText);
    console.log(promptResponse);
    setText(promptResponse);
    // https://firebase.google.com/docs/firestore/manage-data/add-data
    if (user && user.uid) {
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .set({ [field]: promptResponse }, { merge: true })
        .then(() => {
          console.log('Document written!');
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    }
  }

  return (
    <p>
      <Button
        color="primary"
        variant="contained"
        onClick={() => getUserInput()}
      >
        {promptText}
      </Button>
      {text}
    </p>
  );
}
export default TextInput;
