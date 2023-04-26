"use strict";

//nodejs script creating 2 WebSocket servers, listens on ports and forwards 
//received messages on one server to other
const WebSocket = require("ws"); 
const process = require("process");

//defines ports
const firstIp = process.argv[2] || 8080;
const secondIp = process.argv[3] || 9090;

let firstConnection = undefined;
let secondConnection = undefined;

const firstWss = new WebSocket.Server({
  port: firstIp, //8080
});

const secondWss = new WebSocket.Server({
  port: secondIp, //9090
});

console.log(`Listen on ${firstIp}`);
firstWss.on("connection", (connection) => {
  if (firstConnection) {
    firstConnection.close();
    firstConnection = undefined;
  }
  firstConnection = connection;
  firstConnection.on("message", (message) => {
    console.log(`Message received on ${firstIp}: `, message);
    if (secondConnection) {
      secondConnection.send(message);
      console.log(`Message send to connection ${secondIp}: `, message);
    } else {
      console.log(`Connection on ${secondIp} is not established yet.`);
    }
  });
  console.log(`Connection on ${firstIp} established!`);
});

console.log(`Listen on ${secondIp}`);
secondWss.on("connection", (connection) => {
  if (secondConnection) {
    secondConnection.close();
    secondConnection = undefined;
    console.log(
      `Established new connection on ${secondIp}, closing the previous one...`
    );
  }
  secondConnection = connection;
  secondConnection.on("message", (message) => {
    console.log(`Message received on ${secondIp}: `, message);
    if (firstConnection) {
      firstConnection.send(message);
      console.log(`Message send to connection ${firstIp}: `, message);
    } else {
      console.log(`Connection on ${firstIp} is not established yet.`);
    }
  });
  console.log(`Connection on ${secondIp} established!`);
});


//Functionalities
//button
$(function () {
  $(".button-open").hide();
  $(".button-close").bind("click", function () {
    $(".box").hide(100);        

    if ($(this).attr("class") == "button-close")
    {
      $(".button-open").show();
    }
  });
});

$(".button-open").bind("click", function () {
    $(".box").show(100);        
    if ($(this).attr("class") == "button-open")
    {
      $(".button-open").hide();
    }
  });