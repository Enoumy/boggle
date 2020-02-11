import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function calculatePlace(leaderboard) {
  if (leaderboard.length == 0) return;
  leaderboard[0]['place'] = 1;
  let current_place = 2;
  for (let i = 1; i < leaderboard.length; i++) {
    if (leaderboard[i]['high-score'] === leaderboard[i - 1]['high-score'])
      leaderboard[i]['place'] = leaderboard[i - 1]['place'];
    else leaderboard[i]['place'] = current_place;
    current_place++;
  }
}

function turnToLeaderBoardArray(leaderBoardDictionary) {
  let out = [];
  for (let key in leaderBoardDictionary) {
    out.push({ 'high-score': leaderBoardDictionary[key], user: key, place: 1 });
  }
  out.sort((a, b) => {
    return b['high-score'] - a['high-score'];
  });
  calculatePlace(out);
  return out;
}

function Leaderboard(props) {
  const classes = useStyles();

  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    setRankings(turnToLeaderBoardArray(props.data));
  }, [props.data]);

  return (
    <div marginTop={32}>
      <Typography variant="h6" align="center">
        Leaderboard
      </Typography>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableCell>Ranking</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableHead>
          <TableBody>
            {rankings.map(ranking => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {ranking['place']}
                </TableCell>
                <TableCell align="right">{ranking['user']}</TableCell>
                <TableCell align="right">{ranking['high-score']}</TableCell>
              </TableRow>
            ))}
            {rankings.length === 0 ? (
              <p align="right">
                No one has played this challenge yet! Be the first to set a high
                score!
              </p>
            ) : (
              <div></div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Leaderboard;
