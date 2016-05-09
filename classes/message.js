/**
 * Created by SkyAo on 16/4/10.
 *
 * Message对象
 */
/*var redis = require('redis');
var client = redis.createClient('6379', '127.0.0.1');*/

/**
 * Message 对象, 创建同时counter自增
 * id: Message编号
 * post: Message内容
 * @param post 正文内容
 * @param client redis连接项
 * @param callback 执行id自增赋值后执行
 */
module.exports = function Message(post, client, callback) {
    this.content = post.content;
    this.type = post.type;
    this.encrypt = post.encrypt;
    var self = this;
    // 在Redis里自增计数并且赋值给id
    client.incr('msgCounter', function(error, result) {
        if (error) {
            console.log('error');
        } else {
            self.id = result;
            //console.log(result);
            callback(self);
        }
    });
};