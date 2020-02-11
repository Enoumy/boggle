import React, { useState } from 'react';
import RandomGame from './RandomGame.js';
import MultiplayerGameMenu from './MultiplayerGameMenu.js';
import MultiplayerGame from './MultiplayerGame.js';
import ChallengeGameMenu from './ChallengeGameMenu.js';
import ChallengeGame from './ChallengeGame.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
            setUser(user);
          }}
          setLoggedIn={status => {
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
            <Route exact path="/multiplayer">
              <MultiplayerGameMenu user={user} loggedIn={loggedIn} />
            </Route>
            <Route path="/multiplayer/:game">
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
