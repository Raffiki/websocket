'use strict';


var util = require('util')
 , events = require('events')


module.exports = Websocket


/**
 * Inherits from EventEmitter.
 */
util.inherits(Websocket, events.EventEmitter)

function Websocket(socket) {
    this._socket = socket
}

Websocket.prototype.send = function (data) {
    console.log(data)

    this._socket.write(data)
}



