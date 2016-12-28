const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);
const Melvin = require('./melvin.js');

app.use(express.static('public'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

io.on('connection', function(socket){
    const melvin = new Melvin({socket});
    socket.on('message', function(msg) {
      melvin.receiveQuestion(msg);
    });
});

http.listen(8700, function() {
  console.log('There we go ♕');
  console.log('Gladly listening on http://127.0.0.1:8700');
});
