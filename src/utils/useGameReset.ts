import { useGameStore } from '../store/GameStore.ts';
import { ships } from '../data/mock_ships'
import { useWebSocket } from '../utils/socket.ts'

export function useGameReset() {
  // const { setGamePhase, setWinner, setGridSM, setEnemyGrid, setTurn, makeGrid } = useGameStore(state => state);
  const { disconnectSocket } = useWebSocket();
  
  const resetGame = () => {
    // setGamePhase("placement"); 
    // setWinner(false); 
    // setGridSM(makeGrid()); 
    // setEnemyGrid(makeGrid()); 
    // setTurn(false); 
    // ships.map((item) => { item.isPlaces = false })
    // disconnectSocket;
  };

  return { resetGame };
}