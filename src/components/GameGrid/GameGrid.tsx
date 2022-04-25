import React, { useEffect, useState } from 'react';
import './GameGrid.css';

const initialCells: boolean[][] = Array.from({ length: 50 }, () =>
  Array.from({ length: 50 }, () => Math.random() > 0.5)
);

// glider
// initialCells[2][1] = true;
// initialCells[3][2] = true;
// initialCells[3][3] = true;
// initialCells[2][3] = true;
// initialCells[1][3] = true;

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
  const newCells = JSON.parse(JSON.stringify(cells));

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
    const timeout = setTimeout(() => {
      const newCells = generateNewCells(cells);
      setCells(newCells);
    }, 100);
    return () => clearTimeout(timeout);
  }, [cells]);

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
