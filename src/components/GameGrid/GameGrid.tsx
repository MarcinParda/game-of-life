import React, { useEffect, useState } from 'react';
import './GameGrid.css';

const initialGrid: boolean[][] = Array.from({ length: 10 }, () =>
  Array.from({ length: 10 }, () => false)
);

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
  const r = Math.floor(Math.random() * 156);
  const g = Math.floor(Math.random() * 156);
  const b = 0;
  return `rgb(${r}, ${g}, ${b})`;
};

const GameGrid = () => {
  const [cells, setCells] = useState<boolean[][]>(initialGrid);
  const [isStarted, setIsStarted] = useState(false);
  const [isGridDisplayed, setIsGridDisplayed] = useState(true);
  const [gridWidth, setGridWidth] = useState(10);
  const [gridHeight, setGridHeight] = useState(10);

  useEffect(() => {
    if (!isStarted) {
      return;
    }
    const interval = setInterval(() => {
      setCells((prevCells) => generateNewCells(prevCells));
    }, 100);
    return () => clearInterval(interval);
  }, [isStarted]);

  const handleCellClick = (x: number, y: number) => {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      setCells((prevCells) => {
        const newCells = JSON.parse(JSON.stringify(prevCells));
        newCells[x][y] = !newCells[x][y];
        return newCells;
      });
    };
  };

  const handleChangeGridSize = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newGrid: boolean[][] = Array.from({ length: gridWidth }, () =>
      Array.from({ length: gridHeight }, () => false)
    );
    setCells(newGrid);
  };

  const clearGrid = () => {
    setCells(initialGrid);
  };

  return (
    <div className="grid-container">
      <div className="row">
        <button
          className={isStarted ? 'btn-danger' : 'btn-primary'}
          onClick={() => setIsStarted((prev) => !prev)}
        >
          {isStarted ? 'Stop' : 'Start'}
        </button>
      </div>
      <div className="row">
        <button
          className={isGridDisplayed ? 'btn-danger' : 'btn-primary'}
          onClick={() => setIsGridDisplayed((prev) => !prev)}
        >
          {isGridDisplayed ? 'Hide grid' : 'Show grid'}
        </button>
      </div>
      <div className="row">
        <button className="btn-danger" onClick={clearGrid}>
          Clear grid
        </button>
      </div>
      <form className="row" onSubmit={(e) => handleChangeGridSize(e)}>
        <div className="column">
          <label className="label" htmlFor="width">
            Grid width
          </label>
          <input
            className="input"
            value={gridWidth}
            onChange={(event) => setGridWidth(Number(event.target.value))}
            name="width"
            type="number"
          />
        </div>
        <div className="column">
          <label className="label" htmlFor="width">
            Grid height
          </label>
          <input
            className="input"
            value={gridHeight}
            onChange={(event) => setGridHeight(Number(event.target.value))}
            name="width"
            type="number"
          />
        </div>
        <button className="btn-primary" type="submit">
          Change grid size
        </button>
      </form>
      {cells.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div
              className={cell ? 'living-cell' : 'dead-cell'}
              style={{
                backgroundColor: cell ? randomColor() : '#fff',
                opacity: isGridDisplayed || cell ? 1 : 0,
              }}
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
