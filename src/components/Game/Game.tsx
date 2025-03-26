import { useEffect } from 'react'
import { GameBoard } from '../GameBoard/GameBoard'
import { ButtonShip } from '../ButtonShip/ButtonShip'
import { ships } from '../../data/mock_ships'
import { useShipStore } from '../../store/ShipStore'
import { EnemyGameBoard } from '../EnemyGameBoard/EnemyGameBoard'
import ConnectButton from '../ConnectButton/ConnectButton.tsx'
import { useGameStore } from "../../store/GameStore.ts";
import { GameOverModal } from '../GameOverModal/GameOverModal.tsx'
import { useWebSocket } from '../../utils/socket.ts'

export default function Game() {
  const { pushShoot, disconnectSocket } = useWebSocket();
  const { isPicketShip, pickedShip, setPicketShip } = useShipStore(state => state)
  const {setGamePhase, gamePhase} = useGameStore(state => state)

  const changeSelectedShip = (shipId: number) => {
    ships.map(item => {
      if(item.id === shipId)
      return item.isPlaces = true
    })     
    if(ships.every((ship) =>ship.isPlaces === true)) {
      setGamePhase('placement')
      console.log(gamePhase)
      
    }
  }
  console.info('1')
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
      <GameBoard changeSelectedShip = { changeSelectedShip }/>
      <GameOverModal disconnectSocket = { disconnectSocket }/>
      <EnemyGameBoard pushShoot = { pushShoot } />
      <ConnectButton/>
    </div>
  )
}
