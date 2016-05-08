/**
 * Created by SkyAo on 16/5/8.
 *
 * 均衡轮询服务器，返回服务器编号
 */
var count = 0;

module.exports = function(serversLength) {
    count++;
    console.log(count);
    return function() {
        return count % serversLength;
    };
};