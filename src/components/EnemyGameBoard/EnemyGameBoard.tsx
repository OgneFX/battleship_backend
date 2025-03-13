import { Fragment } from 'react';
import { useGameStore } from "../../store/GameStore.ts";




export function EnemyGameBoard() {
  const {enemyGrid} = useGameStore(state => state)
  

  const letter = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'].map(
    (item) =>
     <div key={`${item}-letterSymbol`}>
      {item}
    </div>
  );

  const checkCoeChto = (x: number, y: number) => {
    console.log(enemyGrid[x][y])
  }

  return (
    <div className="flex justify-center p-4">
          <div className="grid grid-cols-11 gap-2 w-fit">
            
            <div className="w-10"></div> 
            {letter.map((char, index) => (
              <div key={`letter-${index}`} className="flex items-center justify-center w-10 h-10 font-bold">
                {char}
              </div>
            ))}
      
            {enemyGrid.map((row, rowIndex) => (
              <Fragment key={rowIndex}>
                
                <div className="flex items-center justify-center w-10 h-10 font-bold">
                  {rowIndex + 1}
                </div>
      
                
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                     onMouseEnter={() => checkCoeChto(rowIndex, colIndex)}
                    // onMouseLeave={() => }
                    // onClick={() => }
                    className={`w-10 h-10 border border-gray-600 flex items-center justify-center transition-colors bg-gray-200`}
                  ></div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
  )
}
