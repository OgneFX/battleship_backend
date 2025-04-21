const { v4: uuidv4 } = require('uuid');
const games = new Map();
const waitngPlayers = [];

function handleConnection(ws) {
  if(waitngPlayers.length > 0) {
    const opponent = waitngPlayers.shift();
    const roomId = uuidv4();

    ws.roomId = roomId;
    opponent.roomId = roomId;
    games.set(roomId, [{ ws: opponent }, { ws }]);
    opponent.send(JSON.stringify({ type: 'readyToBattle',  textPhase: 'Бой'}));
    ws.send(JSON.stringify({ type: 'readyToBattle',  textPhase: 'Бой'}));

    console.log(roomId)
    console.log()
    console.log(games)
   
  } else {
    waitngPlayers.push(ws);
  }
  

  ws.on('message', (message) => {
  const data = JSON.parse(message);

  if(data.type === 'sendGrid') {
    const room = games.get(ws.roomId);
    if(!room) return

    const player = room.find(p => p.ws === ws)
    if (player) player.grid = data.grid;

    if(room.every(p => p.grid)) {
      room[0].ws.send(JSON.stringify({ type: 'startBattle', enemyBoard: room[1].grid, gameState: 'battle', textPhase: 'Бой', turn: true }))
      room[1].ws.send(JSON.stringify({ type: 'startBattle', enemyBoard: room[0].grid, gameState: 'battle', textPhase: 'Бой',turn: false }))
    }    
  }


  if(data.type === 'shoot') {
    const room = games.get(ws.roomId);
    const enemyPlayer = room.find(player => player.ws !== ws)
    const itsMe = room.find(player => player.ws === ws)
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
        enemyPlayer.ws.send(JSON.stringify({ type: 'shoot', turn: false, textPhase: 'Ход противника', x: data.x, y: data.y }))
      }
      else {
        itsMe.ws.send(JSON.stringify({ type: 'turn', turn: false, textPhase: 'Ход противника' }))
        enemyPlayer.ws.send(JSON.stringify({ type: 'shoot', turn: true, textPhase: 'Ваш ход', x: data.x, y: data.y }))
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
    leaveGame(ws);
  }
})

  ws.on('close', () => {
    leaveGame(ws);
  });

  function leaveGame(ws) {
    const room = games.get(ws.roomId);
    if (!room) return;
  
    const updatedRoom = room.filter(p => p.ws !== ws);
    if (updatedRoom.length === 0) {
      games.delete(ws.roomId);
      console.log(games)
    } else {
      games.set(ws.roomId, updatedRoom);
      console.log(games)
    }
  }
}
  module.exports = { handleConnection };
