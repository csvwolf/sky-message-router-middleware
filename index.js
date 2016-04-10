/**
 * Created by SkyAo on 16/3/27.
 */
// Todo: 第一版目标: 首先无视加密技术,普通的跑通整个流程(要求无错)
var http = require('http');
var querystring = require('querystring');
var events = require('events');
var redis = require('redis');
var client = redis.createClient('6379', '127.0.0.1');

var eventEmitter = new events.EventEmitter();

var wsCounter = 0;
var wsSet = {};

isEmpty = function(object) {
    var elem;
    for (elem in object) {
        if (object.hasOwnProperty(elem)) {
            return true;
        }
    }
    return false;
};

getObjectLength = function(object) {
    var length = 0,
        elem;
    for (elem in object) {
        if (object.hasOwnProperty(elem)) {
            length++;
        }
    }

    return length;
};

getSpecificElementOfObj = function(object, index) {
    var elem,
        counter = 0,
        result = {};
    console.log(object);
    for (elem in object) {
        console.log(elem);
        if (object.hasOwnProperty(elem)) {
            if (counter++ == index) {
                result['elem'] = object[elem];
                result['key'] = elem;
            }
        }
    }

    return result;
};

function Message(post, callback) {
    this.post = post;
    var self = this;
    client.incr('msgCounter', function(error, result) {
        if (error) {
            console.log('error');
        } else {
            self.id = result;
            //console.log(result);
            callback();
        }
    });
}

client.set('msgCounter', 0, function(error, result) {
    if (error) {
        console.log('error');
    } else {
        console.log('counter initialize');
    }
});

client.on('ready', function(err) {
    console.log('ready');
});

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
        if (isEmpty(post)) {
            msg = new Message(post['hello'], function() {

                var length;
                var targetWs;

                while (1) {
                    //console.log(wsSet);
                    try {
                        length = getObjectLength(wsSet);
                        console.log(length);
                        targetWs = getSpecificElementOfObj(wsSet, msg.id % length);
                        console.log(typeof targetWs);
                        targetWs.elem.ws.send(JSON.stringify(msg));
                    } catch (e){
                        if (length == 0) {
                            console.log('there is no server now');
                            break;
                        } else {
                            delete wsSet[targetWs.key];
                            console.log('delete the current server in the list');
                        }
                        //console.log(e);
                        continue;
                    }

                    break;
                }
                //connList.forEach(function(elem) {
                //    //console.log(JSON.stringify(msg));
                //    elem.send(JSON.stringify(msg));
                //});

                eventEmitter.addListener('poolInserted', function() {
                    console.log('testing');
                    var self = this._events.poolInserted;
                    console.log(self);
                    client.hgetall('msg:' + msg.id, function(err, result) {
                        console.log(result);
                        if (result) {
                            console.log('success');
                            response.write(JSON.stringify(result));
                            response.end();

                            client.del('msg:' + msg.id, function(err, reply) {
                                //console.log(reply);
                            });

                            eventEmitter.removeListener('poolInserted', self);
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

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8888});

wss.on('connection', function(ws) {
    wsSet['ws' + wsCounter] = {};
    wsSet['ws' + wsCounter] ['id'] = wsCounter;
    wsSet['ws' + wsCounter]['ws'] = ws;
    wsCounter++;

   ws.on('message', function incoming(message) {
       //console.log('msg', message);

       var msg = JSON.parse(message);
       //console.log(events);
       client.HMSET('msg:' + msg.id, msg, function() {
           eventEmitter.emit('poolInserted');
       });
       //console.log('received: %s', message);
   });


    //ws.send('something');
});
