import React from 'react';
import InputItem from './Input.js';
import DenseAppBar from './DenseAppBar.js';
import SquareGrid from './Grid.js';
import './App.css';

const test_grid = [['a', 'b', 'qu'], ['e', 'c', 'k'], ['qu', 'a', 'm']];

function App() {
  const buttonList = [];
  for (let i = 0; i < 5; i++) buttonList.push(<InputItem />);

  return (
    <div>
      <DenseAppBar />
      <SquareGrid data={'Qu'} n={5} />
    </div>
  );
}

export default App;
