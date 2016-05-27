/**
 * Created by SkyAo on 16/5/8.
 *
 * Message类
 *
 * 对消息进行处理
 */
var Command = require('./command');
module.exports = function(msg, wsServer, appConfig, ws) {
    //console.log(msg);
    var Message = function() {
        this.run = function() {
            if (msg.content && msg.id) {
                appConfig.redisClient.HMSET('msg:' + msg.id, msg, function() {
                    appConfig.log.info('插入Redis数据：', msg);
                    appConfig.eventEmitter.emit('poolInserted' + msg.id);        // 通知：已经插入redis，提醒http进行后续操作
                });
            } else {
                appConfig.log.info('插入Redis数据失败：NoContent:', msg);
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