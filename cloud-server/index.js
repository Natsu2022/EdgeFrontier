const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { wsServer } = require('./ws.js');
const main = require("./main.js");

// Import .env file
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT;

//Middleware
app.use(cors());
app.use(bodyParser.json());

const server = app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
app.get('/', main.main );


// Attach the WebSocket server to the Express server
server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});
