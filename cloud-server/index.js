const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const main = require("./main.js");

import { WebSocketServer } from 'ws';

// Import .env file
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;


const wss = new WebSocketServer({ port: PORT });

// WebSocket Server
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});

export default wss;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', main.main );

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
  });