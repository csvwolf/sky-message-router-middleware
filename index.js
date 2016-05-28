/**
 * Created by SkyAo on 16/3/27.
 */

var appConfig = require('./core/appConfig')(__dirname),
    httpConfig = require('./core/httpConfig'),
    wsServer = appConfig.webSocketServer.create(appConfig, appConfig.webSocketServer.onMessage);

appConfig.httpServer.create(appConfig, httpConfig, wsServer);
appConfig.log.info('Service start!');