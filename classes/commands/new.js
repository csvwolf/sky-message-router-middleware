/**
 * Created by SkyAo on 16/5/8.
 */
var Command = require('./command'),
    WSElement = require('../wsElement');

module.exports = function(msg, wsServer, appConfig, ws) {

    var newAction = function() {
        this.run = function() {
            if (msg.type) {
                if (typeof wsServer.getWSSet()[msg.type] !== 'object') {
                    wsServer.initType(msg.type);
                }
                wsServer.getWSSet()[msg.type]['ws' + wsServer.getWSCounter()] = new WSElement(wsServer.getWSCounter(), ws);
                //console.log(wsSet[msg.type]);
                wsServer.increseWSCounter();
            }
        };
    };

    newAction.prototype = new Command();

    return newAction;
};
