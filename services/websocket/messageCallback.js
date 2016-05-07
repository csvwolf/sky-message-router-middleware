/**
 * Created by SkyAo on 16/5/7.
 */
module.exports = function(wsCounter, wsSet) {
    return function(message) {
        var msg = JSON.parse(message);
        console.log(msg);
    }
};