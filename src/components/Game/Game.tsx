import { useEffect } from 'react'
import { GameBoard } from '../GameBoard/GameBoard'
import { ButtonShip } from '../ButtonShip/ButtonShip'
import { ships } from '../../data/mock_ships'
import { useShipStore } from '../../store/ShipStore'
import { EnemyGameBoard } from '../EnemyGameBoard/EnemyGameBoard'
import { useGameStore } from '../../store/GameStore.ts';
import { GameOverModal } from '../GameOverModal/GameOverModal.tsx'
import { useWebSocket } from '../../utils/socket.ts'

export default function Game() {
  const { pushShoot, disconnectSocket } = useWebSocket();
  const { isPicketShip, pickedShip, setPicketShip } = useShipStore(state => state)
  const {setGamePhase, textPhase} = useGameStore(state => state)

  const changeSelectedShip = (shipId: number) => {
    ships.map(item => {
      if(item.id === shipId)
      return item.isPlaces = true
    })     
    if(ships.every((ship) =>ship.isPlaces === true)) {
      setGamePhase('placement')
    }
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
    window.addEventListener('keydown', handlerKeyPress);
      return () => {
        window.removeEventListener('keydown', handlerKeyPress);
      };
  }, [isPicketShip, pickedShip, setPicketShip]);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-8'> Морской Бой </h1>
      <div className='mb-8'>
        <h2 className='text-xl font-semibold mb-4'>{textPhase}</h2>
        
      </div>
      <div className='flex flex-row gap-8 justify-center'>
      <ButtonShip />
        <GameBoard changeSelectedShip={changeSelectedShip} />
        <EnemyGameBoard pushShoot={pushShoot} />
      </div>
      <div className='mt-8'>
        <GameOverModal disconnectSocket={disconnectSocket} />      
      </div>
    </div>
  )
}
