/**
 * Created by SkyAo on 16/5/8.
 */
var Command = require('./command');
module.exports = function(msg, wsServer, appConfig, ws) {

    var Message = function() {
        this.run = function () {
            ws.send(JSON.stringify({
                command: 'message',
                content: 'Error, Not Standard Data Format(4002)',
                time: new Date().getTime()
            }));
        };
    }

    Message.prototype = new Command();

    return Message;
};