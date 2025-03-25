var players = [];
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
      players[0].ws.send(JSON.stringify({ type: 'startBattle', enemyBoard: players[1].grid, gameState: 'battle', turn: true }))
      players[1].ws.send(JSON.stringify({ type: 'startBattle', enemyBoard: players[0].grid, gameState: 'battle', turn: false }))
      console.log('yoyaa')
      console.log(players.length)
    }    
  }

  if(data.type === 'shoot') {
    const enemyPlayer = players.find(player => player.ws !== ws)
    const itsMe = players.find(player => player.ws === ws)
    var enemyShipsCount = -1;
    var itsMyShipsCount = -1;

    data.enemyGrid.map((row) => {
      row.map((cell) => { 
        if(cell.hasShip && !cell.hit)
          ++enemyShipsCount;
      })
    });
    data.grid.map((row) => {
      row.map((cell) => { 
        if(cell.hasShip && !cell.hit)
          ++itsMyShipsCount;
      })
    });

    if(enemyShipsCount > 0 && itsMyShipsCount > 0) {
      if(enemyPlayer.grid[data.x][data.y].hasShip) {
        enemyPlayer.ws.send(JSON.stringify({ type: 'shoot', turn: false, x: data.x, y: data.y }))
      }
      else {
        itsMe.ws.send(JSON.stringify({ type: 'turn', turn: false }))
        enemyPlayer.ws.send(JSON.stringify({ type: 'shoot', turn: true, x: data.x, y: data.y }))
      } 
    }
    else if(itsMyShipsCount > 0) {
        itsMe.ws.send(JSON.stringify({ type: 'end', turn: false, gameState: 'gameOver', winner: true }))
        enemyPlayer.ws.send(JSON.stringify({ type: 'end', turn: false, gameState: 'gameOver', winner: false }))
    }
    else {
      itsMe.ws.send(JSON.stringify({ type: 'end', turn: false, gameState: 'gameOver', winner: false }))
        enemyPlayer.ws.send(JSON.stringify({ type: 'end', turn: false, gameState: 'gameOver', winner: true }))
    }
    
  }
  
  if (data.type === "leaveGame") {
    players = players.filter(player => player.ws !== ws);
    console.log("Игрок отключился");
  }

  })


  ws.on('close', () => {
    players = players.filter(player => player.ws !== ws);
      console.log(`Игрок отключился ${players}`);
  });
}
  module.exports = { handleConnection };
