import React from 'react';
import UserResponse from './UserResponse.js';

function ChallengeGame() {
  return (
    <div>
      <p>Challenge Game!</p>
      <UserResponse collectionName="users" />
    </div>
  );
}

export default ChallengeGame;
