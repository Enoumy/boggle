import React, { useState } from 'react';
import DenseAppBar from './DenseAppBar.js';
import RandomGame from './RandomGame.js';
import MultiplayerGame from './MultiplayerGame.js';
import ChallengeGame from './ChallengeGame.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  console.log(React.version);
  return (
    <div>
      <DenseAppBar />
      <div style={{ height: 40 }}></div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Random</Link>
              </li>
              <li>
                <Link to="/multiplayer">Multiplayer</Link>
              </li>
              <li>
                <Link to="/challenge">Challenges</Link>
              </li>
            </ul>
          </nav>

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
