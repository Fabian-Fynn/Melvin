var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.use(express.static('public'));
app.get('/', function(req, res) {
  console.log('req');
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('message', function(msg) {
      console.log('Message: ', msg);
      socket.emit('response', 'Hi there');
    });
});

http.listen(8700, function() {
  console.log('There we go ♕');
  console.log('Gladly listening on http://127.0.0.1:8700');
});
