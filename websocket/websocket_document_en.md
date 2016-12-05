# as gateway communication by using websocket


Tags: ` websocket ` ` ajax `
Reference: [websocket agreement] (http://45.32.248.21/static/document/websocket protocol. HTML)
[original websock document] (http://45.32.248.21/static/document/websocket.html)
-- -- --


![websocketlogo] (http://45.32.248.21/static/img/ws.png)


# # # 1. Why use [websocket] (http://baike.baidu.com/link?url=stMwJhjsRgfujP3CHjj2uZqXMNTpXGUb04oPsmYen9MvRkObCR-KFhawBLpY0kBO_unfmixtC2D_05iL3N6O4LDNYBmzLdngAGn-zUhkto_)?
Comparing to the # # # # let's [websocket] (http://baike.baidu.com/link?url=stMwJhjsRgfujP3CHjj2uZqXMNTpXGUb04oPsmYen9MvRkObCR-KFhawBLpY0kBO_unfmixtC2D_05iL3N6O4LDNYBmzLdngAGn-zUhkto_) and [ajax] (http://baike.baidu.com/item/ajax/8425)
# # # (ajax) (http://baike.baidu.com/item/ajax/8425)
Ajax, or asynchronous JavaScript and XML, is a web development technology to create interactive web applications.By a small amount of data exchange with the server in the background, Ajax can make web asynchronous update, this means you can under the condition of without reloading the whole page, to update parts of web pages to load.
Ajax is advantage is that it is in between the browser and the web server using asynchronous data transfer (HTTP requests), don't block the user, the core object is ` XMLHTTPRequest `.This object by js and without reloading the page exchange data with a web server.Because Ajax have been popular for so many years, the browser compatibility of it is very perfect, and many mature framework can be used directly,
Ajax use rely on ajax, standard in the portal
# # # # / jQuery (http://baike.baidu.com/item/jQuery) using the instance:
` ` ` javascript
$. Ajax ({
Type: "POST",
Url: "cgi/zcgi/networks / / zwep_get_if_list",
Data: epd "=" + ep,
DataType: "XML",
Async: false,
Success: the function (XML) {
$(XML). The find (' zwif). Each (function () {
Document. The write (" zwif: (desc, id, name, ver, the SEC, unsec) = (");
Document. The write ($(this). Attr (" desc ") + ", ");
Document. The write ($(this). Attr (" id ") + ", ");
Document. The write ($(this). Attr (' name ') + ", ");
Document. The write ($(this). Attr (" ver ") + ", ");
Document. The write ($(this). Attr (" SEC ") + ", ");
Document. The write ($(this). Attr (' unsec) + "< br >");
* / / * set MLV switch to 50%
If ($(this). Attr (" id ") = = "38")
{
Document. The write (" sending... < br > ");
Zwif_level_setup ($(this). Attr (" desc "));
Zwif_level_set ($(this). Attr (" desc "), "50");
}
});
},
}
` ` `
Use way of post here, another way is to get.So, when using a get request, when using a post request?What is the difference between them?


(1) the get is add parameter data queue to submit the form referred to in the ACTION attribute in the URL, values, and in individual fields in the form one to one correspondence, can be seen in the URL.Post is through HTTP Post mechanism, place in individual fields in the form and content in the HTML HEADER transmitted to the ACTION attribute in a URL, the user can't see the process.


(2) for the get method, the server with the Request. The QueryString to obtain the value of a variable, for the post, the server with the Request. The variables Form for submission.The parameters of the two ways can use the Request access.


(3) get a comparatively small amount of data transmission, not larger than 2 KB.Post sent the data volume is larger, generally is not restricted by default.But in theory, because of the server.


(4) get the security is very low, post security is higher.
In addition, a get request has the following features: it can add data to the URL, this way to transfer to the server, usually using a?On behalf of the end of the URL address and the beginning of data parameters, the back of the parameters of each data in the form of "name = value", parameters and use of a connector between & to distinguish.


Post request has the following features: data is placed on the HTTP body weight, its organization is more than one, have & connection way, also have a way of separator, can conceal parameters, transfer large quantities of data, more convenient.


In a word, when submitting the form usually use a post request, when to send a large data file with the post request;When the value that need to use parameter way (no more than 2 KB), using the get method.
# # # # [presents. JS] (http://baike.baidu.com/item/AngularJS) using the instance:
App. Controller (' registerCtrl '[' $scope', '$HTTP', function ($scope, $HTTP) {
$scope. Asave = function () {
         
({$HTTP
Method: "POST",
Url: '/ register',
Data: $param ($scope. FormData), / / pass in data as strings
Headers: {' the content-type ':' application/x - WWW - form - urlencoded;Charset = utf-8 '}
{}). Success (function (data)
If (data. The errno = = 0 x00) {
Layer. MSG (' registration '{
Offset: 0,
Shift: 6
});
# # # [websocket] (http://baike.baidu.com/link?url=stMwJhjsRgfujP3CHjj2uZqXMNTpXGUb04oPsmYen9MvRkObCR-KFhawBLpY0kBO_unfmixtC2D_05iL3N6O4LDNYBmzLdngAGn-zUhkto_)
WebSocket is it a new protocol for full-duplex communication ` ` browser and server.Its essence is through HTTP/HTTPS ` ` agreement after shaking hands to create a TCP connection is used to exchange data, the client and the server through the real-time communication ` ` TCP connection.
WebSocket API's biggest advantage is that the server and the browser can at any time within a given time, push information to each other.After the connection is established, the server can take the initiative to send data to the browser.In addition, the header information exchanged between the server and the browser is very small.WebSocket is not limited to, communication in Ajax (or XHR) way, because the Ajax technology requires the client request, and the WebSocket server and the client can push information to each other.
In support WebSocket browsers, after creating the Socket, can pass ` onopen `, ` onmessage `, ` onclose `, ` onerror ` four events of the response of the Socket.
# # # in the project instance is as follows:
< script type = "text/javascript" >
Var sock = null;
Var wsuri = "ws: / / 127.0.0.1:8360 / ws";/ / request ws building address
The $(document). Ready (function () {
{$.post ("/ws ",
Url: wsuri,
},
Function (data, status) {
     
Wsuri = data; 
     
});
});


Window. The onload = function () {
The console. The log (onload "");
The sock = new WebSocket (wsuri);
The sock. Onopen = function () {/ / websocket after a successful trigger events set up for the first time
The console. The log (" connected to "+ wsuri);
}
The sock. Onclose = function (e) {
The console. The log (" connection closed (ode of e.c. with our fabrication: "+ +") ");
}
The sock. Onmessage = function (e) {/ / the client from the server receives the data
The console. The log (" message received: "+ e.d ata);
Alert (e.d ata)
}
};
    
The function the send () {/ / bind click event triggered after the callback function
Var MSG = document. GetElementById (' message '). The value;
The sock. Send (MSG);/ / the client sends data in the past
}


< / script >
This instance, the first to apply for a WebSocket object, parameter is needed to connect the server address, like HTTP protocol using HTTP:// at the beginning, the WebSocket protocol using the URL: / / at the beginning, additional security WebSocket protocol use WSS: / / at the beginning.Instance onopen event, that is, when the WebSocket to create successful execution dataSend () function, including dataSend is () function sends information to the server.When the server receives the client's information, will send relevant information to the client.When the client receives the information, will trigger the onmessage event, in simuRealData data information.When the client receives from the server closes the connection request, the browser will trigger the onclose event, when there is a connection, processing, receive and send data fail will trigger the onerror event.Thus, we can see that all operations are adopt the way of event trigger, so will not block the UI, making UI, faster response time, get a better user experience.
# # # * * that * *
> then again using the HTTP protocol request control equipment, equipment status after the change, other users not privy to the device status has been changed, so we decided to use in portal websocket to replace part of the web API that is based on HTTP protocol implementation ajax and integrated into our smartgateway programmes
### 2.1 Websocket native API

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

# # # 2.2 we Bitbucket code directory
> (CloudClient) (https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)
(CmdQueue) (https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)
(ComandTask) (https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)
(database) (https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)
(DebugOut) (https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)
(documents) (https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)
(HomeServer) (https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)
(TestServer) (https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)
(NodeClient) (https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)
(NodePro) (https://bitbucket.org/portus/smartgateway/src/16934f2aead5bc28ba08c4a01253abac4f7d99c2?at=master)




# # 2.3 websocket services under the present TestServer
> modify change WebSocket implementation the client and server communication

# # # 3. The specific command (API)
At present, we realize the specific command has the following ` seven ` :


# # # 3.1 charts
To perform an action | | server response to specific parameters
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- - | -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- - | -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
Scanning gateway | {" action ":" REQUEST ", "CMD" : "discovery"} | {" error ": 0," action ":" REPLY ", "data" : [{" gatewayip ":" 192.168.10.169 "}]}
Add node | {" action ":" REQUEST ", "CMD" : "invoke the", "data" : {" nodeid ": 1}} | {" error" : 0, "action" : "REPLY", "data" : [{" gatewayip ":" 192.168.10.169 "}]}
Remove nodes | {" action ":" REQUEST ", "CMD" : "removenode", "data" : {" nodeid ": 1}} | {" error" : 0, "action" : "REPLY", "data" : [{" gatewayip ":" 192.168.10.169 "}]}
Get node list | {" action ":" REQUEST ", "CMD" : "getnodelist", "data" : {" IP ":" 192.168.10.169 ", "PSK" : "123456789012345678901234567890 aa"}} | {" error ": 0," action ":" REPLY ", "data" : [{" gatewayip ":" 192.168.10.169 "}]}
Get switch | {" action ":" REQUEST ", "CMD" : "binaryswitch", "data" : {" nodeid ": 6," op ":" get ", "para" : ""}} | {" error" : 0, "action" : "REPLY", "data" : [{" gatewayip ":" 192.168.10.169 "}]}
Turn on the switch | {" action ":" REQUEST ", "CMD" : "binaryswitch", "data" : {" nodeid ": 6," op ":" set ", "para" : "on"}} | {" error ": 0," action ":" REPLY ", "data" : [{" gatewayip ":" 192.168.10.169 "}]}
Closed switch | {" action ":" REQUEST ", "CMD" : "binaryswitch", "data" : {" nodeid ": 6," op ":" set ", "para" : "off"}} | {" error ": 0," action ":" REPLY ", "data" : [{" gatewayip ":" 192.168.10.169 "}]}
# # # 3.2 pages effect