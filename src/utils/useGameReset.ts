import { useGameStore } from '../store/GameStore.ts';
import { ships } from '../data/mock_ships'
import {useGameResetProps} from '../interfaces/interfaces.ts'

export function useGameReset(  {disconnectSocket}: useGameResetProps ) {
  const { setGamePhase, setWinner, setGridSM, setEnemyGrid, setTurn, makeGrid, setTextPhase } = useGameStore(state => state);
  
  const resetGame = () => {
    disconnectSocket();
    setGamePhase(null); 
    setWinner(false); 
    setGridSM(makeGrid()); 
    setEnemyGrid(makeGrid()); 
    setTurn(false);
    setTextPhase('Расстановка'); 
    ships.map((item) => { item.isPlaces = false })
  }

  return { resetGame };
}