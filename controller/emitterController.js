/**
 * Created by SkyAo on 16/5/8.
 *
 * 存入Redis后的事件的后续处理
 */
exports.add = function(appConfig, msg, response) {
    var post = {};
    appConfig.log.info('EmitterController', msg);

    appConfig.eventEmitter.addListener('poolInserted' + msg.id, function() {
        var self = this._events['poolInserted' + msg.id];   // 获取事件本身
        //console.log(self);
        appConfig.redisClient.hgetall('msg:' + msg.id, function(err, result) {
            if (result) {
                try {
                    appConfig.eventEmitter.removeListener('poolInserted' + msg.id, self);    // 删除监听，不再对此做出操作
                    appConfig.log.info('删除监听:' + msg.id, msg);
                } catch (e) {
                    appConfig.log.warn('删除监听error', msg);
                    appConfig.log.warn(e);
                }

                //console.log(self);

                post.content = result.content;
                post.error = '200';
                // 返回值给HTTP
                response.end(JSON.stringify(post));

                appConfig.redisClient.del('msg:' + msg.id, function(err, reply) {
                    //console.log(reply);
                });

            } else {
                appConfig.log.info('no result for ', msg);
            }
        });
    });
};