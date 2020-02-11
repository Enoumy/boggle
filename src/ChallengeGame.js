import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import stringToBoard from './util/stringToBoard.js';
import Loading from './Loading.js';
import SquareGrid from './Grid.js';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Timer from './Timer.js';
import Score from './Score.js';
import StartButton from './StartButton.js';
import WordInput from './WordInput.js';
import WordList from './WordList.js';
import scoring from './scoring.js';
import Notification from './Notification.js';
import Leaderboard from './Leaderboard.js';
import findAllSolutions from './boggle_solver.js';
import rankedUp from './util/rankedUp.js';

const dictionary = require('./full-wordlist.json')['words'];

let userHighscore = 0;
let challengeHighscore = 0;
let challengeLeaderBoardUid = {};
let challengeLeaderBoardDisplayName = {};

function logLeaderboardStatus() {
  console.log('userHighscore:');
  console.log(userHighscore);
  console.log('challengeHighscore:');
  console.log(challengeHighscore);
  console.log('challengeLeaderBoardUid:');
  console.log(challengeLeaderBoardUid);
  console.log('challengeLeaderBoardDisplayName:');
  console.log(challengeLeaderBoardDisplayName);
  console.log('\n');
}

function ChallengeGame({ user, loggedIn }) {
  const [gameState, setGameState] = useState('loading');
  const [board, setBoard] = useState();
  const [score, setScore] = useState(0);
  const [wordsFound, setWordsFound] = useState([]);
  const [[wordsFoundSet], setWordsFoundSet] = useState([new Set()]);
  const [[availableWordsSet], setAvailableWordsSet] = useState([new Set()]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [rankUpNotificationOpen, setRankUpNotificationOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [rankings, setRankings] = useState({});

  const handleNotificationOpen = msg => {
    setMessage(msg);
    setNotificationOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotificationOpen(false);
  };

  const rankUpHandleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setRankUpNotificationOpen(false);
  };

  let { game } = useParams();

  function startGame() {
    setScore(0);
    setWordsFound([]);
    setWordsFoundSet([new Set()]);
    setGameState('active');
  }

  function stopGame() {
    if (score > userHighscore) updateScores();
    setGameState('stopped');
  }

  function updateScores() {
    if (!loggedIn) {
      console.log('Cannot record new high score if not logged in!');
      return;
    }

    let onlyHighScores = [];
    for (let key in challengeLeaderBoardDisplayName) {
      onlyHighScores.push(challengeLeaderBoardDisplayName[key]);
    }
    onlyHighScores.sort();

    if (rankedUp(onlyHighScores, userHighscore, score)) {
      console.log('Yay! You ranked up!');
      setRankUpNotificationOpen(true);
    }

    // Updating leaderboard data.
    challengeLeaderBoardUid[user.uid] = score;
    challengeLeaderBoardDisplayName[user.displayName] = score;
    setRankings(challengeLeaderBoardDisplayName);
    userHighscore = score; // To avoid reloading db.
    if (score > challengeHighscore) challengeHighscore = score;

    // Write to firestore...
    firebase
      .firestore()
      .collection('challenges')
      .doc(game)
      .set(
        {
          'high-score': challengeHighscore,
          'user-scores': challengeLeaderBoardUid,
          'user-scores-name': challengeLeaderBoardDisplayName,
        },
        { merge: true }
      )
      .then(() => {
        console.log('Leaderboard updated!');
      })
      .catch(error => {
        console.error('Error updating leaderboard: ', error);
      });
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('challenges')
      .doc(game)
      .get()
      .then(doc => {
        if (doc.exists) {
          // Reading the Boggle game board.
          let loadedBoard = stringToBoard(doc.data().board);
          if (loadedBoard == null) loadedBoard = [[]];
          setBoard(loadedBoard);

          // Finding out the possible solutions to the loaded board.
          let solutions = findAllSolutions(loadedBoard, dictionary);
          console.log(solutions);
          setAvailableWordsSet([new Set(solutions)]);

          // Reading the current highscore of the challenge.
          challengeHighscore = doc.data()['high-score'];
          if (challengeHighscore == null) challengeHighscore = 0;

          // Reading the current leaderboard by uid.
          challengeLeaderBoardUid = doc.data()['user-scores'];
          if (challengeLeaderBoardUid == null) challengeLeaderBoardUid = {};

          // Reading the current user's high score.
          userHighscore = challengeLeaderBoardUid[user.uid];
          if (userHighscore == null) userHighscore = 0;

          // Reading the current leaderboard by displayName.
          challengeLeaderBoardDisplayName = doc.data()['user-scores-name'];
          if (challengeLeaderBoardDisplayName == null)
            challengeLeaderBoardDisplayName = {};
          setRankings(challengeLeaderBoardDisplayName);

          // Updating the game state to loaded.
          setGameState('loaded');
        } else {
          console.log('Document ' + game + ' not found!');
          setGameState('notFound');
        }
      });
  }, [loggedIn]);

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
              <Typography variant="h6" align="center">
                Challenge Game {game}
              </Typography>
              <StartButton
                onClick={() => {
                  if (gameState === 'active') stopGame();
                  else startGame();
                }}
                state={gameState}
              />
              <Timer
                gameState={gameState}
                startTime={60}
                onTimerEnd={stopGame}
              />
              <Score prefix={'Score'} value={score} />
              {gameState === 'active' ? (
                <SquareGrid data={board} />
              ) : (
                <div></div>
              )}
              <WordInput
                active={gameState === 'active'}
                onEnter={word => {
                  word = word.trim();
                  if (availableWordsSet.has(word)) {
                    if (!wordsFoundSet.has(word)) {
                      setWordsFound([word, ...wordsFound]);
                      wordsFoundSet.add(word);
                      setWordsFoundSet([wordsFoundSet]);
                      setScore(score + scoring(word));
                      setSeverity('success');
                      handleNotificationOpen("Nice! You found '" + word + "'");
                    } else {
                      setSeverity('warning');
                      handleNotificationOpen('Word already found: ' + word);
                    }
                  }
                }}
              />
              {gameState === 'active' ? (
                <WordList
                  title={'Words found: ' + wordsFound.length}
                  words={wordsFound}
                />
              ) : (
                <Leaderboard data={rankings} />
              )}
            </div>
          )}
        </div>
      )}
      <Notification
        notificationOpen={notificationOpen}
        handleClose={handleClose}
        severity={severity}
        message={message}
        horizontal="right"
      />
      <Notification
        notificationOpen={rankUpNotificationOpen}
        handleClose={rankUpHandleClose}
        severity="success"
        message="Yay! You ranked up!"
        horizontal="center"
      />
    </div>
  );
}

export default ChallengeGame;
