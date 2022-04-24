import React from 'react';
import GameGrid from '../GameGrid/GameGrid';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <h1>Game of life</h1>
      <GameGrid />
    </div>
  );
};

export default App;
