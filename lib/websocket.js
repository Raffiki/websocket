'use strict';


var http = require('http')
 , Server = require('./server')


module.exports = Websocket()

function Websocket() {
}

Websocket.prototype.listen = function (port) {
    var server = http.createServer(function (req, res) {
        res.end('not implemented')
    })
    server.listen(port)

    var ws = new Server()

    server.on('upgrade', function (request, socket, head) {
        ws.handleUpgrade(request, socket, head) 
    })

    return ws
}
