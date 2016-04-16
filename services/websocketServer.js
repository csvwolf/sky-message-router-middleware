/**
 * Created by SkyAo on 16/4/10.
 */
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8888});
var WSElement = require('../classes/wsElement');


var wsCounter = 0,
    wsSet = {};

module.exports = function(eventEmitter, client) {
    wss.on('connection', function(ws) {
        //wsSet['ws' + wsCounter] = new WSElement(wsCounter, ws);
        //wsCounter++;

        ws.on('message', function incoming(message) {
            console.log('msg', message);
            var msg = JSON.parse(message);
             //console.log(events);
            switch(msg.command) {
                case 'new':
                    if (msg.type) {
                        if (typeof wsSet[msg.type] !== 'object') {
                            wsSet[msg.type] = {};
                        }
                        wsSet[msg.type]['ws' + wsCounter] = new WSElement(wsCounter, ws);
                        //console.log(wsSet[msg.type]);
                        wsCounter++;
                    }
                    break;
                case 'message':
                    if (msg.content) {
                        client.HMSET('msg:' + msg.id, msg, function() {
                            eventEmitter.emit('poolInserted');
                        });

                    } else {
                        ws.send(JSON.stringify({command: 'message', content: 'Error, No Content(4001)', time: new Date().getTime() }));
                    }
                    break;
                default:
                    ws.send(JSON.stringify({command: 'message', content: 'Error, Not Standard Data Format(4002)', time: new Date().getTime() }));
            }

                //console.log('received: %s', message);
        });
    });

    return {
        getWSCounter: function() {
            return wsCounter;
        },

        getWSSet: function() {
            return wsSet;
        }
    }
};

