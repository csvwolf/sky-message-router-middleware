/**
 * Created by SkyAo on 16/3/27.
 */
// Todo: 第一版目标: 首先无视加密技术,普通的跑通整个流程(要求无错)
var http = require('http');
var querystring = require('querystring');
var events = require('events').EventEmitter();

isEmpty = function(object) {
    var elem;
    for (elem in object) {
        if (object.hasOwnProperty(elem)) {
            return true;
        }
    }
    return false;
};

function Message(id, post) {
    this.post = post;
    this.id = id;
}

var app = http.createServer(function(request, response) {
    var post = '';

    response.writeHead(200, {'Content-Type': 'text/plain'});

    request.on('data', function(chunk) {
        post += chunk;
    });

    request.on('end', function() {
        post = querystring.parse(post);
        //console.log(post);
        if (isEmpty(post)) {

            console.log(post, Boolean(post));
            connList.forEach(function(elem) {
                elem.send(JSON.stringify(post));
            });
        }

        // 从pool 中 取到值并返回
        response.end();
    });
});

app.listen(3000);

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8888});

var connList = [];
var respondPool = [];

wss.on('connection', function(ws) {
   ws.on('message', function incoming(message) {
       respondPool.push(message);
       events.emit('poolInserted');
       console.log('received: %s', message);
   });

    connList.push(ws);

    //ws.send('something');
});
