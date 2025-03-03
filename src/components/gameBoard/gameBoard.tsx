import React, { useState } from 'react';
// import { Cell, placeShipManually } from '../../utils/manualPlacement';

const GRID_SIZE = 10;
const makeGrid = () => {
  return Array.from({length: GRID_SIZE}, () => 
    Array.from({length: GRID_SIZE}, () => ({hasShip: false, hit: false, isPlace: false }))
  );
}

export default function gameBoard() {

  const letter = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'].map((item) =>
    <div>
      {item}
    </div>
  )

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((item) =>
    <div>
      {item}
    </div>
  )

    const grid = makeGrid().map((row, rowIndex) => (
      <>
        
        <div key={rowIndex} className="flex items-center justify-center">
          {numbers[rowIndex]}
        </div>
    
        
        {row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-10 h-10 border border-gray-600 flex items-center justify-center 
              ${cell.hasShip ? "bg-blue-500" : "bg-gray-200"}`}
          ></div>
        ))}
      </>
    ));

    
    

   
    
  // const [grid, setGrid] = useState<Cell[][]>(makeGrid());
  // const [selectedShipSize, setSelectedShipSize] = useState<number | null>(4);
  // const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal');

  // const handleCellClick = (x: number, y: number) => {
  //   if (selectedShipSize) {
  //     const { grid: newGrid, ship } = placeShipManually(
  //       grid,
  //       x,
  //       y,
  //       selectedShipSize,
  //       direction
  //     );

  //     if (ship) {
  //       setGrid(newGrid);
  //       setSelectedShipSize(null); // Убираем выбранный корабль после размещения
  //     }
  //   }
  // };


  return (
    <div className="flex">
      
      <div className="grid grid-cols-11 gap-1 p-4 w-fit">
        <div></div>
        {letter}
        {grid}        
      </div>
    </div>

  )
};

