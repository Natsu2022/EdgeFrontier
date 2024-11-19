//sample code from websockets/ws github
const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ noServer: true });
wsServer.on('connection', socket => {
    socket.on('message', message => {
        console.log('received: %s', message);
    });
    socket.send('Hello, client!');
    });


module.exports = { wsServer };