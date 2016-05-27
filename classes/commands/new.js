/**
 * Created by SkyAo on 16/5/8.
 *
 * 创建命令
 *
 * 保存WebSocket到指定的分类
 */
var Command = require('./command'),
    WSElement = require('../wsElement');

module.exports = function(msg, wsServer, appConfig, ws) {

    var newAction = function() {
        this.run = function() {
            if (msg.type) {
                if (typeof wsServer.getWSSet()[msg.type] !== 'object') {
                    wsServer.initType(msg.type);    // 如果没有创建过，则初始化分类
                }
                // 添加到指定分类
                wsServer.getWSSet()[msg.type]['ws' + wsServer.getWSCounter()] = new WSElement(wsServer.getWSCounter(), ws);
                //console.log(wsSet[msg.type]);
                // counter计数器增加
                wsServer.increseWSCounter();
                appConfig.log.info('创建Websocket Handle：', msg);
            }
        };
    };

    newAction.prototype = new Command();

    return newAction;
};
