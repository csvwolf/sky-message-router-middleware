/**
 * Created by SkyAo on 16/5/8.
 */
var runCommand = require('./runCommandController'),
    commandRouter = require('../classes/commands/commandRouter');

module.exports = function(msg, wsServer, appConfig, ws) {
    var options = commandRouter(msg, wsServer, appConfig, ws),
        option = msg.command || 'default',
        command = options[option + 'Command'];

    runCommand(new command());
};