# Sky_AnsweringSystemMiddleware

## 介绍

一个开源的消息转发中间件，前端使用门槛极低，前端使用HTTP交互，后端使用WebSocket。

### 使用技术
- Node.js
- Redis
- WebSocket

### 功能说明

命令扩展：根据传入参数的不同可以自行扩展不同的内容。

可跨域操作：前端可以通过任何域名发起正常请求。

轮询机制：轮询发给每一个可用的后端。

日志记录：正在准备中。

## 安装说明
请保证您的电脑有Node.js v5.3.0与Redis 3.0.6（其余版本效果未知）。

在目录下运行`npm install`安装完成依赖，通过`redis-server`启动redis服务器（不需要密码），之后运行`node index.js`即可。

## 对接说明
对接分为前端和后端，可以独立进行对接和测试步骤。

### 前端
前端为HTTP，默认接口为`3000`，可以自行修改。

前端请保证发送的为`POST`请求，发送数据符合以下格式，否则无法获取到结果。（只要返回都返回HTTP状态码为200，请根据具体字段判断情况）。

前端发送样例：

```
POST / HTTP/1.1
Content-Type: text/plain
Host: localhost:3000
Connection: close
User-Agent: Paw/2.3.3 (Macintosh; OS X/10.11.4) GCDHTTPRequest
Content-Length: 37

type=ass&content=2333&command=message
```

前端返回值样例：

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,OPTIONS,POST,HEAD
Access-Control-Allow-Headers: Origin, Content-Type,Content-Length,Authorization, Accept,X-Requested-With
Content-Type: application/json
Date: Wed, 25 May 2016 14:23:43 GMT
Connection: close
Transfer-Encoding: chunked

{"content":"2333","error":"200"}
```

发送数据包格式：

| 字段 | 类型 | 说明 | 
| ------------- |:-------------:| :-----:|
| type | string | 请求已注册的服务器内容类型 |
| command | string | 发送的消息类型 | | content | string | 正文内容 |
| encrypt | boolean | 决定是否加密传输（该字段暂时废弃，不用传输亦可）| 
前端command列表：

| 命令 | 说明 |
| ------------- |:-------------:|
| message | 发送的为正文消息类型 |


接收数据包格式：

| 字段 | 类型 | 说明 |
| ------------- |:-------------:|:-----:|
| error | string | 返回的状态码 |
| content | string | 返回的正文内容 |
| time | timestamp | 返回的时间戳，暂时不提供，试情况添加 |

状态码详解：


| 状态码 | 说明 |
| ------------- |:-------------:|
| 200 | 正常的返回值 |
| 401 | 必要的传入字段不完整 |
| 403 | 没有正文内容导致的数据格式不正确 |
| 404 | 没有找到任何可用服务器 |
| 501 | 响应超时，服务器正忙 |

### 后端
后端使用WebSocket，默认端口为`8888`，可修改，后端处理时均为json格式。

示例后端程序，采用Python2.7 + `WebSocket-Client`包。

```
from websocket import create_connection
import json
ws = create_connection('ws://localhost:8888')
print 'Sending "Hello World"'
initMessage = {'type': 'ass', 'descrpiton': 'hello world', 'command': 'new', 'content': None}
ws.send(json.dumps(initMessage))
times = 0
while True:
    times += 1
    result = ws.recv()
    print 'Received "%s"' % result
    result = json.loads(result)
    result['command'] = 'message'
    ws.send(json.dumps(result))
```

接收包数据格式：

如果是正常接收，则获取到的数据形如：

```
{"content":"2333","type":"ass","id":11236,"command":"message","time":1464327137745}
```

content: 接收到的正文内容
type: 该客户端请求类型
id: 客户端请求编号
command:message 表示传入的是正文类型，请求服务端处理
time: 请求发出的时间戳

如果发送错误的数据，则会返回：

```
{"command":"error","content":"Error, Not Standard Data Format(4002)","time":1464326848208}
```

command: error 表示从后端发出的内容错误
content: 具体的错误类型
time: 发送消息的时间戳

后端发送包格式：

后端需要按照两步进行创建才可以注册成功。

首先先发送create：
```
{'type': 'ass', 'descrpiton': 'hello world', 'command': 'new', 'content': None}
```

type: 服务器注册的类型，前端根据此类型请求对应后端服务器
command: new 表示注册一个服务到中间件
descrpition: 后端描述说明
content: 可留空

然后处理数据并返回即可：

```
{ content: '2333',
  command: 'message',
  type: 'ass',
  id: 11236,
  time: 1464327137745 }
```

command: 需要返回到前端的为message，如果需要返回给中间件可定义为error（暂未定义，日后会添加）
content: 正文内容
type: 中间件内容原样传出即可
id: 中间件传入内容原样传出即可
time: 返回响应时间戳
