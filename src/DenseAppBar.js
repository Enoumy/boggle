import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FontDownloadIcon from '@material-ui/icons/FontDownload';

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

function DenseAppBar() {
  const classes = styles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <ToolBar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit">
            <FontDownloadIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Boggle Game
          </Typography>
        </ToolBar>
      </AppBar>
    </div>
  );
}

export default DenseAppBar;
