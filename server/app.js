var express = require('express');
const app = require('express')();
const server = require('http').createServer(app)
const logger = require('morgan');
const cors = require('cors');
const { randomUUID } = require('crypto');

const connection = require('./lib/conn.js');

connection.connect(function(err){
    if(err) throw err
    else console.log("Uppkopplad till databasen");
  })


const io = require('socket.io')(server, {
    cors: {
        origin:'*',
        methods: ['GET', ' POST']
    }
})

const usersRouter = require('./routes/users.js');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.send('detta funkar')
})

let connectedUsers = {} // array för connected user
let userNames = {};

io.on('connection', function(socket) {
    console.log("Användare kopplad");
    socket.on('userName', (username) =>{ 
        userNames[socket.id] = username;
      });

    const updateConnectedUser = (room) => {

        let usersInRoom =  io.sockets.adapter.rooms.get(room)

        if(usersInRoom) {
            connectedUsers[room] = Array.from(usersInRoom)
        } else {
            connectedUsers[room] = [];
        }

        const usersWithName = connectedUsers[room].map(socketId => {
            return { socketId, userName: userNames[socketId]}
        })
       
        console.log(userNames)
        io.in(room).emit('playerConnected', usersWithName)
    }

    socket.on('room', (room) => {
        
        socket.join(room)
        socket.emit('joinedroom', room)

     
    
       
        updateConnectedUser(room)

    });




//dissconnect

    socket.on('disconnecting', () => {

        const rooms = Object.keys(socket.rooms);

        rooms.forEach((room) => {
            updateConnectedUser(room)
        })
    })

    //chat
    socket.emit("chat", "hello world")

    socket.on("chat", (arg) =>{
        console.log("kommande chat", arg);
        io.emit("chat", arg);
    })

    socket.emit("updateGrid", "updatedGrid")

    socket.on("paintGrid", (arg) => {
        console.log("färg uppdaterad", arg);
        io.emit("paintGrid", arg);
        console.log('socket connected', socket.connected);
    })

    socket.on("disconnect", function () {
        console.log("Användare frånkopplad");
        
    })
})
server.listen(process.env.PORT || '3000');