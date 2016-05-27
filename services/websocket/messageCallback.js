/**
 * Created by SkyAo on 16/5/7.
 *
 * 消息处理的回调函数
 */
var commandSelector = require('../../controller/selectCommandController');

module.exports = function(appConfig, wsServer, ws) {
    return function(message) {
        var msg;
        try {
            msg = JSON.parse(message);
        } catch (e) {
            msg = {};
        }
        commandSelector(msg, wsServer, appConfig, ws);
    }
};