import React, { useState } from 'react';
import DenseAppBar from './DenseAppBar.js';
import RandomGame from './RandomGame.js';
import MultiplayerGame from './MultiplayerGame.js';
import ChallengeGameMenu from './ChallengeGameMenu.js';
import ChallengeGame from './ChallengeGame.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navigation from './Navigation.js';
import firebase from 'firebase';

function App() {
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setUser(user);
      setLoggedIn(true);
    } else {
      setUser('');
      setLoggedIn(false);
    }
  });

  return (
    <div>
      <Router>
        <Navigation
          setUser={user => {
            console.log('Received!');
            console.log(user);
            setUser(user);
          }}
          setLoggedIn={status => {
            console.log('Received!');
            console.log(status);
            setLoggedIn(status);
          }}
          user={user}
          loggedIn={loggedIn}
        />
        <div style={{ height: 80 }}></div>
        <div style={{ marginLeft: 240, padding: 16 }}>
          <Switch>
            <Route exact path="/">
              <RandomGame user={user} loggedIn={loggedIn} />
            </Route>
            <Route path="/multiplayer">
              <MultiplayerGame user={user} loggedIn={loggedIn} />
            </Route>
            <Route exact path="/challenge">
              <ChallengeGameMenu user={user} loggedIn={loggedIn} />
            </Route>
            <Route path="/challenge/:game">
              <ChallengeGame user={user} loggedIn={loggedIn} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
