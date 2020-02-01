import React, { useState } from 'react';
import DenseAppBar from './DenseAppBar.js';
import RandomGame from './RandomGame.js';
import MultiplayerGame from './MultiplayerGame.js';
import ChallengeGame from './ChallengeGame.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navigation from './Navigation.js';

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <div style={{ height: 80 }}></div>
        <div style={{ marginLeft: 240, paddingLeft: 8 }}>
          <Switch>
            <Route exact path="/">
              <RandomGame />
            </Route>
            <Route path="/multiplayer">
              <MultiplayerGame />
            </Route>
            <Route path="/challenge">
              <ChallengeGame />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
