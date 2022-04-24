import React from 'react';
import './GameGrid.css';

const GameGrid = () => {
  const initialCells = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => false)
  );

  return (
    <div className="grid-container">
      {initialCells.map((row, index) => (
        <div className="row" key={index}>
          {row.map((cell, index) => (
            <div className={cell ? 'living-cell' : 'dead-cell'} key={index} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
