/**
 * Created by SkyAo on 16/5/8.
 */

var Message = require('../classes/message'),
    balanceController = require('./balanceController');

module.exports = function(appConfig, post, wsServer, response, callback) {
    var objectMethods = appConfig.common.objMethods,
        msg,
        length,
        typeList,
        targetWs,
        selectorNum;

    if (objectMethods.isEmpty(post)) {
        msg = new Message(post, appConfig.redisClient, function(message) {
            while (1) {
                try {
                    if (objectMethods.isEmpty(post) && post.type) {
                        appConfig.log.info('发送内容', post);
                        typeList = wsServer.getWSSet()[post.type];
                        length = objectMethods.getObjectLength(typeList);
                        selectorNum = balanceController(length)();
                        targetWs = objectMethods.getSpecificElementOfObj(typeList, selectorNum);
                        message.command = 'message';
                        message.time = +new Date();
                        targetWs.elem.ws.send(JSON.stringify(message));
                    } else {
                        appConfig.log.info('输入错误', msg);
                        response.write(JSON.stringify({'error': '401', content: 'error input'}));
                        response.end();
                        return;
                    }
                } catch (e) {
                    if (length == 0) {
                        appConfig.log.info('目前没有可用服务器', msg);
                        response.write(JSON.stringify({'error': '404', content: 'no server now'}));
                        response.end();
                        return;
                    } else {
                        delete typeList[targetWs.key];
                        appConfig.log.info('删除指定的key', targetWs.key);
                    }
                    continue;
                }

                break;
            }

            callback(appConfig, message, response);
        });
    }
};