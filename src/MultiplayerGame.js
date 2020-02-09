import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

function MultiplayerGame(props) {
  let { game } = useParams();

  return (
    <Typography variant="h6" align="center">
      Multiplayer Game {game}
    </Typography>
  );
}

export default MultiplayerGame;
