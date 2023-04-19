const  express =require("express")
const path=require("path")
const app= express()
const http=require("http")
const server=http.createServer(app)
const{Server}=require("socket.io")
// const io = new Server(server);

// app.use(express.static(path.join(__dirname+"/public")))
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
const PORT=process.env.PORT || 8080


const cors=require("cors")
app.use(cors())

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
        
    }
})



app.use(express.static(path.join(__dirname+"/public")))
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)
   
    
    socket.on("text_send",(data,id)=>{
     
      console.log("Tin nhan la ",data,id)
      io.sockets.emit("text_sender",data,id)
      
    
     
    })
    
    socket.on("disconnect",()=>{
      console.log("User Disconnected",socket.id)
  })
})

server.listen(PORT,()=>{
  console.log("SERVER RUNNING")
})


// const express = require('express');
// const app = express();
// http = require('http');
// const cors = require('cors');
// const { dirname } = require('path');

// app.use(cors()); // Add cors middleware

// const server = http.createServer(app);



// server.listen(3000, () => 'Server is running on port 3000');