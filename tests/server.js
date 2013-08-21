'use strict';

var Server = require('../lib/server')


var server = new Server()
server.listen(9000)

server.on('connection', function (ws) {
    console.log('connected')
    ws.on('message', function(message) {
        console.log('received: %s', message);
    });
//    ws.send('something');
})
server.on('close', function () {
    console.log('close')
})

