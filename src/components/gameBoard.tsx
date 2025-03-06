import React, { useState } from 'react';


type gameBoardProps = {
  size: number;
  direction: string;
  isSelected: boolean;
  changeSelectedShip: (selected: boolean) => void
}

const GRID_SIZE = 10;
const makeGrid = () => {
  return Array.from({length: GRID_SIZE}, () => 
    Array.from({length: GRID_SIZE}, () => ({hasShip: false, hit: false, isHelpView: false, isPlace: true }))
  );
}

export default function gameBoard({size, direction, isSelected, changeSelectedShip}:gameBoardProps) {
    
    const[grid, setGrid] = useState(makeGrid());

    const letter = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'].map((item) =>
      <div>
        {item}
      </div>
    )

    const checkPlaceForShip = (x:number, y:number) => {
      
      if(!isSelected) return;
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row) => row.map((cell) => ({ ...cell, isHelpView: false }))); 
          


          if (direction === "horizontal" && y + size <= 10) {
            for (let i = 0; i < size; i++) {
              newGrid[x][y + i].isHelpView = true;
            }
          } else if (direction === "vertical" && x + size <= 10) {
            for (let i = 0; i < size; i++) {
              newGrid[x + i][y].isHelpView = true;
            }
          }
      
          return newGrid;
        });
      
      
    };

    const uncheckPlaceForShip = () => {
      setGrid((prevGrid) => 
        prevGrid.map(row => row.map(cell => ({ ...cell, isHelpView: false }))))
    }

    const placeShip = (x:number, y:number) => {
      if (!isSelected) return;

      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => row.map((cell) => ({ ...cell })));
    
        const shipCells: { x: number; y: number }[] = [];
    
       
        for (let i = 0; i < size; i++) {
          const newX = direction === "vertical" ? x + i : x;
          const newY = direction === "horizontal" ? y + i : y;
    
          if (newX >= 10 || newY >= 10 || !newGrid[newX][newY].isHelpView || newGrid[newX][newY].isPlace === false) {
            return prevGrid; 
          }
    
          shipCells.push({ x: newX, y: newY });
        }
    
        
        shipCells.forEach(({ x, y }) => {
          newGrid[x][y].hasShip = true;
          newGrid[x][y].isHelpView = false; 
        });

        const markAdjacentCells = (x: number, y: number) => {
          const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [ 0, -1],          [ 0, 1],
            [ 1, -1], [ 1, 0], [ 1, 1],
          ];
    
          directions.forEach(([dx, dy]) => {
            const newX = x + dx;
            const newY = y + dy;
    
            if (newX >= 0 && newX < 10 && newY >= 0 && newY < 10) {
              newGrid[newX][newY].isPlace = false;
            }
          });
        };

        shipCells.forEach(({ x, y }) => markAdjacentCells(x, y));
    
        
        changeSelectedShip(false);
    
        return newGrid;

    });
  }

      



      return (
        <div className="flex">
          
          <div className="grid grid-cols-11 gap-1 p-4 w-fit">
            <div></div>
            {letter}
            {grid.map((row, rowIndex) => (
          <>
            <div key={`num-${rowIndex}`} className="flex items-center justify-center">
              {rowIndex + 1}
            </div>

            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onMouseEnter={() => checkPlaceForShip(rowIndex, colIndex)}
                onMouseLeave={() => uncheckPlaceForShip()}
                onClick={() => placeShip(rowIndex, colIndex)}
                className={`w-10 h-10 border border-gray-600 flex items-center justify-center
                  ${isSelected ? (cell.isHelpView ? "bg-blue-500" : cell.isPlace ? "bg-green-200" : cell.hasShip ? "bg-blue-500" : "bg-red-200") : 
                                  cell.hasShip ? "bg-blue-500" : "bg-gray-200"}`
                  }
              ></div>
            ))}
          </>
        ))}     
          </div>
        </div>
    
      )
      
  }

   


  


