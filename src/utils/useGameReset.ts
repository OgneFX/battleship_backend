import { useGameStore } from '../store/GameStore.ts';
import { ships } from '../data/mock_ships'

import { useCallback } from 'react';

export function useGameReset( disconnectSocket: any) {
  const { setGamePhase, setWinner, setGridSM, setEnemyGrid, setTurn, makeGrid } = useGameStore(state => state);
  
  
  const resetGame = () => useCallback(() =>{
    setGamePhase("placement"); 
    setWinner(false); 
    setGridSM(makeGrid()); 
    setEnemyGrid(makeGrid()); 
    setTurn(false); 
    ships.map((item) => { item.isPlaces = false })
    disconnectSocket;
  },[disconnectSocket])

  return { resetGame };
}