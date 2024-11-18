const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const http = require('http');

const main = require("./main.js");

// Import .env file
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB


// Connect to WebSocket
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
});

WebSocket.Server.prototype.broadcast = function(data) {
    this.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', main.main );

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
  });