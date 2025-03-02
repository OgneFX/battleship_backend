import React, { useState } from 'react';
import { Cell, placeShipManually } from '../../utils/manualPlacement';

const GRID_SIZE = 10;
const makeGrid = () => {
  return Array.from({length: GRID_SIZE}, () => 
    Array.from({length: GRID_SIZE}, () => ({hasShip: false, hit: false}))
  );
}

export default function gameBoard() {
  const [grid, setGrid] = useState<Cell[][]>(makeGrid());
  const [selectedShipSize, setSelectedShipSize] = useState<number | null>(4);
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal');

  const handleCellClick = (x: number, y: number) => {
    if (selectedShipSize) {
      const { grid: newGrid, ship } = placeShipManually(
        grid,
        x,
        y,
        selectedShipSize,
        direction
      );

      if (ship) {
        setGrid(newGrid);
        setSelectedShipSize(null); // Убираем выбранный корабль после размещения
      }
    }
  };


  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setSelectedShipSize(4)} className="p-2 bg-blue-500 text-white">
          Крейсер (4)
        </button>
        <button onClick={() => setSelectedShipSize(3)} className="p-2 bg-green-500 text-white">
          Эсминец (3)
        </button>
        <button onClick={() => setSelectedShipSize(2)} className="p-2 bg-yellow-500 text-white">
          Катер (2)
        </button>
        <button onClick={() => setSelectedShipSize(1)} className="p-2 bg-red-500 text-white">
          Шлюпка (1)
        </button>
        <button onClick={() => setDirection((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'))}
          className="p-2 bg-gray-700 text-white">
          Повернуть
        </button>
      </div>

      <div className="grid grid-cols-10 gap-1 p-4 border border-gray-400 w-fit">
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              onClick={() => handleCellClick(x, y)}
              className={`w-10 h-10 border border-gray-600 flex items-center justify-center ${
                cell.hasShip ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

