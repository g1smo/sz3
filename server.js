var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/sz3', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/sz3/three.min.js', function(req, res){
    res.sendFile(__dirname + '/three.min.js');
});

app.get('/sz3/anim.js', function(req, res){
    res.sendFile(__dirname + '/anim.js');
});

app.get('/sz3/socket.io.js', function(req, res){
    res.sendFile(__dirname + '/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js');
});

io.on('connection', function(socket){
    console.log('konekt');

    socket.on('disconnect', function(){
        console.log('diskonekt');
    });

    socket.on('dodajKvadrat', function(msg){
        io.emit('dodajKvadrat', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
