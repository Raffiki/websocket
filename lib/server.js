'use strict';

var crypto = require('crypto')

module.exports = Server


function Server () {

}


Server.prototype.generateKey = function (clientKey) {
    var shasum = crypto.createHash('sha1')
    shasum.update(clientKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
    return shasum.digest('base64')
}

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
