

const players = [];
function handleConnection(ws) {
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
      console.log('yoy')
    }
    if(players.length === 2) {
      players[0].ws.send(JSON.stringify({ type: 'startBattle', enemyBoard: players[1].grid, gameState: 'battle', turn: true}))
      players[1].ws.send(JSON.stringify({ type: 'startBattle', enemyBoard: players[0].grid, gameState: 'battle', turn: false}))
    }    
  }

  if(data.type === 'shoot') {
     const enemyPlayer = players.find(player => player.ws !== ws)

     
    console.log(`${data.x}, ${data.y}`)
    players[0].ws.send(JSON.stringify({ type: 'shoot'}))

    // if(paalev) {
    //   
    //   console.log(`${x}, ${y}`)
    // }
  }


})


  ws.on('close', () => {
    players = players.filter((player) => player.ws !== ws);
      console.log(`Игрок отключился ${players}`);
  });
}
  module.exports = { handleConnection };
