
<script type="text/javascript">
   var ADDNODE='{"action": "REQUEST", "cmd":"addnode", "data":{"nodeid":1}}';
   var REMOVENODE='{"action": "REQUEST", "cmd":"removenode", "data": {"nodeid":1}}';
   var sock = null;
   var discoverys=new Object();
   discoverys.action="REQUEST";
   discoverys.cmd="discovery";
   discoverys.data={};

   var nodelist=new Object();
   nodelist.action="REQUEST";
   nodelist.cmd="getnodelist";
   nodelist.data={};
   nodelist.data.ip="192.168.10.217";
   nodelist.data.psk="123456789012345678901234567890AA";
   var NODELIST =JSON.stringify(nodelist); 
   var DISCOVERY =JSON.stringify(discoverys) 






   //var DISCOVERY='{"action":"REQUEST","cmd":"discovery","data":""}';
   //var NODELIST='{"action": "REQUEST", "cmd": "getnodelist", "data":{"ip":"192.168.10.217","psk":"123456789012345678901234567890AA"}}';
 
   var GETSWITCH='{"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":6, "op":"get", "para":""}}';
   var SWITCHON='{"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":6, "op":"set", "para":"on"}}';
   var SWITCHOFF='{"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":6, "op":"set", "para":"off"}}';
   var RESET='{"action": "REQUEST", "cmd": "resetnetwork", "data": {"nodeid":1}}';

   var E1='{"action": "REQUEST", "cmd": "electricmeter", "data":{"nodeid":6, "op":"reset"}}';
   var E2='{"action": "REQUEST", "cmd": "electricmeter", "data":{"nodeid":6, "op":"get", "para":"power"}}';
   var E3='{"action": "REQUEST", "cmd": "electricmeter", "data":{"nodeid":6, "op":"get", "para":"watt"}}';
   var wsuri = "ws://192.168.10.234:8360/ws?uid={{.Uid}}";

    window.onload = init();

   function init(){
     wsstart();
    
    }
    function wsstart() {

        console.log("onload");
        sock = new WebSocket(wsuri);
        sock.onopen = function() {
            console.log("connected to " + wsuri);
            //layer.alert("webscoket start!")
            discovery();
        }
        sock.onclose = function(e) {
            console.log("connection closed (" + e.code + ")");
             layer.alert("WebSocket closed"+e.code);
        }

        //sock.send(DISCOVERY);
        //discovery();
     
    };

    function discovery() {
        
        layer.load(1);
setTimeout(function(){
  layer.closeAll('loading');
}, 10000);
        //layer.alert("start discovery,please stand 10s");
        window.location.href="#/index";
        sock.send(DISCOVERY);


   sock.onmessage = function(e) {
     console.log("according net received: " + e.data);
      
       var datas=e.data
       var jsonobj=eval('('+datas+')');  

     
 if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
   layer.alert("don't find the gatewayip!");
 }else{
        var json =jsonobj.data;
//       //var json=datas.data;
         for (var i=0;i<=json.length;i++){
      
         $(".gateway").append('<li class="list-group-item" onclick="getnode()" ><a id="gateway'+i+'"><i class="fa fa-rss-square"></i>'+jsonobj.data[i].gatewayip+'</a><i class="fa fa-chevron-right pull-right"></i></li>');

        }
       //alert(json.key[0]);
//    // for (var key in json){
//    //     alert(key);//json对象的key
//    // alert(json[key]);//json对象的值
//    //  }

 
   
 }
        }
      
    }

    function getnode(){

           layer.load(1);
setTimeout(function(){
  layer.closeAll('loading');
}, 2000);
    location.href="#/switch";
      sock.send(NODELIST);
            sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.alert("don't find the node!");
}else{
  var json =jsonobj.data;
  for(var i=0;i<=json.length;i++){
      $(".nodeids").append('<li class="list-group-item" ><i class=" fa fa-refresh fa-spin"></i><p id="nodeid'+i+'">nodeid:'+jsonobj.data[i].nodeid+'</p><p id="node'+i+'">nodeip:'+jsonobj.data[i].nodeip+'</p><input type="button" class="btn btn-primary" value="On" onclick="switchon()" /><input type="button" class="btn btn-default" value="Off" onclick="switchoff()"<i class="fa fa-chevron-right pull-right"></i></li>');

    //$(".nodeids").append('<i class=" fa fa-refresh fa-spin"></i><p id="nodeid'+i+'">nodeid:'+jsonobj.data[i].nodeid+'</p><p id="node'+i+'">nodeip:'+jsonobj.data[i].nodeip+'</p><input type="button" class="btn btn-primary" value="On" onclick="switchon()" /><hr><input type="button" class="btn btn-default" value="Off" onclick="switchoff()"/<hr><input type="button" class="btn btn-warning dropdown-toggle" value="TimeTest" onclick="timetest()"/><hr>');
      //$("#nodeid"+i).html(jsonobj.data[i].nodeid);
    
      //$("#node"+i).html(jsonobj.data[i].nodeip);
    

  }
      
    
}
        }
  }
   function addnode(){
    layer.alert("start add node");
    sock.send(ADDNODE);

      sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.alert("don't find the node!");
}else{
   
      $("h2").html(jsonobj.data);
}
        }


   }

   function removenode(){
    layer.alert("start remove node");
    sock.send(REMOVENODE);

      sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.alert("don't find the node!");
}else{
    
      $("h2").html(jsonobj.data);
}
        }


   }


  function getswitch(){
       layer.alert("start get switch");
       sock.send(GETSWITCH);
             sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.alert("don't find the node!");
}else{
    
      $("h2").html(jsonobj.data);
}
        }

  }

  function switchon(){
      
       sock.send(SWITCHON);
             sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.alert("don't find the node!");
}else{
  
      $("h2").html(jsonobj.data);
}
        }
        

  }





    function switchoff(){
 
       sock.send(SWITCHOFF);
             sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.alert("don't find the node!");
}else{
  
      $("h2").html(jsonobj.data);
}
        }
        //console.timeEnd("off cost");

  }
  

  function resetnet(){
    layer.alert("start reset button");
    sock.send(RESET);
    sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.alert("don't find the node!");
}else{
   
      $("h2").html(jsonobj.data);
}
        }
  }

  function electricmeter1(){
    layer.alert("start e1");
    sock.send(E1);
    sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.alert("don't find the node!");
}else{
   
      $("h2").html(jsonobj.data);
}
        }
  }

    function electricmeter2(){
    layer.alert("start e2");
    sock.send(E2);
    sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.alert("don't find the node!");
}else{
   
      $("h2").html(jsonobj.data);
}
        }
  }

    function electricmeter3(){
    layer.alert("start e3");
    sock.send(E3);
    sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.alert("don't find the node!");
}else{
   
      $("h2").html(jsonobj.data);
}
        }
  }



 </script>



<script src="/static/mobile/js/test.js"></script>