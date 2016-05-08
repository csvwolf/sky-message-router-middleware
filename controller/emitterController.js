/**
 * Created by SkyAo on 16/5/8.
 */
exports.add = function(appConfig, msg, response) {
    console.log('EmitterController', msg);
    appConfig.eventEmitter.addListener('poolInserted', function() {
        var self = this._events.poolInserted;
        //console.log(self);
        console.log(msg);
        appConfig.redisClient.hgetall('msg:' + msg.id, function(err, result) {
            console.log(err);
            console.log(result);
            if (result) {
                console.log('success');
                response.write(JSON.stringify(result));
                response.end();

                appConfig.redisClient.del('msg:' + msg.id, function(err, reply) {
                    //console.log(reply);
                });

                appConfig.eventEmitter.removeListener('poolInserted', self);
            } else {
                console.log('error');
            }
        });
    });
};