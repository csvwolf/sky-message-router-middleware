/**
 * Created by SkyAo on 16/5/8.
 *
 * 存入Redis后的事件的后续处理
 */
exports.add = function(appConfig, msg, response) {
    console.log('EmitterController', msg);

    appConfig.eventEmitter.addListener('poolInserted' + msg.id, function() {
        var self = this._events['poolInserted' + msg.id];   // 获取事件本身
        //console.log(self);
        appConfig.redisClient.hgetall('msg:' + msg.id, function(err, result) {
            if (result) {
                try {
                    appConfig.eventEmitter.removeListener('poolInserted' + msg.id, self);    // 删除监听，不再对此做出操作
                } catch (e) {
                    console.log('emitterController: delete err');
                    console.log(e);
                }

                //console.log(self);

                response.end(JSON.stringify(result));

                appConfig.redisClient.del('msg:' + msg.id, function(err, reply) {
                    //console.log(reply);
                });

            } else {
                console.log('error');
            }
        });
    });
};