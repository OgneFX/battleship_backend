import { useRef, useEffect } from "react";
import { useGameStore } from "../store/GameStore.ts";

export function useWebSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const { gamePhase, setGamePhase, grid, setGridSM, setEnemyGrid, enemyGrid, setTurn, setWinner } = useGameStore(state => state)

  useEffect(() => {
    if(!socketRef.current && gamePhase === 'placement') {
      const newSocket = new WebSocket('ws://localhost:8080');
      newSocket.onopen = () => {
        newSocket.send(JSON.stringify({ type: 'sendGrid', grid }))
        console.log('Шляпа')
      }
      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if(data.type === 'startBattle') {
          setGamePhase(data.gameState)
          setEnemyGrid(data.enemyBoard)
          setTurn(data.turn)  
        }

        if(data.type === 'shoot') {
          setTurn(data.turn)
          const newGrid = grid
          newGrid[data.x][data.y].hit = true
          setGridSM(newGrid)
        }

        if(data.type === 'turn') {
          setTurn(data.turn)
        }

        if(data.type === 'end') {
          setTurn(data.turn)
          setGamePhase(data.gameState)
          setWinner(data.winner)
        }
      }
      newSocket.onclose = () => console.log('Отключение от сервера');
      newSocket.onerror = (error) => console.log('Ошибка' + error);
      
      socketRef.current = newSocket; 
      
    }
}, [gamePhase])

  const pushShoot = (x: number, y:number) => {
      
      if(socketRef.current) {
        socketRef.current.send(JSON.stringify({ type: 'shoot', x, y, grid, enemyGrid }))
      }
  }

  const disconnectSocket = () => {
    if(socketRef.current) {
      socketRef.current.send(JSON.stringify({ type: "leaveGame" })); 
      socketRef.current.close();
      socketRef.current = null;
      console.log('disconnect')
    }
  }

  return { pushShoot, disconnectSocket }
}
