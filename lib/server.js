'use strict';

var crypto = require('crypto')
 , http = require('http')
 , util = require('util')
 , events = require('events')
 , Websocket = require('./websocket')


module.exports = Server


function Server() {}


/**
 * Inherits from EventEmitter.
 */

util.inherits(Server, events.EventEmitter)


/**
 * generate http upgrade key
 */

Server.prototype.generateKey = function (clientKey) {
    var shasum = crypto.createHash('sha1')
    shasum.update(clientKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
    return shasum.digest('base64')
}


/**
 * bind to httpserver
 */

Server.prototype.listen = function (port) {

    var self = this

    var server = http.createServer(function (req, res) {
        res.end('not implemented')
    })
    server.listen(port)

    server.on('upgrade', function (request, socket, head) {
        self.handleUpgrade(request, socket, head)
        var ws = new Websocket(socket)
        self.emit('connection', ws)
    })
}


/**
 * handle upgrade event
 */

Server.prototype.handleUpgrade = function (req, socket, head) {

    if (!req.headers['sec-websocket-key']) {
        throw new Error()
    }

    //solve this later
    if (!req.headers['sec-websocket-protocol']) {
        req.headers['sec-websocket-protocol'] = 13
    }

    if (!req.headers['sec-websocket-version']) {
        throw new Error()
    }

    var key = this.generateKey(req.headers['sec-websocket-key'])

    var headers = [
        "HTTP/1.1 101 Switching Protocols",
        "upgrade: websocket",
        "connection: upgrade",
        "sec-websocket-accept: " + key
    ]
    
    try {
        socket.write(headers.concat('', '').join('\r\n'));
    }
    catch (e) {
        console.log(e)
    }
}
