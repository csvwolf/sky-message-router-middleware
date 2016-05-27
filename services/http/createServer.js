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
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,OPTIONS,POST,HEAD',
            "Access-Control-Allow-Headers": "Origin, Content-Type,Content-Length,Authorization, Accept,X-Requested-With",
            'Content-Type': 'application/json'
            };

        // 判断是否为跨域所引发的OPTIONS 如果是 则过滤掉该请求
        if (request.method !== 'POST') {
            //console.log('hello');
            response.writeHead(200, header);
            request.on('data', function() {
            //    console.log('data');
            });
            request.on('end', function() {
            //    console.log('endingOPTIONS');
                response.end('');
            });
            return;
        }

         var content = new Post();



        //console.log(content);

        response.writeHead(200, header);

        request.on('data', onFunction(request, response, content));

        request.on('end', endFunction(request, response, content));
    };
};

