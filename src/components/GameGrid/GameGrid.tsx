import React, { useEffect, useState } from 'react';
import './GameGrid.css';

const initialCells: boolean[][] = Array.from({ length: 10 }, () =>
  Array.from({ length: 10 }, () => false)
);

initialCells[1][1] = true;
initialCells[1][2] = true;
initialCells[1][3] = true;

const getLivingNeighboursCount = (
  cells: boolean[][],
  i: number,
  j: number
): number => {
  let count = 0;
  let x = i - 1;
  let y = j - 1;

  if (x < 0) x = 0;

  for (x; x < i + 2; x++) {
    y = j - 1;
    if (y < 0) y = 0;
    if (x >= cells.length) break;
    for (y; y < j + 2; y++) {
      if (y >= cells[0].length) break;
      if (cells[x][y] && (x !== i || y !== j)) count++;
    }
  }

  return count;
};

const generateNewCells = (cells: boolean[][]): boolean[][] => {
  const newCells = [...cells];
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      const livingNeighboursCount = getLivingNeighboursCount(cells, i, j);
    }
  }
  return newCells;
};

const GameGrid = () => {
  const [cells, setCells] = useState<boolean[][]>(initialCells);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCells = generateNewCells(cells);
      setCells(newCells);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid-container">
      {cells.map((row, index) => (
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
