import React from 'react';
import AvailableChallenges from './AvailableChallenges.js';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

function ChallengeGameMenu(props) {
  return (
    <div>
      <Typography variant="h6" align="center">
        Available Challenges
      </Typography>
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
