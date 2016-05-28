/**
 * Created by SkyAo on 16/5/8.
 */
var runCommand = require('./runCommandController'),
    commandRouter = require('../classes/commands/commandRouter');

module.exports = function(msg, wsServer, appConfig, ws) {
    var options = commandRouter(msg, wsServer, appConfig, ws),
        option = msg.command,
        command = options[option + 'Command'] ? options[option + 'Command'] : options['defaultCommand'];
    appConfig.log.info('选择的命令', command);
    runCommand(new command());
};