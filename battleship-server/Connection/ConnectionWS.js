
const WebSocket = require('ws');
const webSocketConnect = new WebSocket.Server({ port: 8080 });
const players = [];

webSocketConnect.on('connection', (ws) => {
 
  if(players.length >2) {
    ws.send(JSON.stringify({ type: 'error', message: 'Сервер полон!' }))
    ws.close();
    return;
  }

  
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if(data.type === 'sendGrid') {
      if (!players.find((player) => player.ws === ws)) {
        players.push({ ws, grid: data.grid });
      }
    }

    if(players.length === 2) {
      players[0].ws.send(JSON.stringify({ type: 'startBattle', enemyBoard: players[1].grid, gameState: 'battle'}))
      players[1].ws.send(JSON.stringify({ type: 'startBattle', enemyBoard: players[0].grid, gameState: 'battle'}))
    }



  })
  
  // ws.on('message', (message) => {
  //       console.log(`Получено сообщение: ${message}`);
  //       players.forEach(player => {
  //           if (player !== ws) {
  //               player.send(message);
  //           }
  //       });
  //   });

    ws.on('close', () => {
        players = [];
        console.log(`Игрок отключился ${players}`);
    });



});




