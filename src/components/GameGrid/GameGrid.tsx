import React, { useEffect, useState } from 'react';
import './GameGrid.css';

const initialCells: boolean[][] = Array.from({ length: 50 }, () =>
  Array.from({ length: 50 }, () => false)
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

const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const GameGrid = () => {
  const [cells, setCells] = useState<boolean[][]>(initialCells);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!isStarted) {
      return;
    }
    const interval = setInterval(() => {
      setCells((prevCells) => generateNewCells(prevCells));
    }, 100);
    return () => clearInterval(interval);
  }, [isStarted]);

  const handleGameState = (state: boolean) => {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsStarted(state);
    };
  };

  const handleCellClick = (x: number, y: number) => {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      setCells((prevCells) => {
        const newCells = JSON.parse(JSON.stringify(prevCells));
        newCells[x][y] = !newCells[x][y];
        return newCells;
      });
    };
  };

  return (
    <div className="grid-container">
      <div className="row">
        <button className="btn-primary" onClick={handleGameState(true)}>
          Start
        </button>
        <button className="btn-danger" onClick={handleGameState(false)}>
          Stop
        </button>
      </div>
      {cells.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div
              className={cell ? 'living-cell' : 'dead-cell'}
              style={{ backgroundColor: randomColor() }}
              key={cellIndex}
              onClick={handleCellClick(rowIndex, cellIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
