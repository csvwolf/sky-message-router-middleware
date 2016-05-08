/**
 * Created by SkyAo on 16/5/8.
 */
var Command = require('./command');
module.exports = function(msg, wsServer, appConfig, ws) {
    //console.log(msg);
    var Message = function() {
        this.run = function() {
            if (msg.content) {
                appConfig.redisClient.HMSET('msg:' + msg.id, msg, function() {
                    appConfig.eventEmitter.emit('poolInserted');
                });
            } else {
                ws.send(JSON.stringify({
                    command: 'error',
                    content: 'Error, No Content(4001)',
                    time: new Date().getTime() })
                );
            }
        };
    };

    Message.prototype = new Command();

    return Message;
};