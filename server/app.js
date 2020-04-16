const express = require('express')
const SocketIo = require('socket.io')
const app = express()
const socketEvents = require('./socket.js')


const port = 8081;

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/static/index.html')
})


const server = app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})


const io = SocketIo(server)
socketEvents(io)
