import React from 'react';
import { useParams } from 'react-router-dom';

function ChallengeGame(props) {
  let { game } = useParams();
  return (
    <div>
      <p>This is a challenge game! Game: {game}</p>
    </div>
  );
}

export default ChallengeGame;
