/**
 * Created by SkyAo on 16/5/8.
 *
 * 命令类的路由
 */
var newCommand = require('./new'),
    messageCommand = require('./message'),
    defaultCommand = require('./default');

module.exports = function(msg, wsServer, appConfig, ws) {
    return {
        newCommand: newCommand(msg, wsServer, appConfig, ws),
        messageCommand: messageCommand(msg, wsServer, appConfig, ws),
        defaultCommand: defaultCommand(msg, wsServer, appConfig, ws)
    };
};