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
                    if (post.type) {
                        typeList = wsServer.getWSSet()[post.type];
                        length = objectMethods.getObjectLength(typeList);
                        selectorNum = balanceController(length);
                        targetWs = objectMethods.getSpecificElementOfObj(typeList, selectorNum);
                        targetWs.elem.ws.send(JSON.stringify(message));
                    } else {
                        console.log('error input');
                        return;
                    }
                } catch (e) {
                    if (length == 0) {
                        console.log('there is no server now');
                        break;
                    } else {
                        console.log(typeList);
                        delete typeList[targetWs.key];
                        console.log('delete the current server in the list');
                    }
                    continue;
                }

                break;
            }

            console.log('serverSelectorController: ', message);

            callback(appConfig, message, response);
        });
    }
};