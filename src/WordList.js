import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    textAlign: 'center',
    marginTop: 24,
    display: 'inline-block',
  },
  title: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
  },
}));

function createListItem(str, key) {
  return (
    <ListItem key={key}>
      <ListItemText primary={str} />
    </ListItem>
  );
}

function createListItems(lst) {
  let listItems = [];
  for (let i = 0; i < lst.length; i++) listItems.push(createListItem(lst[i]));
  return listItems;
}

function WordList(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
      style={{ marginTop: 12, marginBottom: 12 }}
    >
      <Paper>
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
        <List>{createListItems(props.words)}</List>
      </Paper>
    </Grid>
  );
}

export default WordList;
