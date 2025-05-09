import { Fragment } from 'react';
import { useShipStore } from '../../store/ShipStore'; 
import { useGameStore } from '../../store/GameStore';

type gameBoardProps = {
  changeSelectedShip: (selected: number) => void
}

export function GameBoard({changeSelectedShip}: gameBoardProps) {
  const { isPicketShip, pickedShip, setIsPicketShip } = useShipStore(state => state)
  const { setGridSM, grid } = useGameStore(state => state)
  const letter = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'].map(
    (item) =>
     <div key={`${item}-letterSymbol`}>
      {item}
    </div>
  );

  const checkPlaceForShip = (x: number, y: number) => {
    if (!isPicketShip) return;
     
      const newGrid = grid.map((row) =>
        row.map((cell) => ({ ...cell, isHelpView: false }))
      );

      if (pickedShip?.direction === 'horizontal' && y + pickedShip?.size <= 10) {
        for (let i = 0; i < pickedShip.size; i++) {
          newGrid[x][y + i].isHelpView = true;
        }
      } else if (pickedShip?.direction === 'vertical' && x + pickedShip?.size <= 10) {
        for (let i = 0; i < pickedShip.size; i++) {
          newGrid[x + i][y].isHelpView = true;
        }
      }
      setGridSM(newGrid)
  };

  const uncheckPlaceForShip = () => {
    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell, isHelpView: false })));
    setGridSM(newGrid)
  };

  const placeShip = (x: number, y: number) => {
    if (!isPicketShip) return;

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
      const shipCells: { x: number; y: number }[] = [];
      if(pickedShip) {
      for (let i = 0; i < pickedShip.size; i++) {
        const newX = pickedShip.direction === 'vertical' ? x + i : x;
        const newY = pickedShip.direction === 'horizontal' ? y + i : y;
        if (
          newX >= 10 ||
          newY >= 10 ||
          !newGrid[newX][newY].isHelpView ||
          newGrid[newX][newY].isPlace === false
        ) {
          return grid;
        }
        shipCells.push({ x: newX, y: newY });
      }

      shipCells.forEach(({ x, y }) => {
        newGrid[x][y].hasShip = true;
        newGrid[x][y].isHelpView = false;
        newGrid[x][y].isPlace = false;
      });

      const markAdjacentCells = (x: number, y: number) => {
        const directions = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
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

      setIsPicketShip(false);
      changeSelectedShip(pickedShip.id) 
    }
      setGridSM(newGrid)  
  };


  return (
    <div className='flex justify-center p-4'>
      <div className='grid grid-cols-11 gap-2 w-fit'>
        <div className='w-10'></div> 
        {letter.map((char, index) => (
          <div key={`letter-${index}`} className='flex items-center justify-center w-10 h-10 font-bold'>
            {char}
          </div>
        ))}
  
        {grid.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            <div className='flex items-center justify-center w-10 h-10 font-bold'>
              {rowIndex + 1}
            </div>
  
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onMouseEnter={() => checkPlaceForShip(rowIndex, colIndex)}
                onMouseLeave={() => uncheckPlaceForShip()}
                onClick={() => placeShip(rowIndex, colIndex)}
                className={`w-10 h-10 border border-gray-600 flex items-center justify-center transition-colors
                  
                  ${
                    cell.hit 
                      ? cell.hasShip 
                        ? 'bg-blue-500' 
                        : 'bg-red-200' 
                      : isPicketShip
                        ? cell.isHelpView
                          ? 'bg-blue-500'
                          : cell.isPlace
                            ? 'bg-green-200'
                            : cell.hasShip
                              ? 'bg-blue-500'
                              : 'bg-red-200'
                        : cell.hasShip
                          ? 'bg-blue-500'
                          : 'bg-gray-200'
                  }
                  `}
              > {cell.hit && (cell.hasShip ? <span className='text-black font-bold'>X</span> : <span className='text-black font-bold'>•</span>)}</div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
  
}
