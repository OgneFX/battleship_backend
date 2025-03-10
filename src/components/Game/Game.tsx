import { useEffect } from 'react'
import { GameBoard } from '../GameBoard/GameBoard'
import { ButtonShip } from '../ButtonShip/ButtonShip'
import { ships } from '../../data/mock_ships'
import { useShipStore } from '../../store/ShipStore'

export default function game() {

  const { isPicketShip, pickedShip, setPicketShip } = useShipStore(state => state)
  const changeSelectedShip = (shipId: number) => {
    ships.map(item => {
      if(item.id === shipId)
      return item.isPlaces = true
    })
      
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
    <div>
        <ButtonShip/>
        <GameBoard changeSelectedShip={changeSelectedShip}/>
    </div>
  )
}
