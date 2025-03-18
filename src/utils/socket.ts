import { useRef, useEffect } from "react";
import { useGameStore } from "../store/GameStore.ts";

export function useWebSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const { gamePhase, setGamePhase, grid, setEnemyGrid, enemyGrid, setTurn } = useGameStore(state => state)

  useEffect(() => {
  // const connectSocket = () => {
    if(!socketRef.current && gamePhase == 'placement') {
      const newSocket = new WebSocket('ws://localhost:8080');
      newSocket.onopen = () => {
        newSocket.send(JSON.stringify({ type: 'sendGrid', grid}))
        console.log('Тестовое подключение');
      }
      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        setGamePhase(data.gameState)
        setEnemyGrid(data.enemyBoard)
        setTurn(data.turn)  
        console.log('Получено сообщение c сервера');
      }
      newSocket.onclose = () => console.log('Отключение от сервера');
      newSocket.onerror = (error) => console.log('Ошибка' + error);
      
      socketRef.current = newSocket; 
      console.log(newSocket)   
      console.log(socketRef.current) 
    }
  // };
}, [gamePhase])

  const pushShoot = (x: number, y:number) => {
    console.log(socketRef.current)
    console.log('shhot out')
      if(socketRef.current) {
        console.log('shhot in')

        socketRef.current.send(JSON.stringify({ type: 'shoot', x, y }))
        socketRef.current.onmessage = (message) => {
          const data = JSON.parse(message.data)
          // if(data.type === 'shoot'){
            console.log('data is come')
            // console.log(data.x)
            // console.log(data.y)

          // }

        }
      }
  }

  return { pushShoot }
}
