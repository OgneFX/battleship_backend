
const WebSocket = require('ws');
const { handleConnection } = require('./gameManager');

const webSocketConnect = new WebSocket.Server({ port: 8080 });

webSocketConnect.on('connection', (ws) => {
  handleConnection(ws);
});




