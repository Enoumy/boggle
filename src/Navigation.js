import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DenseAppBar from './DenseAppBar.js';
import CasinoIcon from '@material-ui/icons/Casino';
import SecurityIcon from '@material-ui/icons/Security';
import PeopleIcon from '@material-ui/icons/People';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  loginButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Navigation(props) {
  const classes = useStyles();

  function logIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        props.setUser(result.user);
        props.setLoggedIn(true);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
          >
            <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
              <FontDownloadIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Boggle Game
          </Typography>
          {!props.loggedIn ? (
            <Button
              color="inherit"
              onClick={() => {
                logIn();
              }}
            >
              Login
            </Button>
          ) : (
            <Typography>
              {props.user['displayName']}{' '}
              <Button
                onClick={() => {
                  console.log('Logging out...');
                  firebase
                    .auth()
                    .signOut()
                    .then(function() {
                      props.setUser('');
                      props.setLoggedIn(false);
                      console.log('Signed out');
                    })
                    .catch(function(error) {
                      console.log(error);
                    });
                }}
              >
                Logout
              </Button>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}>
          <div style={{ height: 55 }}></div>
          <List>
            {[
              ['Random Game', <CasinoIcon />, '/'],
              ['Challenge', <SecurityIcon />, '/challenge'],
              ['Multiplayer Game', <PeopleIcon />, '/multiplayer'],
            ].map((content, index) => (
              <Link
                to={content[2]}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItem button key={content[0]}>
                  <ListItemIcon>{content[1]}</ListItemIcon>
                  <ListItemText primary={content[0]} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}
