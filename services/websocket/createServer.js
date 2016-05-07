/**
 * Created by SkyAo on 16/5/7.
 */
module.exports = function(wsServer, onMessage) {
    var wsCounter = 0,
        wsSet = {};
    console.log(wsServer);
    wsServer.server.on('connection', onConnection(onMessage, wsCounter, wsSet));

    return {
        getWSCounter: function() {
            return wsCounter;
        },

        getWSSet: function() {
            return wsSet;
        }
    }
};

function onConnection (onMessage, wsCounter, wsSet) {
    return function(ws) {
        ws.on('message', onMessage(wsCounter, wsSet));
    };
}