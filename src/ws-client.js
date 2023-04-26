"use strict";
//nodejs script that creates client and connects
//it to server running locally on the specified port
// Importing the WebSocket client library
const WebSocket = require("ws");
const process = require("process");

const port = process.argv[2];
if (port == undefined) {
  console.log("No port provided!");
  return;
}

// Connecting to the WebSocket server
let socket = new WebSocket("ws://localhost:" + port);

// Updating UI with the received message
socket.on("message", (message) => {
  console.log("Message received:", message);
});

// Updating UI with the sent message
socket.on("open", () => {
  socket.send(JSON.stringify({ message: "some message" }));
  console.log("Send message");
});


