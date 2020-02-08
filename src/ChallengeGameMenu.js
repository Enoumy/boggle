import React from 'react';
import AvailableChallenges from './AvailableChallenges.js';
import Alert from '@material-ui/lab/Alert';

function ChallengeGameMenu(props) {
  return (
    <div>
      {props.loggedIn ? (
        <div></div>
      ) : (
        <div style={{ margingBottom: 8 }}>
          <Alert severity="info">Log-in to record your high-score!</Alert>
        </div>
      )}
      <AvailableChallenges user={props.user} loggedIn={props.loggedIn} />
    </div>
  );
}

export default ChallengeGameMenu;
