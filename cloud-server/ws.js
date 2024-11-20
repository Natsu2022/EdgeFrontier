const express = require("express"); // library rest api http
const cors = require("cors"); // config ip address
const bodyParser = require("body-parser");
const ws = require("ws"); // library websocket

const app = express();
const port = process.env.PORT || 8181;

const wsServer = new ws.Server({ noServer: true });

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/", (req, res) => {
  const { username, password } = req.body
  console.log("username", username);
  console.log("password", password);
  res.send("Post request received");
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Get user with id ${id}`);
});

wsServer.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    const data = JSON.parse(message.toString());
    console.log("Received message", data);
  
    // * send message to all clients
    wsServer.clients.forEach((client) => {
      if (client !== socket) {
        client.send(JSON.stringify(data));
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

wsServer.on("message_connection", (socket) => {
  console.log("Message client connected");

  socket.on("message", (message) => {
    const data = JSON.parse(message.toString());
    console.log("Received message", data);

    // * send message to all clients
    wsServer.clients.forEach((client) => {
      if (client !== socket) {
        client.send(JSON.stringify(data));
      }
    });
  });

  socket.on("close", () => {
    console.log("Message client disconnected");
  });
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// comment this line if you want to use express server
// const server = http.createServer(app);
server.on("upgrade", (request, socket, head) => { // upgrade http to websocket
   // get url path
  const pathname = request.url ? new URL(request.url,
     `http://${request.headers.host}`).pathname : "";

    // check if the path is / or /message
  if (pathname === "/") {
    // handle upgrade to websocket
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit("connection", socket, request); // emit connection event to wsServer object 
    });
  } else if (pathname === "/message") { // check if the path is /message 
    wsServer.handleUpgrade(request, socket, head, (socket) => { // handle upgrade to websocket
      // emit message_connection event to wsServer object
      wsServer.emit("message_connection", socket, request); 
    });
  } else { 
    socket.destroy(); // destroy the socket
  }
});