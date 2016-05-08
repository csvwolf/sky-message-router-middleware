/**
 * Created by SkyAo on 16/5/8.
 */
var runCommand = require('./runCommandController'),
    commandRouter = require('../classes/commands/commandRouter');

module.exports = function(msg, wsServer, appConfig, ws) {
    var options = commandRouter(msg, wsServer, appConfig, ws),
        command;

    try {
        command = options[msg.command+'Command'];
    } catch (e){
        command = options['defaultCommand'];
    }

    runCommand(new command());
};