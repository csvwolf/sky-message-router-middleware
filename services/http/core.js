/**
 * Created by SkyAo on 16/5/7.
 *
 * http核心模块，载入并启动http的函数
 */
var serverSelector = require('../../controller/serverSelectorController'),
    emitter = require('../../controller/emitterController').add;


module.exports = function(appConfig, httpConfig, wsServer) {
    var httpServer = appConfig.httpServer,
        app = httpServer.server.createServer(
            httpServer.createDetail(
                onFunction(httpServer), endFunction(httpServer, appConfig, wsServer)
            )
        );

    app.listen(httpConfig.port);

};

/**
 * 设置response处理
 * @param httpServer
 * @returns {Function}
 */
function onFunction (httpServer) {
    return function(request, response, content) {
        //console.log(request);
        //console.log(response);
        return function(chunk) {
            //console.log('chunk', chunk);
            content.addContent(chunk);
        }
    }
}

/**
 * 处理结束操作的函数
 * @param httpServer
 * @param appConfig
 * @param wsServer
 * @returns {Function}
 */
function endFunction(httpServer, appConfig, wsServer) {
    return function (request, response, content) {
        response.setTimeout(30000, function() {
            response.end(JSON.stringify({'error': '501', 'content': 'Servers are busy!'}));
        });
        return function() {
            //console.log(content);
            var post = httpServer.queryString.parse(content.content);

            serverSelector(appConfig, post, wsServer, response, emitter);
        }
    }
}
