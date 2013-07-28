'use strict';


var http = require('http')
 , Server = require('./server')
 , util = require('util')
 , events = require('events')


module.exports = Websocket

function Websocket() {
}

/**
 * Inherits from EventEmitter.
 */

util.inherits(Websocket, events.EventEmitter)

Websocket.prototype.listen = function (port) {


    var self = this

    var server = http.createServer(function (req, res) {
        res.end('not implemented')
    })
    server.listen(port)

    var ws = new Server()

    server.on('upgrade', function (request, socket, head) {
        ws.handleUpgrade(request, socket, head) 

        self.emit('connection')
    })

    return ws
}


