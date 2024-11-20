// The websocket cloud server input object from Arzure Gateway API output to the client and send the data to the second server.
// The second server will send the data to the database.
// The first server will send the data to the client.
// The client will display the realtime data.

// Required modules
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const WebSocket = require('ws');
const http = require('http');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware
const url = process.env.URL;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Websocket connection
wss.on('connection', function connection(ws) { 
    console.log('Client connected');
    ws.send('Welcome to the server');
 
    // input json data
    ws.on('message', function incoming(data) {
        // Buffer data
        const buffer = Buffer.from(data);
        // Convert buffer to string
        // Parse string to JSON
        const obj = JSON.parse(buffer.toString());
        // Send massage and newdate to the client
        ws.send(`Message datarecive, Date: ${new Date()}`);
        console.log(obj);
        // Send data to the second server
    });

    ws.on('error', function error(err) {
        console.log(err);
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});

// Get request
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Post request
app.post('/api/data', (req, res) => {
    // Send data to the second server
    axios.post(url, req.body)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
    // Send data to the client
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });
    res.send('Data sent to the client');
});

// Server listening
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
