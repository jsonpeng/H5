   var sock = null;
   //Set the websocket link path
   var wsuri = 'ws://192.168.10.10:8360/ws?uid=1484124831';

  window.onload = init();

   function init(){
     wsstart();
   //can add other start function
    }

    //start ws
    function wsstart() {

        console.log("onload to ");
        sock = new WebSocket(wsuri);
        sock.onopen = function() {
            console.log("connected to " + wsuri);
          
            discovery();
         
        }
        //websocket closed remind alert
        sock.onclose = function(e) {
            console.log("connection closed (" + e.code + ")");
             layer.msg("WebSocket closed"+e.code);
        }

   
    };

  //net reply
    function reply(){
              sock.onmessage =function(e){
           console.log("according server net received: " + e.data);
            var datas=e.data
            var jsonobj=eval('('+datas+')'); 
            var json=jsonobj.data;
            if (jsonobj.data==undefined && jsonobj.data==null && jsonobj.data==""){
  layer.msg("don't find the onmessage data!");
 }else if(jsonobj.data =="find discovery timeout"){
  layer.msg("find discovery timeout");

 }else if(jsonobj.data =="DTLS handle MSG failed"){
  layer.msg("DTLS handle MSG failed");

 }else if(jsonobj.data=="can't get the address"){
  layer.msg("can't get the address");

 }else if(jsonobj.data=="Get BinarySwitch Status error"){
  layer.msg("Get BinarySwitch Status error");

 }else if (jsonobj.data[0].gatewayip !==undefined && jsonobj.data[0].gatewayip!==null && jsonobj.data[0].gatewayip!==""){
   for (var i=0;i<json.length;i++){
    //$("#gateway").remove();
    //<i class="fa fa-chevron-right pull-right"></i>
    //<div style="display:none"><form action="" method="post"><input type="text" name="nodeid" class="nodeidss " value="'+jsonobj.data[i].nodeid+'"><input type="text" name="gatewayip" class="gatewayss" value="192.168.10.215"><input type="text" name="nodeip" class="nodeipss" value="'+jsonobj.data[i].nodeip+'"><input type="text" name="nscmd" class="nscmdss" value="'+jsonobj.data[i].nscmd+'"><input type="text" name="nodeip" class="scmdss" value="'+jsonobj.data[i].scmd+'"><input type="button" onclick="savenodelist()"></form></div>
  
        $("#gateway").append('<li class="list-group-item" id="'+jsonobj.data[i].gatewayip+'" onclick="getnode(this.id)" ><i class="fa fa-rss-square"></i><a id="gateway'+i+'" >'+jsonobj.data[i].gatewayip+'<i class="fa fa-chevron-right pull-right"></i></a></li>');
        $(".maingateway").append('<div style="display:none"><form action="" method="post"><input type="text" name="gatewayip" class="gatewayclass" id="gateway'+i+'" value="'+jsonobj.data[i].gatewayip+'" onclick="savegatewaytofile(this.id)"><input type="button"></form></div>');
      savegatewaytocache(e.data);   
      savegatewaytofile(i);
 }
        }else if(jsonobj.data[0].nscmd !==undefined && jsonobj.data[0].nscmd!==null && jsonobj.data[0].nscmd !==""){
         for(var i=0;i<json.length;i++){
         var nscmd=jsonobj.data[i].nscmd.substr(0,2);
         // alert(jsonobj.data[i].nscmd);
          if (jsonobj.data[i].nodeip =="" && jsonobj.data[i].nscmd.length<4){
          //mutisensor test
           
          $(".nodeids").append('<li class="list-group-item" id="'+jsonobj.data[i].nodeid+'">MUTISWITCH<span id="'+jsonobj.data[i].nodeid+'"><p id="nodeid'+i+'">nodeid:'+jsonobj.data[i].nodeid+'</p></span><a><mark id="'+jsonobj.data[i].nodeid+'" class="fa fa-chevron-right" onclick="getmutisensor(this.id)"></mark></a></li>'); 
               
                      
          }else if (jsonobj.data[i].scmd =="" && nscmd=="25" ){
$(".nodeids").append('<li class="list-group-item" id="'+jsonobj.data[i].nodeid+'">BinarySwitch<span id="'+jsonobj.data[i].nodeid+'"><p id="nodeid'+i+'">nodeid:'+jsonobj.data[i].nodeid+'</p></span><a><mark id="'+jsonobj.data[i].nodeid+'" class="fa fa-chevron-right" onclick="getallstate(this.id)"></mark></a></li>');

          }else if(jsonobj.data[i].scmd =="" && nscmd=="26"){
$(".nodeids").append('<li class="list-group-item" id="'+jsonobj.data[i].nodeid+'">multilevelswitch<span id="'+jsonobj.data[i].nodeid+'"><p id="nodeid'+i+'">nodeid:'+jsonobj.data[i].nodeid+'</p></span><form method="post" name="lightsetting"><p>Light: <br /><a id="'+jsonobj.data[i].nodeid+'" onclick="numDec(this.id)">-</a> <input type="range" name="range" min="0" max="100" id="quantity'+jsonobj.data[i].nodeid+'"  step="1" value="100" onchange="lightchange(this.id)"><output name="result"></output><a id="'+jsonobj.data[i].nodeid+'" onclick="numAdd(this.id)">+</a></p><input type="hidden" value="28.1" class="form-group has-primary" id="price" /></form><a><mark id="'+jsonobj.data[i].nodeid+'" class="fa fa-chevron-right" onclick="getallstate(this.id)"></mark></a></li>');

          }else{
            
         $(".nodeids").append('<div style="display:none"><form action="" method="post"><input type="text" name="nodeid" class="nodeidss" value="'+jsonobj.data[i].nodeid+'"><input type="text" name="gatewayip" class="gatewayss" value="192.168.10.215"><input type="text" name="nodeip" class="nodeipss" value="'+jsonobj.data[i].nodeip+'"><input type="text" name="nscmd" class="nscmdss" value="'+jsonobj.data[i].nscmd+'"><input type="text" name="nodeip" class="scmdss" value="'+jsonobj.data[i].scmd+'"><input type="button" onclick="savenodelist()"></form></div><li class="list-group-item" ><i class="fa fa-rss-square"></i><p id="nodeid'+i+'">nodeid:'+jsonobj.data[i].nodeid+'</p></li>'); 
         
          }

        


   }


        }else if(jsonobj.data[0].result!==undefined && jsonobj.data[0].result!==null && jsonobj.data[0].result !==""){
           // $(".power").append('power:'+jsonobj.data[i].result+'');
           alert("get power!");

        }else if(jsonobj.data.result=="save file ok"){
          console.log("Save Success!");

} 
    }

}
 //DISCOVERY data     var DISCOVERY='{"action": "request", "device": "gateway", "data":{ "nodeid":0, "cmd":"COMMAND_NODE_INFO_CACHED_GET"}}';
    function discovery() {
   var discoverys=new Object();
   discoverys.action="request";
   discoverys.device="gateway";
   discoverys.data={};
   discoverys.data.nodeid=0;
   discoverys.data.cmd="COMMAND_NODE_INFO_CACHED_GET";
   var DISCOVERY =JSON.stringify(discoverys) 
        layer.load(1);
setTimeout(function(){
  layer.closeAll('loading');
}, 10000);
       
        window.location.href="#/";
        console.log("client net send: " +DISCOVERY);
        sock.send(DISCOVERY);
        reply();
  
    }

//{"action": "request", "device": "gateway", "data":{"nodeid":1, "cmd":"COMMAND_NODE_LIST_GET", "para":{"ip":"192.168.10.215","psk":"123456789012345678901234567890AA"}}}
 //NODELIST data       var NODELIST='{"action": "REQUEST", "cmd": "getnodelist", "data":{"ip":"192.168.10.217","psk":"123456789012345678901234567890AA"}}';
    function getnode(gatewayip){
   var nodelist=new Object();
   var NODEIP=gatewayip;
   nodelist.action="request";
   nodelist.device="gateway";
   nodelist.data={};
   nodelist.data.nodeid=1;
   nodelist.data.cmd="COMMAND_NODE_LIST_GET";
   nodelist.data.para={};
   nodelist.data.para.ip=NODEIP;
   nodelist.data.para.psk="123456789012345678901234567890AA";
   var NODELIST =JSON.stringify(nodelist); 
   //alert(NODEIP);
           layer.load(1);
setTimeout(function(){
  layer.closeAll('loading');
}, 1000);

    location.href="#/switch"+"?nodeip="+NODEIP;
     console.log("client net send: " +NODELIST);
      sock.send(NODELIST);
      reply(); 

  }


   function addnode(removeid){

   //ADDNODE data
   var ADDNODE='{"action": "request", "device": "gateway", "data": {"nodeid":1, "cmd":"COMMAND_NODE_ADD","para":{"mode":"NODE_ADD_ANY"}}}';
    //layer.msg("start add node");
    console.log("client net send: " +ADDNODE);
    sock.send(ADDNODE);

      sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.msg("don't find the node!");
}else{
     //$('#'+removeid+'').parent("div").remove();
      //$("h2").html(jsonobj.data);
      
     $(".nodeids").append('<li class="list-group-item" id="'+jsonobj.data+'"><i class=" fa fa-refresh fa-spin"></i><span id="'+jsonobj.data+'"><p id="nodeid'+jsonobj.data+'">nodeid:'+jsonobj.data+'</p></span><a><mark id="'+jsonobj.data+'" class="fa fa-chevron-right" onclick="getallstate(this.id)"></mark></a></li>');
     
}
        }
        // setTimeout("getnode",5000);



   }

   function removenode(removeid){
   //REMOVENODE data
   var REMOVENODE='{"action": "request", "device": "gateway", "data": {"nodeid":1, "cmd":"COMMAND_NODE_REMOVE","para":{"mode":"NODE_ADD_ANY"}}}';
    console.log("client net send: " +REMOVENODE);
    sock.send(REMOVENODE);

      sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.msg("don't find the node!");
}else{
    
       $('li[id='+removeid+']').remove();

}
        }
   }

   function remove(myid){
    alert(myid);
$('div[id="'+myid+'"]').remove();
   }
//{"action": "request", "device": "binaryswitch", "data":{"nodeid":13, "cmd":"COMMAND_SWITCH_BINARY_GET"}}
//GETSWITCH data       var GETSWITCH='{"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":6, "op":"get", "para":""}}';
  function getswitch(getid){
   var getswitchs=new Object();
   getswitchs.action="request";
   getswitchs.device="binaryswitch";
   getswitchs.data={};
   getswitchs.data.nodeid=Number(getid);  //should update
   getswitchs.data.cmd="COMMAND_SWITCH_BINARY_GET";
  
   var GETSWITCH=JSON.stringify(getswitchs);
       //layer.msg("start get switch");
      console.log("client net send: " +GETSWITCH);
       sock.send(GETSWITCH);
       reply();   
  }


//{"action": "request", "device": "binaryswitch", "data":{"nodeid":13, "cmd":"COMMAND_SWITCH_BINARY_SET", "para":{"value":"on"}}}
  function switchonoroff(switchid){
if($('input[id="'+switchid+'"]').prop("checked")){
    //alert("执行开操作");
   //SWITCHON data        var SWITCHON='{"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":6, "op":"set", "para":"on"}}';
   var nowid =switchid.slice(10);
   var switchons=new Object();
   switchons.action="request";
   switchons.device="binaryswitch";
   switchons.data={};
   switchons.data.nodeid=Number(nowid); //should update
   switchons.data.cmd="COMMAND_SWITCH_BINARY_SET";
   switchons.data.para={};
   switchons.data.para.value="on";
   var SWITCHON=JSON.stringify(switchons);
  
   console.log("client net send: " +SWITCHON);
   sock.send(SWITCHON);
     sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.msg("don't find the node!");
}else{
  
      $("h2").html(jsonobj.data);
}
        }

        }else{
          //alert('执行关操作');
          //SWITCHOFF data        var SWITCHOFF='{"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":6, "op":"set", "para":"off"}}';
   var nowid =switchid.slice(10);
   var switchoffs=new Object();
   switchoffs.action="request";
   switchoffs.device="binaryswitch";
   switchoffs.data={};
   switchoffs.data.nodeid=Number(nowid);
   switchoffs.data.cmd="COMMAND_SWITCH_BINARY_SET";
   switchoffs.data.para={};
   switchoffs.data.para.value="off";
   var SWITCHOFF=JSON.stringify(switchoffs);
  
   console.log("client net send: " +SWITCHOFF);
   sock.send(SWITCHOFF);
    sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.msg("don't find the node!");
}else{
  
      $("h2").html(jsonobj.data);
}
        }
  
}
       }

  

  function resetnet(){
     //RESET data
   var RESET='{"action": "request", "device": "gateway", "data": {"nodeid":1, "cmd":"COMMAND_DEFAULT_SET"}}'; 

     console.log("client net send: " +RESET);
    sock.send(RESET);
    sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.msg("don't find the node!");
}else{
   
       layer.msg('reset success!');
}
        }
  }

//{"action": "request", "device": "electricmeter", "data":{"nodeid":6, "cmd":"COMMAND_METER_RESET"}}
//   var E1='{"action": "REQUEST", "cmd": "electricmeter", "data":{"nodeid":9, "op":"reset"}}';
  function electricmeter1(e1id){
    var e1=new Object();
   e1.action="request";
   e1.cmd="electricmeter";
   e1.data={};
   e1.data.nodeid=Number(e1id); //should update
   e1.data.cmd="COMMAND_METER_RESET";
  
   var E1=JSON.stringify(e1);
  console.log("client net send: " +E1);
   sock.send(E1);
    sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.msg("don't find the node!");
}else{
   
      $("h2").html(jsonobj.data);
}
        }
  }

function getallstate(allid){
 var getswitchs=new Object();
   getswitchs.action="request";
   getswitchs.device="binaryswitch";
   getswitchs.data={};
   getswitchs.data.nodeid=Number(allid);  //should update
   getswitchs.data.cmd="COMMAND_SWITCH_BINARY_GET";
  
   var GETSWITCH=JSON.stringify(getswitchs);
       //layer.msg("start get switch");
  console.log("client net send: " +GETSWITCH);
  sock.send(GETSWITCH);

      sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
   if (jsonobj.data==undefined && jsonobj.data==null && jsonobj.data==""){
  layer.msg("don't find the node!");
}else if(jsonobj.data=="on"){
   electricmeter2(allid);
     $('span[id="'+allid+'"]').append('<input type="checkbox" name="chk" id="checkbox_c'+allid+'" class="chk_3 pull-right"  onclick="switchonoroff(this.id)" checked/><label for="checkbox_c'+allid+'"></label>'); 
   
      
 }else if(jsonobj.data="off"){
   electricmeter2(allid);
   $('span[id="'+allid+'"]').append('<input type="checkbox" name="chk" id="checkbox_c'+allid+'" class="chk_3 pull-right"  onclick="switchonoroff(this.id)" /><label for="checkbox_c'+allid+'"></label>');

 }
 //alert(jsonobj.data);
        }

}

//{"action": "request", "device": "electricmeter", "data":{"nodeid":10, "cmd":"COMMAND_METER_GET", "para":{"value":"power"}}}
//   var E2='{"action": "REQUEST", "cmd": "electricmeter", "data":{"nodeid":9, "op":"get", "para":"power"}}';var E3='{"action": "REQUEST", "cmd": "electricmeter", "data":{"nodeid":9, "op":"get", "para":"watt"}}';
    function electricmeter2(e2id){
   var e2=new Object();
   e2.action="request";
   e2.device="electricmeter";
   e2.data={};
   e2.data.nodeid=Number(e2id); //should update
   e2.data.cmd="COMMAND_METER_GET";
   e2.data.para={};
   e2.data.para.value="power";
   var E2=JSON.stringify(e2);
   console.log("client net send: " +E2);
   sock.send(E2);
   
          sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     

   $('mark[id="'+e2id+'"]').remove();
   $('span[id="'+e2id+'"]').append('<div id="added1"><mark id="'+e2id+'" class="fa fa-arrow-down pull-right" onclick="electricmeter4(this.id)" ></mark><p>consumption:'+jsonobj.data+'kilowatt hour</p></div>');
     //(jsonobj.data);
    setTimeout('electricmeter3('+e2id+')',500);

        }

  }


  function electricmeter4(e4id){


//$('div[id="added1"]').remove();
//$('div[id="added2"]').remove();
$('span[id="'+e4id+'"] div').remove();

$('span[id="'+e4id+'"]').append('<mark id="'+e4id+'" class="fa fa-chevron-right pull-right" onclick="electricmeter2(this.id);"></mark>');
  }

//{"action": "request", "device": "electricmeter", "data":{"nodeid":10, "cmd":"COMMAND_METER_GET", "para":{"value":"watt"}}}
    function electricmeter3(e3id){
    //layer.msg("start e3");
   var e3=new Object();
   e3.action="request";
   e3.device="electricmeter";
   e3.data={};
   e3.data.nodeid=Number(e3id); //should update
   e3.data.cmd="COMMAND_METER_GET";
   e3.data.para={};
   e3.data.para.value="watt";
   var E3=JSON.stringify(e3);
   console.log("client net send: " +E3);
    sock.send(E3);
    sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined && jsonobj.data==null && jsonobj.data==""){
  layer.msg("don't find the node!");
}else{
   
      $('span[id="'+e3id+'"]').append('<div id="added2"><p>power:'+jsonobj.data+'W</p><a id="'+e3id+'" class="fa fa-remove" onclick="removenode(this.id)"></a>&nbsp;&nbsp;&nbsp;&nbsp;<a id="'+e3id+'" class="fa fa-undo" onclick="electricmeter1(this.id)"></a></div>');
}
        }
  }

//{"action": "request", "device": "electricmeter", "data":{"nodeid":10, "cmd":"COMMAND_METER_HISTORY_GET"}}
  function getelehistory(e5id){
   var e5=new Object();
   e5.action="request";
   e5.device="electricmeter";
   e5.data={};
   e5.data.nodeid=Number(e5id); //should update
   e5.data.cmd="COMMAND_METER_HISTORY_GET";
   var E5=JSON.stringify(e5);
   console.log("client net send: " +E5);
    sock.send(E5);
  }


function getscene(){
    location.href="#scene";
}


function getscenestate(){
//$("#scene").append('<script>function laydate(){istime:true,format:"YYYY/MM/DD hh:mm:ss"}</script>');
layer.open({
  type: 1
  ,title: false 
  ,closeBtn: false
  ,area: '400px;'
  ,shade: 0.8
  ,id: 'LAY_layuipro' 
  ,resize: false
  ,btn: ['Close']
  ,btnAlign: 'c'
  ,moveType: 1 //0或者1
  ,content: '<div style="padding: 50px; line-height: 22px; background-color: #000; color: #fff; font-weight: 300;"><form role="form"  action="" method="post"><fieldset><legend>Edit Scene</legend><div class="form-group has-primary has-feedback"><label>Scene</label><input type="text" id="scenename" name="scenename" class="form-control" placeholder="Enter Your Scene" /></div><div class="form-group has-primary has-feedback"><label>Start Time</label><input type="text" name="scenestarttime" id="scenestarttime" class="form-control" placeholder="Enter Your Time" onclick="laydate()"/></div><div class="form-group has-primary has-feedback"><label>Device</label><input type="text" name="scenedevice" id="scenedevice" class="form-control" placeholder="Enter Your Device" /></div><input type="button" class="btn btn-default btn-block" value="Enter Scene" onclick="enterscene()"/> <hr></form></div><script>!function(){laydate({format:"YYYY/MM/DD hh:mm:ss",elem: "#starttime",istime:true})}();</script>'
  //elem: "#starttime",
  ,success: function(layero){
    var btn = layero.find('.layui-layer-btn');
    btn.find('.btn btn-default').attr({
      onclick: 'getscene()'
      ,
    });
  }
});
 

}




function getdate(){


}

function enterscene(){
  var SCENENAME=$('#scenename').val();
  var TIME=$('#scenestarttime').val();
  var SCENEDEVICE=$('#scenedevice').val();
 

  var scene=new Object();
   scene.action="REQUEST";
   scene.cmd="setscene";
   scene.data={};
   scene.data.scene=SCENENAME;
   scene.data.deviceid=SCENEDEVICE; //should update
   scene.data.para=TIME;
   var SCENE=JSON.stringify(scene);
   console.log("client net send: " +SCENE);
   alert("sock success send:"+SCENE)
    sock.send(SCENE);
    sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');
     

   location.href="#scene";
      //$("h2").html(jsonobj.data);

        }
   
}

function addsceneenter(){
    var SCENES =$("input[name='scene']").val();
   $('div[id="LAY_layuipro"]').remove();
   $('div[class="layui-layer-shade"]').remove();
$('#scene').append('<li class="list-group-item"><ui-switch ng-model="sceneswitch4"></ui-switch><a onclick="getscenestate()">'+SCENES+'<i class="fa fa-chevron-right pull-right"></i></a></li>');

}

function addscene(){
layer.open({
  type: 1
  ,title: false 
  ,closeBtn: false
  ,area: '400px;'
  ,shade: 0.8
  ,id: 'LAY_layuipro' 
  ,resize: false
  ,btn: ['Close']
  ,btnAlign: 'c'
  ,moveType: 1 //0或者1
  ,content: '<div style="padding: 50px; line-height: 22px; background-color: #000; color: #fff; font-weight:300;"><form role="form" action="" method="post"><fieldset><legend>Add Scene</legend><label>Scene</label> <input type="text" name="scene"  class="form-control" placeholder="Enter Your Scene" /><div class="form-group has-primary has-feedback"><input type="button" class="btn btn-default btn-block" value="Add Scene" onclick="addsceneenter()"/><hr></form></div>'
  ,success: function(layero){
    var btn = layero.find('.layui-layer-btn');
    btn.find('.btn btn-default').attr({
      onclick: 'getscene()'
      ,
    });
  }
});

}

function getgatewaycache(){

location.href="#/";
$("div[id='gateway'] li").remove();


   var GATEWAYCACHE=JSON.parse(localStorage.getItem("gateway"));
    var json=GATEWAYCACHE.data;


    for (var i=0;i<json.length;i++){

       
         $("#gateway").append('<li class="list-group-item" id="'+GATEWAYCACHE.data[i].gatewayip+'" onclick="getnode(this.id)" ><i class="fa fa-rss-square"></i><a id="gateway'+i+'" >'+GATEWAYCACHE.data[i].gatewayip+'<i class="fa fa-chevron-right pull-right"></i></a></li>');
         $(".maingateway").append('<div style="display:none"><form action="" method="post"><input type="text" name="gatewayip" class="gatewayclass" id="gateway'+i+'" value="'+GATEWAYCACHE.data[i].gatewayip+'" onclick="savegatewaytofile(this.id)"><input type="button"></form></div>');
     
  }

}

function savegatewaytocache(gateway){

localStorage.setItem("gateway",gateway);
console.log("save cache"+gateway);
}

//save {"action": "request", "device": "gateway", "data":{ "nodeid":1, "cmd":"COMMAND_NODE_INFO_SET", "para":{"ip":"192.168.10.169", "psk":"123456789012345678901234567890AA"}}}
function savegatewaytofile(gatewayid){
  
       var GATEWAY=$('input[id="gateway'+gatewayid+'"]').attr("value");
         var gatewayip=new Object();
         gatewayip.action="request";
         gatewayip.device="gateway";
         gatewayip.data={};
         gatewayip.data.nodeid=1;
         gatewayip.data.cmd="COMMAND_NODE_INFO_SET";
         gatewayip.data.para={};
         gatewayip.data.para.ip=GATEWAY;
         gatewayip.data.para.psk="123456789012345678901234567890AA";
        
         var GATEWAYIP=JSON.stringify(gatewayip);
         console.log("client net send: " +GATEWAYIP);
         sock.send(GATEWAYIP);
          sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined || jsonobj.data==null || jsonobj.data==""){
  layer.msg("don't find the node!");
}else{
  
      console.log("Save Success!");
}
        }
      
}

  function savegateway(){
    var GATEWAY=$(".gatewayclass").attr("value");
     $.ajax({
               type: "POST",
               url: "http://45.32.248.21:30/cgi/db/addgateway",
               data: "gatewayip="+GATEWAY,
               success: function(data){
                       //alert("success");
                  }
            });
            
      
  }
    function savenodelist(){
    var NODEID =$(".nodeidss").attr("value");
    var GATEWAY=$(".gatewayss").attr("value");
    var NODEIP =$(".nodeipss").attr("value");
    var NSCMD =$(".nscmdss").attr("value");
    var SCMD =$(".scmdss").attr("value");
   
     $.ajax({
               type: "POST",
               url: "http://45.32.248.21:30/cgi/db/addnode",
               data: "nodeid="+NODEID+"&gatewayip="+GATEWAY+"&nodeip="+NODEIP+"&nscmd="+NSCMD+"&scmd"+SCMD,
               success: function(data){
                       //alert("node save success!");
                  }
            });
            
      
  }


    function back(){
    history.back();
  }

//{"action": "request", "device": "multilevelswitch", "data":{"nodeid":12, "cmd":"COMMAND_SWITCH_MULTILEVEL_START_LEVEL_CHANGE", "para":{"level":2}}}
//light control
function lightchange(lightid) {
        var f = document.forms['lightsetting'],
        range = f['range'],
        result = f['result'],
        cachedRangeValue = localStorage.rangeValue ? localStorage.rangeValue : 100; 

    // 检测浏览器是否支持localStorage
    // 识别range input.
    var o = document.createElement('input');
    o.type = 'range';
    if ( o.type === 'text' ) alert('浏览器不支持localstoge');

    // 设置初始值
    // 无论是否本地存储了，都设置值为100
    range.value = cachedRangeValue;
    result.value = cachedRangeValue;

    // 当用户选择了个值，更新本地存储
    range.addEventListener("mouseup", function() {
    var lightset=new Object();
   lightset.action="request";
   lightset.device="multilevelswitch";
   lightset.data={};
   lightset.data.nodeid=lightid.slice(8); //should update
   lightset.data.cmd="COMMAND_SWITCH_MULTILEVEL_START_LEVEL_CHANGE";
   lightset.data.para={};
   lightset.data.para.level=Number(range.value);
   var LIGHTSET=JSON.stringify(lightset);
   console.log("client net send: " +LIGHTSET);
   sock.send(LIGHTSET);
         sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     

  
      console.log("change Success!");

        } 
        //console.log("clien net send：" + range.value );
        localStorage ? (localStorage.rangeValue = range.value) : alert("save to localstoge");
    }, false);

    // 滑动时显示选择的值
    range.addEventListener("change", function() {
        result.value = range.value;
    }, false);
                        }



/*input keep
function keyup(){
  var quantity = document.getElementById("quantity").value;
  if(isNaN(quantity) ||  parseInt(quantity)!=quantity || parseInt(quantity)<1){
    quantity = 1;
    return;
    }
  if(quantity>100){
    document.getElementById("quantity").value=quantity.substring(0,quantity.length-1);
    alert("不能大于100");
  }
}
*/
//{"action": "request", "device": "multilevelswitch", "data":{"nodeid":12, "cmd":"COMMAND_SWITCH_MULTILEVEL_START_LEVEL_CHANGE", "para":{"level":2}}}
/*+1*/
function numAdd(numadd){
  var quantity = document.getElementById("quantity"+numadd).value;
  var num_add = parseInt(quantity)+1;
  //var price=document.getElementById("price").value;
  if(quantity==""){
    num_add = 1;
  }
  if(num_add>100){
    document.getElementById("quantity"+numadd).value=num_add-1;
      layer.msg("不能大于100");
    }else{
      document.getElementById("quantity"+numadd).value=num_add;
      var Num=num_add;
      var lightadd=new Object();
   lightadd.action="request";
   lightadd.device="multilevelswitch";
   lightadd.data={};
   lightadd.data.nodeid=Number(numadd); //should update
   lightadd.data.cmd="COMMAND_SWITCH_MULTILEVEL_START_LEVEL_CHANGE";
   lightadd.data.para={};
   lightadd.data.para.level=Number(Num);
   var LIGHTADD=JSON.stringify(lightadd);
   console.log("client net send: " +LIGHTADD);
   sock.send(LIGHTADD);
         sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      console.log("add Success!");

        } 
    }
}
/*-1*/
function numDec(numdec){
  var quantity = document.getElementById("quantity"+numdec).value;
 // var price=document.getElementById("price").value;
  var num_dec = parseInt(quantity)-1;
  if(num_dec>0){
    document.getElementById("quantity"+numdec).value=num_dec;
    var Num=num_dec;

  var lightdec=new Object();
   lightdec.action="request";
   lightdec.cmd="multilevelswitch";
   lightdec.data={};
   lightdec.data.nodeid=Number(numdec); //should update
   lightdec.data.cmd="COMMAND_SWITCH_MULTILEVEL_START_LEVEL_CHANGE";
   lightdec.data.para={};
   lightdec.data.para.level=Number(Num);
   var LIGHTDEC=JSON.stringify(lightdec);
   console.log("client net send: " +LIGHTDEC);
   sock.send(LIGHTDEC);
     sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     

      console.log("del Success!");

        }
  }
}

function delmutisensor(sensorid){
 $('span[id="'+sensorid+'"] div').remove();
 $('span[id="'+sensorid+'"]').append('<mark id="'+sensorid+'" class="fa fa-chevron-right" onclick="getmutisensor(this.id)"></mark>');
}

//mutisensor test {"action": "request", "device": "multisensor", "data":{"nodeid":32817, "cmd":"COMMAND_SUPPORTED_GET_SENSOR"}}
/*data    {"action": "REQUEST", "cmd": "multisensor", "data":{"nodeid":节点id, "op":"COMMAND_SUPPORTED_GET_SENSOR"}} */
function getmutisensor(sensorid){
  $('mark[id="'+sensorid+'"]').remove();
  $('span[id="'+sensorid+'"]').append('<div><mark id="'+sensorid+'" class="fa fa-arrow-down pull-right" onclick="delmutisensor(this.id)" ></mark><form method="post" name="lightsetting"><p>Light: <br /><a id="'+sensorid+'" onclick="numDec(this.id)">-</a> <input type="range" name="range" min="0" max="100" id="quantity'+sensorid+'"  step="1" value="100" onchange="lightchange(this.id)"><output name="result"></output><a id="'+sensorid+'" onclick="numAdd(this.id)">+</a></p><input type="hidden" value="28.1" class="form-group has-primary" id="price" /></form></div>');
var getmutisensor=new Object();
   getmutisensor.action="request";
   getmutisensor.device="multisensor";
   getmutisensor.data={};
   getmutisensor.data.nodeid=Number(sensorid);  //should update
   getmutisensor.data.cmd="COMMAND_SUPPORTED_GET_SENSOR";
 
   var GETMUTISENSOR=JSON.stringify(getmutisensor);
       //layer.msg("start get switch");
  console.log("client net send: " +GETMUTISENSOR);
  sock.send(GETMUTISENSOR);

sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
mutisensoroperation(sensorid);
      //console.log("del Success!");

        }



}
//

//mutiscale {"action": "REQUEST", "cmd": "multisensor", "data":{"nodeid":32817, "op":"COMMAND_SUPPORTED_GET_SCALE", "para":{"sensortype":35}}}
function mutisensoroperation(operation){
var getscale=new Object();
   getscale.action="request";
   getscale.device="multisensor";
   getscale.data={};
   getscale.data.nodeid=Number(operation);  //should update
   getscale.data.cmd="COMMAND_SUPPORTED_GET_SCALE";
   getscale.data.para={};
   getscale.data.para.sensortype=35;
   var GETSCALE=JSON.stringify(getscale);
       //layer.msg("start get switch");
  
  console.log("client net send: " +GETSCALE);
  sock.send(GETSCALE);

  sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
     
     
        setTimeout('getPM('+operation+')',500);
      

        }

}

//{"action": "REQUEST", "cmd": "multisensor", "data":{"nodeid":32817, "op":"COMMAND_GET", "para":{"sensortype":35, "scale":2}}}
function getPM(pm){
var getpm=new Object();
   getpm.action="request";
   getpm.device="multisensor";
   getpm.data={};
   getpm.data.nodeid=pm;
   getpm.data.cmd="COMMAND_GET";
   getpm.data.para={};
   getpm.data.para.sensortype=35;  //should update
   getpm.data.para.scale=2;
 
   var GETPM=JSON.stringify(getpm);
       //layer.msg("start get switch");
  console.log("client net send: " +GETPM);
  sock.send(GETPM);
  sock.onmessage = function(e) {

    console.log("according net received: " + e.data);
       var datas=e.data
      var jsonobj=eval('('+datas+')'); 

        $('span[id="'+pm+'"]').append('<div><p>PM2.5:<strong>'+jsonobj.data+'μg/m3</strong></p></div>');

     setTimeout('getTemperature('+pm+');',500);
      

        }
}

//{"action": "request", "cmd": "multisensor", "data":{"nodeid":32817, "op":"COMMAND_GET", "para":{"sensortype":35, "scale":1}}}
function getTemperature(temperature){
var gettemper=new Object();
   gettemper.action="request";
   gettemper.device="multisensor";
   gettemper.data={};
   gettemper.data.nodeid=temperature;
   gettemper.data.cmd="COMMAND_GET";
   gettemper.data.para={};
   gettemper.data.para.sensortype=1;  //should update
   gettemper.data.para.scale=1;
 
   var GETTEMPER=JSON.stringify(gettemper);
       //layer.msg("start get switch");
  console.log("client net send: " +GETTEMPER);
  sock.send(GETTEMPER);
  sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
       var datas=e.data;
      var jsonobj=eval('('+datas+')'); 
     $('span[id="'+temperature+'"]').append('<div><p>temperature:<strong>'+jsonobj.data+'℃</strong></p></div>');
     
      
        }
}
