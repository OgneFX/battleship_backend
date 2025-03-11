
const WebSocket = require('ws');
const webSocketConnect = new WebSocket.Server({ port: 8080 });
const players = [];

webSocketConnect.on('connection', (ws) => {
  if(players.length >=2) {
    ws.send(JSON.stringify({ type: 'error', message: 'Сервер полон!' }))
    ws.close();
    return;
  }

  players.push(ws)
  ws.send(JSON.stringify({ type: "info", message: "Вы подключены к серверу!" }));

  if (players.length === 2) {
    players.forEach((player, index) => {
        player.send(JSON.stringify({ type: "gameStart", message: `Игра начинается! Вы - Игрок ${index + 1}` }));
    });
  }
  ws.on('message', (message) => {
        console.log(`Получено сообщение: ${message}`);
        players.forEach(player => {
            if (player !== ws) {
                player.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log("Игрок отключился");
        players.filter(player => player !== ws);
    });



});




