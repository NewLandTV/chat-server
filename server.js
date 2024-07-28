const express = require("express");
const app = express();

const fs = require("fs");

const port = 3000;
const server = app.listen(port, function() {
    console.log(`Listening on ${port}`);
});

const socketIO = require("socket.io");
const io = socketIO(server, { path: "/socket.io" });

function getNowDateToString() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let string = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    return string;
}

io.on("connection", function(socket) {
    console.log(`${socket.id} connected...`);

    socket.on("msg", function(data) {
        let message = `${socket.name} : ${data}`;

        console.log(message);
        socket.broadcast.emit("msg", message);

        let historyMessage = `[${getNowDateToString()}][Chat] ${message}\n`;

        fs.appendFile("history.txt", historyMessage, function(err) {
            if (err) throw err;
            console.log("The message was appended to history file!");
        });
    });

    socket.on("enter", function(name) {
        socket.name = name;

        if (!fs.existsSync("history.txt")) return;

        fs.readFile("history.txt", "utf-8", function(err, data) {
            if (err) throw err;

            let lines = data.toString().split("\n");
            
            for (i in lines) {
                if (lines[i] == "") continue;
                
                io.emit("enter", lines[i]);
            }
        });

        io.emit("msg", `${name} has entered the chatroom.`);
    });

    socket.on("disconnect", function(data) {
        io.emit("msg", `${socket.name} has left the chatroom.`);
    });
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/chat", function(req, res) {
    res.sendFile(__dirname + "/chat.html");
});