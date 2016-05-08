/**
 * Created by SkyAo on 16/4/16.
 */
var http = require('http');
var querystring = require('querystring');

module.exports = function(config, callback) {
    var app = http.createServer(function(request, response) {
        var post = '';

        response.writeHead(200, {'Content-Type': 'text/plain'});

        request.on('data', function(chunk) {
            post += chunk;
        });

        request.on('end', function() {
            var msg = null;
            post = querystring.parse(post);
            //console.log(post);
            if (config.objectMethods.isEmpty(post)) {
                msg = new config.Message(post, config.client, function() {

                    //console.log(post);

                    var length;
                    var targetWs;

                    while (1) {
                        //console.log(wsSet);
                        try {
                            length = config.objectMethods.getObjectLength(config.websocketServer.getWSSet()[post.type]);
                            console.log(length);
                            targetWs = config.objectMethods.getSpecificElementOfObj(config.websocketServer.getWSSet()[post.type], msg.id % length);
                            console.log(typeof targetWs);
                            targetWs.elem.ws.send(JSON.stringify(msg));
                        } catch (e){
                            if (length == 0) {
                                console.log('there is no server now');
                                break;
                            } else {
                                delete config.websocketServer.getWSSet()[targetWs.key];
                                console.log('delete the current server in the list');
                            }
                            console.error(e);
                            continue;
                        }

                        break;
                    }
                    //connList.forEach(function(elem) {
                    //    //console.log(JSON.stringify(msg));
                    //    elem.send(JSON.stringify(msg));
                    //});

                    config.eventEmitter.addListener('poolInserted', function() {
                        console.log('testing');
                        var self = this._events.poolInserted;
                        //console.log(self);
                        config.client.hgetall('msg:' + msg.id, function(err, result) {
                            console.log(err);
                            console.log(result);
                            if (result) {
                                console.log('success');
                                response.write(JSON.stringify(result));
                                response.end();

                                config.client.del('msg:' + msg.id, function(err, reply) {
                                    //console.log(reply);
                                });

                                config.eventEmitter.removeListener('poolInserted', self);
                            } else {
                                console.log('error');
                            }


                        });
                    });
                });
                //console.log(post, Boolean(post));

            }

            // 从pool 中 取到值并返回


        });
    });

    app.listen(3000);
};
