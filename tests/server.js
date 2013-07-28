'use strict';

var Websocket = require('../lib/websocket')
var Server = require('../lib/websocket')

var ws = new Websocket()

var server = ws.listen(9000)

ws.on('connection', function () {
    ws.send('connection')
})
ws.on('close', function () {
    console.log('close')
})

