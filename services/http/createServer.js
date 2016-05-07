/**
 * Created by SkyAo on 16/5/5.
 */
var Post = require('../../classes/post');

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

