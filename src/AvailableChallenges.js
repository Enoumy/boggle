import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Loading from './Loading.js';
import firebase from 'firebase';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(date, boardSize, yourHighScore, globalHighScore) {
  return { date, boardSize, yourHighScore, globalHighScore };
}

const rows = [
  createData('2020-02-04', '4x4', 100, 200),
  createData('2020-02-03', '3x3', 8, 8),
  createData('2020-02-02', '3x3', 0, 32),
  createData('2020-02-01', '4x4', 0, 32),
];

function AvailableChallenges({ user, loggedIn }) {
  const [challenges, setChallenges] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('challenges')
      .onSnapshot(querySnapshot => {
        var firestoreData = [];
        querySnapshot.forEach(function(doc) {
          firestoreData.push({
            yourHighScore: doc.data()['user-scores'][user.uid],
            globalHighScore: doc.data()['high-score'],
            boardSize:
              '' +
              Math.sqrt(doc.data().board.length) +
              'x' +
              Math.sqrt(doc.data().board.length),
            date: doc.id,
          });
        });
        let newRows = [];
        for (let i = firestoreData.length - 1; i >= 0; i--)
          newRows.push(
            createData(
              firestoreData[i].date,
              firestoreData[i].boardSize,
              firestoreData[i].yourHighScore,
              firestoreData[i].globalHighScore
            )
          );
        setChallenges(newRows);
      });
    return () => unsubscribe();
  }, [loggedIn]);

  return (
    <div>
      {challenges.length === 0 ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Date
                </TableCell>
                <TableCell align="right">Board Size</TableCell>
                <TableCell align="right">Your High Score</TableCell>
                <TableCell align="right">Global High Score</TableCell>
                <TableCell align="right">Play</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {challenges.map(row => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Link to={'/challenge/' + row.date}>{row.date}</Link>
                  </TableCell>

                  <TableCell align="right">{row.boardSize}</TableCell>
                  <TableCell align="right">{row.yourHighScore}</TableCell>
                  <TableCell align="right">{row.globalHighScore}</TableCell>
                  <TableCell align="right">
                    <Link
                      to={'/challenge/' + row.date}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <PlayArrowIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default AvailableChallenges;
