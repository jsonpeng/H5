# ʹ��websocket����Ϊ����ͨ��

��ǩ : `websocket` `ajax`  
���� :[websocketЭ��](http://45.32.248.21/static/document/websocketЭ��.html)  
      [ԭwebsock�ĵ�]()
---

![websocketlogo](http://45.32.248.21/static/img/ws.png)

### 1. ΪʲôҪʹ��[websocket](http://baike.baidu.com/link?url=stMwJhjsRgfujP3CHjj2uZqXMNTpXGUb04oPsmYen9MvRkObCR-KFhawBLpY0kBO_unfmixtC2D_05iL3N6O4LDNYBmzLdngAGn-zUhkto_)?
#### ���������Ա��� [websocket](http://baike.baidu.com/link?url=stMwJhjsRgfujP3CHjj2uZqXMNTpXGUb04oPsmYen9MvRkObCR-KFhawBLpY0kBO_unfmixtC2D_05iL3N6O4LDNYBmzLdngAGn-zUhkto_)�� [ajax](http://baike.baidu.com/item/ajax/8425)
### [ajax](http://baike.baidu.com/item/ajax/8425)
Ajax,���첽JavaScript��XML����һ�ִ�������ʽ��ҳӦ�õ���ҳ����������ͨ���ں�̨������������������ݽ�����Ajax����ʹ��ҳʵ���첽���£�����ζ�ſ����ڲ����¼���������ҳ������£�����ҳ�Ĳ��ֽ��м��ظ��¡�
Ajax ���ŵ����������������web������֮��ʹ���첽���ݴ��䣨HTTP���󣩣��������û������Ķ�����`XMLHTTPRequest`��ͨ���������js���ڲ����¼���ҳ����������web�������������ݡ�����Ajax��������ô���꣬����������ļ��ݷǳ����������Һܶ����Ŀ�ܿ���ֱ��ʹ��,
ajaxʹ������ajax,portal�б�׼
#### [jQuery](http://baike.baidu.com/item/jQuery)ʹ��ʵ��:
```javascript    
	$.ajax({
    type: ��POST��,
    url: ��cgi/zcgi/networks//zwep_get_if_list��,
    data:��epd=�� + ep,
    dataType: ��xml��,
    async: false,
    success: function(xml) {
    $(xml).find(��zwif��).each(function(){
    document.write(��zwif: (desc, id, name, ver, sec, unsec) = (��);
    document.write($(this).attr(��desc��) + ��, ��);
    document.write($(this).attr(��id��) + ��, ��);
    document.write($(this).attr(��name��) + ��, ��);
    document.write($(this).attr(��ver��) + ��, ��);
    document.write($(this).attr(��sec��) + ��, ��);
    document.write($(this).attr(��unsec��) + ��)<br>��);
    /* set mlv switch to 50% */
    if ($(this).attr(��id��) == ��38��)
    {
    document.write(��sending ...<br>��);
    zwif_level_setup($(this).attr(��desc��));
    zwif_level_set($(this).attr(��desc��), ��50��);
    }
    });
    },
    }
```
 ������ʹ�õ�post��ʽ������һ�ַ�ʽ����get����ô��ʲôʱ����get����ʲôʱ����post�����أ����ǵ���������ʲô�أ�

   ��1��get�ǰѲ������ݶ��мӵ��ύ����ACTION������ָ��URL�У�ֵ�ͱ��ڸ����ֶ�һһ��Ӧ����URL�п��Կ�����Post��ͨ��HTTP post���ƣ������ڸ����ֶ��������ݷ�����HTML HEADER��һ���͵�ACTION������ָ��URL��ַ���û�������������̡�

   ��2������get��ʽ������������Request.QueryString��ȡ������ֵ������post��ʽ������������Request.Form��ȡ�ύ�ı��������ַ�ʽ�Ĳ�����������Request��ȡ��

   ��3��get���͵���������С�����ܴ���2KB��Post���͵��������ϴ�һ�㱻Ĭ��Ϊ�������ơ��������ϣ���������Ĳ�ͬ���졣

   ��4��get��ȫ�Էǳ��ͣ�post��ȫ�Խϸߡ�
 ���⣬get�������������ԣ����Ὣ������ӵ�URL�У�ͨ�����ַ�ʽ���ݵ���������ͨ������һ��������URL��ַ�Ľ�β�����ݲ����Ŀ��ˣ�����Ĳ���ÿһ�����ݲ����ԡ�����=ֵ������ʽ���֣����������֮������һ�����ӷ�&�����֡�

Post�������������ԣ������Ƿ���HTTP�����صģ�����֯��ʽ��ֹһ�֣���&���ӷ�ʽ��Ҳ�зָ�����ʽ�������ز��������ݴ������ݣ��ȽϷ��㡣

��֮�����ύ����ʱ��ͨ����post���󣬵�Ҫ����һ���ϴ�������ļ�ʱ��post���󣻵����ݵ�ֵֻ���ò�����ʽ��������2KB��ʱ����get��ʽ���ɡ�
#### [Angular.JS](http://baike.baidu.com/item/AngularJS)ʹ��ʵ��:
    app.controller('registerCtrl',['$scope','$http',function($scope,$http){
     $scope.asave= function(){
         
         $http({
             method: 'POST',
             url: '/register',
             data: $.param($scope.formData), // pass in data as strings
             headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}  
         }).success(function (data) {
           if(data.errno==0x00){
              layer.msg('ע��ɹ�', {
               offset: 0,
               shift: 6
    });
### [websocket](http://baike.baidu.com/link?url=stMwJhjsRgfujP3CHjj2uZqXMNTpXGUb04oPsmYen9MvRkObCR-KFhawBLpY0kBO_unfmixtC2D_05iL3N6O4LDNYBmzLdngAGn-zUhkto_)
 WebSocket��HTML5һ���µ�Э�飬ʵ����`������������ȫ˫��ͨ��`���䱾������ͨ��`HTTP/HTTPS`Э��������ֺ󴴽�һ�����ڽ������ݵ�TCP���ӣ��������ͻ���ͨ����`TCP`���ӽ���ʵʱͨ�š�
WebSocket API�����ŵ����ڷ�����������������ڸ�����ʱ�䷶Χ�ڵ�����ʱ�̣��໥������Ϣ���ڽ�������֮�󣬷��������������������ݸ�����������⣬�������������֮�佻���ı�ͷ��Ϣ��С��WebSocket����������Ajax����XHR����ʽͨ�ţ���ΪAjax������Ҫ�ͻ��˷������󣬶�WebSocket�������Ϳͻ��˿����໥������Ϣ��
��֧��WebSocket��������У��ڴ���Socket֮�󣬿���ͨ��`onopen`��`onmessage`��`onclose`��`onerror`�ĸ��¼�ʵ�ֶ�Socket����Ӧ��
### ����Ŀ��ʵ�����£�
    <script type="text/javascript">
    var sock = null;
    var wsuri = "ws://127.0.0.1:8360/ws"; //�����ws������ַ
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
        sock.onopen = function() { //websocket�״ν����ɹ��󴥷����¼�
            console.log("connected to " + wsuri);
        }
        sock.onclose = function(e) {
            console.log("connection closed (" + e.code + ")");
        }
        sock.onmessage = function(e) { //�ͻ��˴ӷ���˽��յ�������
            console.log("message received: " + e.data);
      alert(e.data)
        }
    };
    
    function send() {  //�󶨵���¼��󴥷��Ļص�����
        var msg = document.getElementById('message').value;
        sock.send(msg); //�ͻ��˷��͹�ȥ������
    }

    </script>
 ��ʵ���У���������һ��WebSocket���󣬲�������Ҫ���ӵķ������˵�ַ��ͬHTTPЭ��ʹ��HTTP://��ͷһ����WebSocketЭ���URLʹ��WS://��ͷ�����ⰲȫ��WebSocketЭ��ʹ��WSS://��ͷ��ʵ����onopen�¼�������WebSocket�����ɹ�ʱִ��dataSend��������������dataSend���������ǽ���Ϣ���͵��������ˡ����������յ��ͻ��˵���Ϣ���ᷢ����Ӧ����Ϣ���ͻ��ˡ����ͻ����յ���Ϣʱ���ᴥ��onmessage�¼���������Ϣ����simuRealData�С����ͻ����յ������������Ĺر���������ʱ��������ᴥ��onclose�¼������������ӡ��������ա���������ʧ�ܵ�ʱ��ͻᴥ��onerror�¼����ɴˣ����ǿ��Կ������ԵĲ������ǲ����¼��ķ�ʽ��������˾Ͳ�������UI��ʹ��UI�������Ӧʱ�䣬�õ����õ��û����顣
### **˵��**   
>����˵����HTTPЭ����������豸ʱ���豸״̬�����ı�������û��޷���֪�豸״̬�Ѿ��ı䣬������Ǿ�����portal��ʹ��websocket�滻���ֲ��û���httpЭ��ʵ�ֵ�web api��ajax���Ҽ��ɵ����ǵ�smartgateway��Ŀ����

### 2.1 websocketԭ��API

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


### 2.2 Ŀǰ����Bitbucket�Ĵ���Ŀ¼
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

## 2.3 ĿǰTestServer������websocket����
>�޸ĸ���`WebSocket`ʵ�ֿͻ��˺ͷ���˵�˫ͨ��

### 3.�������API��
Ŀǰ����ʵ�ֵľ�������������`����`:  

### 3.1 ͼ��

ִ�ж���    | �������                                                                                                            | ����˻�Ӧ
------------|------------------------------------------------------------------------------------------------------------------- ---|------------
ɨ������    | {"action": "REQUEST", "cmd": "discovery"}                                                                            |  {"error":0,"action":"REPLY","data":[{"gatewayip":"192.168.10.169"}]}
��ӽڵ�    | {"action": "REQUEST", "cmd": "addnode", "data": {"nodeid":1}}                                                        | 
ɾ���ڵ�    | {"action": "REQUEST", "cmd": "removenode", "data": {"nodeid":1}}                                                     | Register a callback to be fired on every message received from the websocket, or optionally just when the message's `data` property matches the filter provided in the options object. Each message handled will safely call `$rootScope.$digest()` unless `autoApply` is set to `false in the options. Callback gets called with a [MessageEvent](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent?redirectlocale=en-US&redirectslug=WebSockets%2FWebSockets_reference%2FMessageEvent) object.
��ÿ���    | {"action": "REQUEST", "cmd": "getnodelist", "data":{"ip":"192.168.10.169","psk":"123456789012345678901234567890AA"}} | Function to be executed each time a socket connection is opened for this instance.
�򿪿���    | {"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":6, "op":"get", "para":""}}                             | Function to be executed each time a socket connection is closed for this instance.
�رտ���    | {"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":6, "op":"set", "para":"on"}}                           | Function to be executed each time a socket connection has an Error for this instance.
��λ����    | {"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":6, "op":"set", "para":"off"}}                          | Close the underlying socket, as long as no data is still being

### 3.2 ��ҳ��Ч��