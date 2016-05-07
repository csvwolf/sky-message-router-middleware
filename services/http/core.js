/**
 * Created by SkyAo on 16/5/7.
 */

module.exports = function(appConfig, httpConfig) {
    var httpServer = appConfig.httpServer,
        app = httpServer.server.createServer(
            httpServer.createDetail(
                onFunction(httpServer), endFunction(httpServer)
            )
        );

    app.listen(httpConfig.port);

};

function onFunction (httpServer) {
    return function(request, response, content) {
        return function(chunk) {
            content.addContent(chunk);
        }
    }
}

function endFunction(httpServer) {
    return function (request, response, content) {
        return function() {
            var post = httpServer.queryString.parse(content.content);
            console.log(post);
            response.end();
            content = null;
        }
    }
}
