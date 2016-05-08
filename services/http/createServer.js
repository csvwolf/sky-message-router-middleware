/**
 * Created by SkyAo on 16/5/5.
 *
 * httpServer的回调，提供了后续处理的模板
 */
var Post = require('../../classes/post');

/**
 *
 * @param onFunction 处理request数据录入时的内容
 * @param endFunction 处理结束时的操作
 * @returns {Function}
 */
module.exports = function(onFunction, endFunction) {
    return function (request, response) {
        var header = {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
            },
            content = new Post();

        response.writeHead(200, header);

        request.on('data', onFunction(request, response, content));

        request.on('end', endFunction(request, response, content));
    };
};

