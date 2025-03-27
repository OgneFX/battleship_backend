import { FC, Fragment } from 'react';
import { useGameStore } from '../../store/GameStore.ts';

interface EnemyGameBoardProps {
  pushShoot: (x: number, y: number) => void;
}

export const EnemyGameBoard: FC<EnemyGameBoardProps> = ({pushShoot}) => {
  const { enemyGrid, setEnemyGrid, turn } = useGameStore(state => state)  
  const letter = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'].map(
    (item) =>
     <div key={`${item}-letterSymbol`}>
      {item}
    </div>
  );

  const checkForShoot = (x: number, y: number) => {
    const newGrid = enemyGrid
    newGrid.map((row) => row.map((cell) => cell.isHelpView = false))
    if(turn){
      newGrid[x][y].isHelpView = true;
    }
    setEnemyGrid(newGrid)
  }

  const unCheckForShoot = () => {
    const newGrid = enemyGrid
    newGrid.map((row) => row.map((cell) => cell.isHelpView = false))
    setEnemyGrid(newGrid)
  }

  const onShoot = (x: number, y: number) => {
    if(turn && !enemyGrid[x][y].hit) {
      const newGrid = enemyGrid
      pushShoot(x, y)
      newGrid[x][y].hit = true;
      setEnemyGrid(newGrid)
    }  
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
                     onMouseEnter={() => checkForShoot(rowIndex, colIndex)}
                     onMouseLeave={unCheckForShoot}
                     onClick={() => onShoot(rowIndex, colIndex)}
                    className={`w-10 h-10 border border-gray-600 flex items-center justify-center transition-colors bg-gray-200
                       ${cell.isHelpView ? 'bg-red-500' : ''}
                       ${cell.hit ? (cell.hasShip ? 'bg-blue-500' : 'bg-red-200') : 'bg-gray-200'}`
                      }                     
                  >
                    {cell.hit && (cell.hasShip ? <span className="text-black font-bold">X</span> : <span className="text-black font-bold">•</span>)}
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
  )
}
