import React from 'react';
import GameGrid from '../GameGrid/GameGrid';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <h1 className="mb-2">Game of life</h1>
      <h4 className="mb-2">
        Draw cell structure by clicking on cells in grid and hit "Start" to see
        how they reproduce.
      </h4>
      <h4 className="mb-2">
        <a
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          target="_blank"
          rel="noreferrer"
        >
          How algorithm works?
        </a>
      </h4>
      <GameGrid />
    </div>
  );
};

export default App;
