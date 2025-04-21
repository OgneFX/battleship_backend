
const WebSocket = require('ws');
const { handleConnection } = require('./gameManager');
const port = process.env.PORT || 8080;

const webSocketConnect = new WebSocket.Server({ port });

webSocketConnect.on('connection', (ws) => {
  handleConnection(ws);
});




