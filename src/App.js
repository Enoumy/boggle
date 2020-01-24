import React from 'react';
import InputItem from './Input.js';
import DenseAppBar from './DenseAppBar.js';
import './App.css';

function App() {
  const buttonList = [];
  for (let i = 0; i < 5; i++)
    buttonList.push(<InputItem />);

  return (
    <div>
      <DenseAppBar />
      <h1>Minecraft Hunger Games Fishing Trickshot Montage #7</h1>
      <p>Test</p>
      {buttonList}
    </div>
  );
}

export default App;
