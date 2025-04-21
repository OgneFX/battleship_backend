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
      const enemyPlayer = room.find(player => player.ws !== ws);
      const itsMe = room.find(player => player.ws === ws);
      if (!room || !enemyPlayer || !itsMe) return;

      const cell = enemyPlayer.grid[data.x][data.y];
      let result = false;

      if (cell.hasShip) {
        cell.hit = true;
        result = true;
      } else {
        cell.hit = true;
        result = false;
      }

      const enemyShipsLeft = enemyPlayer.grid.flat().some(cell => cell.hasShip && !cell.hit);
      const myShipsLeft = itsMe.grid.flat().some(cell => cell.hasShip && !cell.hit);

      enemyPlayer.ws.send(JSON.stringify({
        type: 'shoot',
        x: data.x,
        y: data.y,
        turn: result ? false : true,
        textPhase: result ? 'Ход противника' : 'Ваш ход'
      }));
      
      itsMe.ws.send(JSON.stringify({
        type: 'turn',
        turn: result  ? true : false,
        textPhase: result  ? 'Ваш ход' : 'Ход противника'
      }));

      if (!enemyShipsLeft) {
        itsMe.ws.send(JSON.stringify({ type: 'end', gameState: 'gameOver', winner: true }));
        enemyPlayer.ws.send(JSON.stringify({ type: 'end', gameState: 'gameOver', winner: false }));
        games.delete(ws.roomId);
      } else if (!myShipsLeft) {
        itsMe.ws.send(JSON.stringify({ type: 'end', gameState: 'gameOver', winner: false }));
        enemyPlayer.ws.send(JSON.stringify({ type: 'end', gameState: 'gameOver', winner: true }));
        games.delete(ws.roomId);
      }
      
        
    }
  
  
  });

  ws.on('close', () => {
    leaveGame(ws);
  });

  function leaveGame(ws) {
    const room = games.get(ws.roomId);
    if (!room) return;
  
    const updatedRoom = room.filter(p => p.ws !== ws);
    if (updatedRoom.length === 0) {
      games.delete(ws.roomId);
    } else {
      games.set(ws.roomId, updatedRoom);
    }
  }
}
  module.exports = { handleConnection };
