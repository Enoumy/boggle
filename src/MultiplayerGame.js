import React from 'react';
import TextInput from './TextInput.js';
import firebase from 'firebase';

function MultiplayerGame(props) {
  return (
    <div>
      <p>Multiplayer Game!</p>
      {props.loggedIn ? (
        <div>
          <TextInput promptText="Name?" field="name" user={props.user} />
          <TextInput
            promptText="Hometown?"
            field="hometown"
            user={props.user}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default MultiplayerGame;
