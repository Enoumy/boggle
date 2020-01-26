import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    margin: '0 auto',
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item>
        <div className={classes.root}>
          <CircularProgress />
        </div>
      </Grid>
    </Grid>
  );
}
