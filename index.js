var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var numUsers = 0;

app.use('/app', express.static(__dirname + '/socialApp/www'));

app.get('/numUsers', function(req, res){
  res.send(numUsers.toString());
});

io.on('connection', function(socket){
  
  io.emit('users num', ++numUsers);
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('users num', --numUsers);
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});