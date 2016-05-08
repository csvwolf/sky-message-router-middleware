/**
 * Created by SkyAo on 16/5/7.
 *
 * WebSocket功能
 */
module.exports = function(appConfig, onMessage) {
    var wsCounter = 0,
        wsSet = {};

    this.getWSCounter = function() {
        return wsCounter;
    };

    this.getWSSet = function() {
        return wsSet;
    };

    this.increseWSCounter = function() {
        wsCounter++;
    };

    this.initType = function(type) {
        wsSet[type] = {};
    };

    appConfig.webSocketServer.server.on('connection', onConnection(onMessage, appConfig, this));

    return this;
};

function onConnection (onMessage, appConfig, wsServer) {
    return function(ws) {
        ws.on('message', onMessage(appConfig, wsServer,ws));
    };
}