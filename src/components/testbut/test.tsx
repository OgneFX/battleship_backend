import {useState} from "react";
import { useGameStore } from "../../store/GameStore.ts";

function Test() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const {gamePhase, setGamePhase, grid, setEnemyGrid} = useGameStore(state => state)

  const connectSocket = () => {
    if(!socket && gamePhase == 'placement') {
      const newSocket = new WebSocket('ws://localhost:8080');
      newSocket.onopen = () => {
        newSocket.send(JSON.stringify({ type: 'sendGrid', grid}))
        console.log('Тестовое подключение');
      }
      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        setGamePhase(data.gameState)
        setEnemyGrid(data.enemyBoard)
        console.log('Получено сообщение c сервера');
      }
      newSocket.onclose = () => console.log('Отключение от сервера');
      newSocket.onerror = (error) => console.log('Ошибка' + error);
      setSocket(newSocket);
           
    }
  };



  return (
    <div >
      <button onClick={connectSocket}>Подключение</button>
    </div>
  );
}

export default Test;
