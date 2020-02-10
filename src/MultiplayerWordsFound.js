import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import scoring from './scoring.js';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function wordsFoundDictionaryToMultiplayerWordsFound(dictionary) {
  let out = [];
  for (let key in dictionary) {
    for (let i = 0; i < dictionary[key].length; i++)
      out.push({
        user: key,
        word: dictionary[key][i],
        points: scoring(dictionary[key][i]),
      });
  }
  out.sort((a, b) => b['word'].length - a['word'].length);
  return out;
}

function MultiplayerWordsFound(props) {
  const [wordData, setWordData] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    let newData = wordsFoundDictionaryToMultiplayerWordsFound(props.data);
    setWordData(newData);
    console.log(newData);
  }, [props.data]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Word</TableCell>
            <TableCell align="right">Finder</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wordData.map(row => (
            <TableRow key={row.user}>
              <TableCell component="th" scope="row">
                {row.user}
              </TableCell>
              <TableCell align="right">{row.word}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MultiplayerWordsFound;
