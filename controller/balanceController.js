/**
 * Created by SkyAo on 16/5/8.
 *
 * 均衡轮询服务器，返回服务器编号
 */
module.exports = function(serversLength) {
    var count = 0;

    return (function() {
        return count % serversLength;
    })();
};