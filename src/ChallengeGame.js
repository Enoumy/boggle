import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import stringToBoard from './util/stringToBoard.js';
import Loading from './Loading.js';
import SquareGrid from './Grid.js';
import Alert from '@material-ui/lab/Alert';

function ChallengeGame({ user, loggedIn }) {
  const [gameState, setGameState] = useState('loading');
  const [board, setBoard] = useState();
  const [score, setScore] = useState(0);

  let { game } = useParams();

  useEffect(() => {
    firebase
      .firestore()
      .collection('challenges')
      .doc(game)
      .get()
      .then(doc => {
        if (doc.exists) {
          setBoard(stringToBoard(doc.data().board));
          setGameState('stopped');
        } else {
          console.log('Document ' + game + ' not found!');
          setGameState('notFound');
        }
      });
  }, []);

  return (
    <div>
      {!loggedIn ? (
        <Alert severity="info">Log-in to record your high-score!</Alert>
      ) : (
        <div></div>
      )}

      {gameState === 'loading' ? (
        <Loading />
      ) : (
        <div>
          {gameState === 'notFound' ? (
            <p>Game {game} not found!</p>
          ) : (
            <div>
              <SquareGrid data={board} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChallengeGame;
