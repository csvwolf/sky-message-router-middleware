/**
 * Created by SkyAo on 16/5/3.
 *
 * Middleware 配置文件
 */

module.exports = (function() {
    var
        // Redis-Server相关
        redisConfig = require('./redisConfig'),
        redis = require('redis'),
        client = redis.createClient(redisConfig.port, redisConfig.address),
        // 事件模拟
        events = require('events'),
        eventEmitter = new events.EventEmitter(),
        // HTTPServer
        http = require('http'),
        querystring = require('querystring'),
        createHTTPServer = require('../services/http/createServer'),
        createHTTP = require('../services/http/core'),
        // WebSocketServer
        wsConfig = require('./wsConfig'),
        WebSocketServer = require('ws').Server,
        wss = new WebSocketServer(wsConfig),
        onMessage = require('../services/websocket/messageCallback'),
        createWS = require('../services/websocket/createServer');

    return {
        redisClient: client,
        eventEmitter: eventEmitter,
        httpServer: {
            server: http,
            queryString: querystring,
            createDetail: createHTTPServer,
            create: createHTTP
        },
        webSocketServer: {
            server: wss,
            onMessage: onMessage,
            create: createWS
        }
    }
})();