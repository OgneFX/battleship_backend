import { useRef, useEffect, useCallback } from "react";
import { useGameStore } from "../store/GameStore.ts";

export function useWebSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const { gamePhase, setGamePhase, grid, setGridSM, setEnemyGrid, enemyGrid, setTurn, setWinner, setTextPhase } = useGameStore(state => state)
  
  useEffect(() => {
    if(socketRef.current === null && gamePhase === 'placement') {
      console.log('Внутри UseEffect')
      socketRef.current = new WebSocket('ws://localhost:8080');
      socketRef.current.onopen = () => {
        // socketRef.current?.send(JSON.stringify({ type: 'sendGrid', grid }))
        console.log('Шляпа')
      }
      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if(data.type ==='readyToBattle') {
          socketRef.current?.send(JSON.stringify({ type: 'sendGrid', grid }))
          setTextPhase(data.textPhase)
        }
        if(data.type === 'startBattle') {
          
          setGamePhase(data.gameState)
          setEnemyGrid(data.enemyBoard)
          setTurn(data.turn)  
          setTextPhase(data.textPhase)
        }

        if(data.type === 'shoot') {
          setTurn(data.turn)
          const newGrid = grid
          newGrid[data.x][data.y].hit = true
          setGridSM(newGrid)
          setTextPhase(data.textPhase)
        }

        if(data.type === 'turn') {
          setTurn(data.turn)
          setTextPhase(data.textPhase)
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
    console.log('dis out')
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({ type: "shoot", x, y, grid, enemyGrid }));
    }
  }, [grid, enemyGrid]);

  const disconnectSocket = useCallback(() => {
    console.log('dis out')
    console.log(socketRef.current)
    if (socketRef.current) {
      console.log('dis in')
      socketRef.current.send(JSON.stringify({ type: "leaveGame" }));
      socketRef.current.close();
      socketRef.current = null;
      console.log("Отключение от сервера");
    }
  }, [gamePhase]);

  return { pushShoot, disconnectSocket }
}
