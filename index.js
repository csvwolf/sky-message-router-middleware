/**
 * Created by SkyAo on 16/3/27.
 */
// Todo: 第一版目标: 首先无视加密技术,普通的跑通整个流程(要求无错)

var appConfig = require('./core/appConfig'),
    httpConfig = require('./core/httpConfig'),
    wsServer = appConfig.webSocketServer.create(appConfig, appConfig.webSocketServer.onMessage);

appConfig.httpServer.create(appConfig, httpConfig, wsServer);
