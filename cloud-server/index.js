// Required modules
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;
const WebSocket = require('ws');
const http = require('http');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const cors = require('cors');
const bodyParser = require('body-parser');


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// WebSocket connection
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.send('Welcome to the server');

    // Handle incoming messages
    ws.on('message', async (data) => {
        try {
            const buffer = Buffer.from(data);
            const obj = JSON.parse(buffer.toString());

            // Log received data
            console.log('Received data:', obj);

            // Respond to client
            ws.send(`Message received and processed, Date: ${new Date().toISOString()}`);

            // boradcast to all clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(obj));
                }
            });
        } catch (err) {
            console.error('Error processing message:', err.message);
            ws.send('Error processing data');
        }
    });

    // Handle errors
    ws.on('error', (err) => {
        console.error('WebSocket error:', err.message);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/api/data', (req, res) => {
    // Extract data from the request body
    const data = req.body;
    // Log the entire request body to debug the issue
    console.log('Received request body:', JSON.stringify(data));

        // Stream data to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });

    res.send('Data sent to all clients');
});

// Server listening
server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
