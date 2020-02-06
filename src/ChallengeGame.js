import React from 'react';
import UserResponse from './UserResponse.js';
import AvailableChallenges from './AvailableChallenges.js';

function ChallengeGame(props) {
  return (
    <div>
      <AvailableChallenges user={props.user} loggedIn={props.loggedIn} />
    </div>
  );
}

export default ChallengeGame;
