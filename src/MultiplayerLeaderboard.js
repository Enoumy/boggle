import React, { useState, useEffect } from 'react';
import generateScoreMappings from './util/generateScoreMappings.js';
import Leaderboard from './Leaderboard.js';

function MultiplayerLeaderboard(props) {
  const [scores, setScores] = useState({});

  useEffect(() => {
    setScores(generateScoreMappings(props.data));
  }, [props.data]);

  return <Leaderboard data={scores} />;
}

export default MultiplayerLeaderboard;
