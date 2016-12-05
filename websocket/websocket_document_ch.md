# 使用websocket来作为网关通信

标签 : `websocket` `ajax`  
参照 :[websocket协议](http://45.32.248.21/static/document/websocket协议.html)  
      [原websock文档]()
---

![websocketlogo](http://45.32.248.21/static/img/ws.png)

### 1. 为什么要使用[websocket](http://baike.baidu.com/link?url=stMwJhjsRgfujP3CHjj2uZqXMNTpXGUb04oPsmYen9MvRkObCR-KFhawBLpY0kBO_unfmixtC2D_05iL3N6O4LDNYBmzLdngAGn-zUhkto_)?
#### 我们先来对比下 [websocket](http://baike.baidu.com/link?url=stMwJhjsRgfujP3CHjj2uZqXMNTpXGUb04oPsmYen9MvRkObCR-KFhawBLpY0kBO_unfmixtC2D_05iL3N6O4LDNYBmzLdngAGn-zUhkto_)与 [ajax](http://baike.baidu.com/item/ajax/8425)
### [ajax](http://baike.baidu.com/item/ajax/8425)
Ajax,即异步JavaScript和XML，是一种创建交互式网页应用的网页开发技术。通过在后台与服务器进行少量数据交换，Ajax可以使网页实现异步更新，这意味着可以在不重新加载整个网页的情况下，对网页的部分进行加载更新。
Ajax 是优点在于它在浏览器与web服务器之间使用异步数据传输（HTTP请求），不阻塞用户，核心对象是`XMLHTTPRequest`。通过这个对象，js可在不重新加载页面的情况下与web服务器交换数据。由于Ajax已流行这么多年，浏览器对它的兼容非常完美，并且很多成熟的框架可以直接使用,
ajax使用依赖ajax,portal中标准
#### [jQuery](http://baike.baidu.com/item/jQuery)使用实例:
```javascript    
	$.ajax({
    type: “POST”,
    url: “cgi/zcgi/networks//zwep_get_if_list”,
    data:”epd=” + ep,
    dataType: “xml”,
    async: false,
    success: function(xml) {
    $(xml).find(‘zwif’).each(function(){
    document.write(“zwif: (desc, id, name, ver, sec, unsec) = (“);
    document.write($(this).attr(‘desc’) + “, “);
    document.write($(this).attr(‘id’) + “, “);
    document.write($(this).attr(‘name’) + “, “);
    document.write($(this).attr(‘ver’) + “, “);
    document.write($(this).attr(‘sec’) + “, “);
    document.write($(this).attr(‘unsec’) + “)<br>”);
    /* set mlv switch to 50% */
    if ($(this).attr(‘id’) == “38”)
    {
    document.write(“sending ...<br>”);
    zwif_level_setup($(this).attr(‘desc’));
    zwif_level_set($(this).attr(‘desc’), “50”);
    }
    });
    },
    }
```
 在这里使用的post方式，另外一种方式就是get。那么，什么时候用get请求，什么时候用post请求呢？他们的区别又是什么呢？

   （1）get是把参数数据队列加到提交表单的ACTION属性所指的URL中，值和表单内各个字段一一对应，在URL中可以看到。Post是通过HTTP post机制，将表单内各个字段与其内容放置在HTML HEADER内一起传送到ACTION属性所指的URL地址，用户看不到这个过程。

   （2）对于get方式，服务器端用Request.QueryString获取变量的值，对于post方式，服务器端用Request.Form获取提交的变量。两种方式的参数都可以用Request获取。

   （3）get传送的数据量较小，不能大于2KB。Post传送的数据量较大，一般被默认为不受限制。但理论上，因服务器的不同而异。

   （4）get安全性非常低，post安全性较高。
 另外，get请求有以下特性：它会将数据添加到URL中，通过这种方式传递到服务器，通常利用一个？代表URL地址的结尾与数据参数的开端，后面的参数每一个数据参数以“名称=值”的形式出现，参数与参数之间利用一个连接符&来区分。

Post请求有以下特性：数据是放在HTTP主体重的，其组织方式不止一种，有&连接方式，也有分隔符方式，可隐藏参数，传递大批数据，比较方便。

总之，当提交表单的时候通常用post请求，当要传送一个较大的数据文件时用post请求；当传递的值只需用参数方式（不大于2KB）时，用get方式即可。
#### [Angular.JS](http://baike.baidu.com/item/AngularJS)使用实例:
    app.controller('registerCtrl',['$scope','$http',function($scope,$http){
     $scope.asave= function(){
         
         $http({
             method: 'POST',
             url: '/register',
             data: $.param($scope.formData), // pass in data as strings
             headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}  
         }).success(function (data) {
           if(data.errno==0x00){
              layer.msg('注册成功', {
               offset: 0,
               shift: 6
    });
### [websocket](http://baike.baidu.com/link?url=stMwJhjsRgfujP3CHjj2uZqXMNTpXGUb04oPsmYen9MvRkObCR-KFhawBLpY0kBO_unfmixtC2D_05iL3N6O4LDNYBmzLdngAGn-zUhkto_)
 WebSocket是HTML5一种新的协议，实现了`浏览器与服务器全双工通信`。其本质是先通过`HTTP/HTTPS`协议进行握手后创建一个用于交换数据的TCP连接，服务端与客户端通过此`TCP`连接进行实时通信。
WebSocket API最大的优点在于服务器和浏览器可以在给定的时间范围内的任意时刻，相互推送信息。在建立连接之后，服务器可以主动传送数据给浏览器。此外，服务器与浏览器之间交换的表头信息很小。WebSocket并不限于以Ajax（或XHR）方式通信，因为Ajax技术需要客户端发起请求，而WebSocket服务器和客户端可以相互推送信息。
在支持WebSocket的浏览器中，在创建Socket之后，可以通过`onopen`，`onmessage`，`onclose`，`onerror`四个事件实现对Socket的响应。
### 在项目中实例如下：
    <script type="text/javascript">
    var sock = null;
    var wsuri = "ws://127.0.0.1:8360/ws"; //请求的ws建立地址
    $(document).ready(function(){
    $.post("/ws",{
      url:wsuri,
    },
    function(data,status){
     
      wsuri = data; 
     
    });
    });

    window.onload = function() {  
        console.log("onload");
        sock = new WebSocket(wsuri);
        sock.onopen = function() { //websocket首次建立成功后触发的事件
            console.log("connected to " + wsuri);
        }
        sock.onclose = function(e) {
            console.log("connection closed (" + e.code + ")");
        }
        sock.onmessage = function(e) { //客户端从服务端接收到的数据
            console.log("message received: " + e.data);
      alert(e.data)
        }
    };
    
    function send() {  //绑定点击事件后触发的回调函数
        var msg = document.getElementById('message').value;
        sock.send(msg); //客户端发送过去的数据
    }

    </script>
 此实例中，首先申请一个WebSocket对象，参数是需要连接的服务器端地址，同HTTP协议使用HTTP://开头一样，WebSocket协议的URL使用WS://开头，另外安全的WebSocket协议使用WSS://开头。实例中onopen事件，即当WebSocket创建成功时执行dataSend（）函数，其中dataSend（）函数是将信息发送到服务器端。当服务器收到客户端的信息，会发送相应的信息到客户端。当客户端收到信息时，会触发onmessage事件，数据信息存于simuRealData中。当客户端收到服务器发来的关闭连接请求时，浏览器会触发onclose事件，当出现连接、处理、接收、发送数据失败的时候就会触发onerror事件。由此，我们可以看出所以的操作都是采用事件的方式触发，如此就不会阻塞UI，使得UI更快的响应时间，得到更好的用户体验。
### **说明**   
>再者说利用HTTP协议请求控制设备时，设备状态发生改变后，其它用户无法得知设备状态已经改变，因此我们决定在portal中使用websocket替换部分采用基于http协议实现的web api即ajax并且集成到我们的smartgateway项目中来

### 2.1 websocket原生API

### Methods

name        | arguments                                              | description
------------|--------------------------------------------------------|------------
$websocket <br>_constructor_ | url:String                              | Creates and opens a [WebSocket](http://mdn.io/API/WebSocket) instance. <br>`var ws = $websocket('ws://foo');`
send        | data:String,Object returns                             | Adds data to a queue, and attempts to send if socket is ready. Accepts string or object, and will stringify objects before sending to socket.
onMessage   | callback:Function <br>options{filter:String,RegExp, autoApply:Boolean=true} | Register a callback to be fired on every message received from the websocket, or optionally just when the message's `data` property matches the filter provided in the options object. Each message handled will safely call `$rootScope.$digest()` unless `autoApply` is set to `false in the options. Callback gets called with a [MessageEvent](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent?redirectlocale=en-US&redirectslug=WebSockets%2FWebSockets_reference%2FMessageEvent) object.
onOpen      | callback:Function                                      | Function to be executed each time a socket connection is opened for this instance.
onClose     | callback:Function                                      | Function to be executed each time a socket connection is closed for this instance.
onError     | callback:Function                                      | Function to be executed each time a socket connection has an Error for this instance.
close       | force:Boolean:_optional_                               | Close the underlying socket, as long as no data is still being sent from the client. Optionally force close, even if data is still being sent, by passing `true` as the `force` parameter. To check if data is being sent, read the value of `socket.bufferedAmount`.

### Properties
name               | type             | description
-------------------|------------------|------------
socket             | window.WebSocket | [WebSocket](http://mdn.io/API/WebSocket) instance.
sendQueue          | Array<function>  | Queue of `send` calls to be made on socket when socket is able to receive data. List is populated by calls to the `send` method, but this array can be spliced if data needs to be manually removed before it's been sent to a socket. Data is removed from the array after it's been sent to the socket.
onOpenCallbacks    | Array<function>  | List of callbacks to be executed when the socket is opened, initially or on re-connection after broken connection. Callbacks should be added to this list through the `onOpen` method.
onMessageCallbacks | Array<function>  | List of callbacks to be executed when a message is received from the socket. Callbacks should be added via the `onMessage` method.
onErrorCallbacks   | Array<function>  | List of callbacks to be executed when an error is received from the socket. Callbacks should be added via the `onError` method.
onCloseCallbacks   | Array<function>  | List of callbacks to be executed when the socket is closed. Callbacks should be added via the `onClose` method.
readyState         | Number:readonly  | Returns either the readyState value from the underlying WebSocket instance, or a proprietary value representing the internal state of the lib, e.g. if the lib is in a state of re-connecting.
initialTimeout     | Number           | The initial timeout, should be set at the outer limits of expected response time for the service. For example, if your service responds in 1ms on average but in 10ms for 99% of requests, then set to 10ms.
maxTimeout         | Number           | Should be as low as possible to keep your customers happy, but high enough that the system can definitely handle requests from all clients at that sustained rate.


### 2.2 目前我们Bitbucket的代码目录
> [CloudClient](https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)  
[CmdQueue](https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)  
[ComandTask](https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)  
[DataBaSe](https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)  
[DebugOut](https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)  
[Document](https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)  
[HomeServer](https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)  
[TestServer](https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)  
[NodeClient](https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)  
[NodePro](https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)

## 2.3 目前TestServer下已有websocket服务
>修改更改`WebSocket`实现客户端和服务端的双通信

### 3.具体命令（API）
目前我们实现的具体命令有以下`七条`:  

### 3.1 图表

执行动作    | 具体参数                                                                                                            | 服务端回应
------------|------------------------------------------------------------------------------------------------------------------- ---|------------
扫描网关    | {"action": "REQUEST", "cmd": "discovery"}                                                                            |  {"error":0,"action":"REPLY","data":[{"gatewayip":"192.168.10.169"}]}
添加节点    | {"action": "REQUEST", "cmd": "addnode", "data": {"nodeid":1}}                                                        | 
删除节点    | {"action": "REQUEST", "cmd": "removenode", "data": {"nodeid":1}}                                                     | Register a callback to be fired on every message received from the websocket, or optionally just when the message's `data` property matches the filter provided in the options object. Each message handled will safely call `$rootScope.$digest()` unless `autoApply` is set to `false in the options. Callback gets called with a [MessageEvent](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent?redirectlocale=en-US&redirectslug=WebSockets%2FWebSockets_reference%2FMessageEvent) object.
获得开关    | {"action": "REQUEST", "cmd": "getnodelist", "data":{"ip":"192.168.10.169","psk":"123456789012345678901234567890AA"}} | Function to be executed each time a socket connection is opened for this instance.
打开开关    | {"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":6, "op":"get", "para":""}}                             | Function to be executed each time a socket connection is closed for this instance.
关闭开关    | {"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":6, "op":"set", "para":"on"}}                           | Function to be executed each time a socket connection has an Error for this instance.
复位网络    | {"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":6, "op":"set", "para":"off"}}                          | Close the underlying socket, as long as no data is still being

### 3.2 网页中效果