import React, { useEffect, useState } from 'react';
import './GameGrid.css';

const initialCells: boolean[][] = Array.from({ length: 10 }, () =>
  Array.from({ length: 10 }, () => false)
);

initialCells[1][1] = true;
initialCells[1][2] = true;
initialCells[1][3] = true;

initialCells[5][1] = true;
initialCells[5][2] = true;
initialCells[6][1] = true;
initialCells[6][2] = true;

const getLivingNeighboursCount = (
  cells: boolean[][],
  i: number,
  j: number
): number => {
  let count = 0;

  for (let x = i - 1; x <= i + 1; x++) {
    for (let y = j - 1; y <= j + 1; y++) {
      if (x === i && y === j) {
        continue;
      }
      if (x < 0 || x >= cells.length || y < 0 || y >= cells[0].length) {
        continue;
      }
      if (cells[x][y]) {
        count++;
      }
    }
  }

  return count;
};

const shouldBeAliveInNextGeneration = (
  cell: boolean,
  neighborsCount: number
): boolean => {
  if (cell) {
    return neighborsCount === 2 || neighborsCount === 3;
  } else {
    return neighborsCount === 3;
  }
};

const generateNewCells = (cells: boolean[][]): boolean[][] => {
  console.log('generateNewCells');
  const newCells = [...cells];
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      const livingNeighboursCount = getLivingNeighboursCount(cells, i, j);
      newCells[i][j] = shouldBeAliveInNextGeneration(
        cells[i][j],
        livingNeighboursCount
      );
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
    }, 1000);
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
