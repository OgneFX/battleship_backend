import { useRef, useEffect, useCallback } from "react";
import { useGameStore } from "../store/GameStore.ts";

export function useWebSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const { gamePhase, setGamePhase, grid, setGridSM, setEnemyGrid, enemyGrid, setTurn, setWinner } = useGameStore(state => state)
  
  useEffect(() => {
    
    // console.log('В UseEffect')
    // console.log(socketRef.current)
    // console.log(gamePhase)
    if(socketRef.current === null && gamePhase === 'placement') {
      console.log('Внутри UseEffect')
      socketRef.current = new WebSocket('ws://localhost:8080');
      socketRef.current.onopen = () => {
        socketRef.current?.send(JSON.stringify({ type: 'sendGrid', grid }))
        console.log('Шляпа')
      }
      socketRef.current.onmessage = (event) => {
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
      socketRef.current.onclose = () => console.log('Отключение от сервера');
      socketRef.current.onerror = (error) => console.log('Ошибка' + error);

      
           
    }
}, [gamePhase])

  const pushShoot = useCallback((x: number, y: number) => {
    console.log('Дернул фыункцию')
    console.log(socketRef.current)
    console.log(gamePhase)
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({ type: "shoot", x, y, grid, enemyGrid }));
    }
  }, [grid, enemyGrid]);

  const disconnectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({ type: "leaveGame" }));
      socketRef.current.close();
      socketRef.current = null;
      console.log("Отключение от сервера");
    }
  }, [socketRef]);

  return { pushShoot, disconnectSocket }
}
