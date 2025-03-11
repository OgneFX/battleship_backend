import { useEffect } from 'react'
import { GameBoard } from '../GameBoard/GameBoard'
import { ButtonShip } from '../ButtonShip/ButtonShip'
import { ships } from '../../data/mock_ships'
import { useShipStore } from '../../store/ShipStore'
import { EnemyGameBoard } from '../EnemyGameBoard/EnemyGameBoard'
import Test from '../testbut/test'

export default function game() {

  const { isPicketShip, pickedShip, setPicketShip } = useShipStore(state => state)
  const changeSelectedShip = (shipId: number) => {
    ships.map(item => {
      if(item.id === shipId)
      return item.isPlaces = true
    })     
    if(ships.every((ship) =>ship.isPlaces === true)) {
      console.log(123)

    }
  }

  const placement = () => {
    
  }

  useEffect(() => {
    const handlerKeyPress = (e: KeyboardEvent) => {
            
      if(isPicketShip && e.key.toLowerCase() === 'r' && 'к' && pickedShip) {
        setPicketShip({ 
          ...pickedShip, 
          direction: pickedShip.direction === 'horizontal' ? 'vertical' : 'horizontal'
        })              
      }        
    };
    window.addEventListener("keydown", handlerKeyPress);
      return () => {
        window.removeEventListener("keydown", handlerKeyPress);
      };
  }, [isPicketShip, pickedShip, setPicketShip]);

  return (
    <div className='flex'>
      <h1>Расстановка</h1>
      <ButtonShip/>
      <GameBoard changeSelectedShip={changeSelectedShip}/>
      <EnemyGameBoard/>
      <Test/>
    </div>
  )
}
