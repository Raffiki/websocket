'use strict';


var util = require('util')
 , events = require('events')


module.exports = Websocket


/**
 * Inherits from EventEmitter.
 */
util.inherits(Websocket, events.EventEmitter)


/**
 * @constructor
 */

function Websocket(socket) {
    this._socket = socket
    socket.setTimeout(0)
    socket.setNoDelay(true)

    // socket cleanup handlers
    socket.on('end', function (data) {console.log(data)})
    socket.on('close', function (data) {console.log(data)})
    socket.on('error', function (data) {console.log(data)})
    socket.on('data', this.recieve.bind(this))
}

/**
 * sender
 * frame and send data packages
 */

Websocket.prototype.send = function (data) {
if (!Buffer.isBuffer(data)) {
    if (data && (typeof data.byteLength !== 'undefined' || typeof data.buffer !== 'undefined')) {
      data = getArrayBuffer(data);
    } else {
      data = new Buffer(data);
    }
  }
    var dataLength = data.length
        , dataOffset = 2
        , secondByte = dataLength;
    
    if (dataLength >= 65536) {
        dataOffset += 8;
        secondByte = 127;
    }
    else if (dataLength > 125) {
        dataOffset += 2;
        secondByte = 126;
    }

    var totalLength = dataLength + dataOffset;
    var outputBuffer = new Buffer(totalLength);
    outputBuffer[0] = 1//0x80
    outputBuffer[1] = secondByte;
    data.copy(outputBuffer, dataOffset);
 
    try {
        console.log(this._socket.write(outputBuffer, 'binary'))
    } catch (e) {
        console.log(e)
    }
}

/**
 * reciever
 */

Websocket.prototype.recieve = function (data) {
    data = new Buffer(data)
    this.send(data)
}


