# uses websocket as communication gateway

Tags: `ajax` `websocket`

Http://45.32.248.21/static/document/websocket protocol ([websocket protocol) (.Html)

[original websock document] (http://45.32.248.21/static/document/websocket.html)

-

[websocketlogo] (http://45.32.248.21/static/img/ws.png)

1 ### why [websocket] (http://baike.baidu.com/link? Url=stMwJhjsRgfujP3CHjj2uZqXMNTpXGUb04oPsmYen9MvRkObCR-KFhawBLpY0kBO_unfmixtC2D_05iL3N6O4LDNYBmzLdngAGn-zUhkto_)?

We first #### to compare [websocket] (http://baike.baidu.com/link? Url=stMwJhjsRgfujP3CHjj2uZqXMNTpXGUb04oPsmYen9MvRkObCR-KFhawBLpY0kBO_unfmixtC2D_05iL3N6O4LDNYBmzLdngAGn-zUhkto_) and [ajax] (http://baike.baidu.com/item/ajax/8425)

### [ajax] (http://baike.baidu.com/item/ajax/8425)

Ajax, the asynchronous JavaScript and XML, is a web development technique for creating interactive web applications. Through a small amount of data exchange with the server in the background, Ajax can make web pages to achieve asynchronous updates, which means that the entire page can not be re loaded in the case, the web page to load the part of the update.

Ajax is the advantage of it in the browser and web server using asynchronous data transfer (HTTP request), does not block users, the core object is `XMLHTTPRequest`. Through this object, the JS can exchange data with the web server without re loading the page. Because Ajax has been popular for so many years, the browser is perfect for its compatibility, and a lot of mature framework can be used directly,

Ajax use depends on portal, AJAX standard

#### [jQuery] (http://baike.baidu.com/item/jQuery) the use of examples:

```javascript

$.ajax ({

POST "type",

Cgi/zcgi/networks//zwep_get_if_list "url",

Data: "epd=" + ep,

XML "dataType",

False async,

Function success: (XML) {

$(XML).Find ('zwif').Each (function () {

Document.write ("zwif:, ID, name, ver, SEC, unsec, DESC) = (");

Document.write ($(this).Attr ('desc') + ",");

Document.write ($(this).Attr ('ID') + ",");

Document.write ($(this).Attr ('name') + ",");

Document.write ($(this).Attr ('ver') + ",");

Document.write ($(this).Attr ('sec') + ",");

Document.write ($(this).Attr ('unsec') + "<br>");

Set MLV switch to 50% / * * /

If ($(this).Attr ("Id") = = "38")

{

Document.write ("sending... <br>");

Zwif_level_setup ($(this).Attr ('desc');

Zwif_level_set ($(this).Attr ("desc"), "50");

}

});

},

}

.

The way to use the post here, the other way is get. So, when to use the get request, when to use the post request? What is their difference?

(1) get is the parameter data queue added to the submission of the form of the ACTION attribute refers to the URL, and the values of each field in the form one by one, in the URL can be seen. Post is through the post HTTP mechanism, the various fields of the form and its contents are placed in the HEADER URL together with the ACTION property referred to the HTML address, the user can not see this process.

(2) for the get method, the server uses Request.QueryString to obtain the value of the variable, for post, the server side with the Request.Form to obtain the variables submitted. The parameters of the two methods can be obtained by Request.

(3) the amount of data transmitted by get is small, and can not be more than 2KB. The amount of data transmitted by Post is larger, generally is not restricted by default. But in theory, due to the different server.

(4) the security of get is very low, and the security of post is high.

In addition, get request has the following characteristics: it will be added to the URL data, through this way to the server, usually the use of a? On the end of the URL address and the beginning of the data parameter, the parameters of each data parameter appear in the form of "name = value".

Post request has the following characteristics: data is put in the HTTP main body weight, the organization is more than one way, there are & connection way, also has the separator, can hide the parameters, transfer a large number of data, more convenient.

In short, when the form is submitted to the post request usually, when to send a larger data file with the post request; when the value of the transfer only parameters (not more than 2KB), the get can be used.

#### [Angular.JS] (http://baike.baidu.com/item/AngularJS) the use of examples:

App.controller ('registerCtrl', ['$scope','$http', function ($scope, $http) {

Function $scope.asave= () {

$http ({

'POST'method,

'/register'url,

Data: $.param ($scope.formData), in data as strings / / pass

{'Content-Type'headers::'application/x-www-form-urlencoded; charset=UTF-8'}

(function () {}).Success (data) {

If (data.errno==0x00) {

Layer.msg (registered success', {

Offset: 0,

Shift: 6

});

### [websocket] (http://baike.baidu.com/link? Url=stMwJhjsRgfujP3CHjj2uZqXMNTpXGUb04oPsmYen9MvRkObCR-KFhawBLpY0kBO_unfmixtC2D_05iL3N6O4LDNYBmzLdngAGn-zUhkto_)

WebSocket is a new protocol for HTML5, which implements the full duplex communication between the browser and the server. The essence is to create a `HTTP/HTTPS` protocol for the exchange of data through the TCP connection, server and client