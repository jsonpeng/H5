   var sock = null;
   //Set the websocket link path
   var wsuri = 'ws://'+window.location.host+'/ws?uid='+Uid;

  window.onload = init();

   function init(){
     wsstart();
   //can add other start function
    }

    //start ws
    function wsstart() {

        console.log("onload to "+window.location.host);
        sock = new WebSocket(wsuri);
        sock.onopen = function() {
            console.log("connected to " + wsuri);
          
            discovery();
          // localstoge();
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
         
        $("#gateway").append('<li class="list-group-item" id="'+jsonobj.data[i].gatewayip+'" onclick="getnode(this.id)" ><i class="fa fa-rss-square"></i><a id="gateway'+i+'" >'+jsonobj.data[i].gatewayip+'<i class="fa fa-chevron-right pull-right"></i></a></li>');
        $(".maingateway").append('<div style="display:none"><form action="" method="post"><input type="text" name="gatewayip" class="gatewayclass" id="gateway'+i+'" value="'+jsonobj.data[i].gatewayip+'" onclick="savegatewaytofile(this.id)"><input type="button"></form></div>');
      savegatewaytocache(e.data);   
      savegatewaytofile(i);
 }
        }else if(jsonobj.data[0].nscmd !==undefined && jsonobj.data[0].nscmd!==null && jsonobj.data[0].nscmd !==""){
         for(var i=0;i<json.length;i++){
          if (jsonobj.data[i].nodeip =="" && jsonobj.data[i].scmd.length<4){
          //mutisensor test
           
          $(".nodeids").append('<li class="list-group-item" id="'+jsonobj.data[i].nodeid+'">MUTISWITCH<span id="'+jsonobj.data[i].nodeid+'"><p id="nodeid'+i+'">nodeid:'+jsonobj.data[i].nodeid+'</p></span><a><mark id="'+jsonobj.data[i].nodeid+'" class="fa fa-chevron-right" onclick="getmutisensor(this.id)"></mark></a></li>'); 
               
                      
          }else if (jsonobj.data[i].scmd ==""){
$(".nodeids").append('<div style="display:none"><form action="" method="post"><input type="text" name="nodeid" class="nodeidss " value="'+jsonobj.data[i].nodeid+'"><input type="text" name="gatewayip" class="gatewayss" value="192.168.10.215"><input type="text" name="nodeip" class="nodeipss" value="'+jsonobj.data[i].nodeip+'"><input type="text" name="nscmd" class="nscmdss" value="'+jsonobj.data[i].nscmd+'"><input type="text" name="nodeip" class="scmdss" value="'+jsonobj.data[i].scmd+'"><input type="button" onclick="savenodelist()"></form></div><li class="list-group-item" id="'+jsonobj.data[i].nodeid+'"><i class=" fa fa-refresh fa-spin"></i><span id="'+jsonobj.data[i].nodeid+'"><p id="nodeid'+i+'">nodeid:'+jsonobj.data[i].nodeid+'</p></span><a><mark id="'+jsonobj.data[i].nodeid+'" class="fa fa-chevron-right" onclick="getallstate(this.id)"></mark></a></li>');

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
 //DISCOVERY data     var DISCOVERY='{"action":"REQUEST","cmd":"discovery","data":""}';
    function discovery() {
   var discoverys=new Object();
   discoverys.action="REQUEST";
   discoverys.cmd="discovery";
   discoverys.data={};
   var DISCOVERY =JSON.stringify(discoverys) 
        layer.load(1);
setTimeout(function(){
  layer.closeAll('loading');
}, 10000);
        //layer.msg("start discovery,please stand 10s");
        window.location.href="#/index";
        console.log("client net send: " +DISCOVERY);
        sock.send(DISCOVERY);
        reply();
  
    }


 //NODELIST data       var NODELIST='{"action": "REQUEST", "cmd": "getnodelist", "data":{"ip":"192.168.10.217","psk":"123456789012345678901234567890AA"}}';
    function getnode(gatewayip){
   var nodelist=new Object();
   var NODEIP=gatewayip;
   //$(".gatewayclass").attr("value");
   nodelist.action="REQUEST";
   nodelist.cmd="getnodelist";
   nodelist.data={};
   nodelist.data.ip=NODEIP;
   nodelist.data.psk="123456789012345678901234567890AA";
   var NODELIST =JSON.stringify(nodelist); 
   //alert(NODEIP);
           layer.load(1);
setTimeout(function(){
  layer.closeAll('loading');
}, 1000);
//alert(NODEIP);

//var NODEIPS=$("#gateway0").html();
    location.href="#/switch"+"?nodeip="+NODEIP;
     console.log("client net send: " +NODELIST);
      sock.send(NODELIST);
      //sock.send(E2);
     
      reply(); 

      //electricmeter2();

  }


   function addnode(removeid){

   //ADDNODE data
   var ADDNODE='{"action": "REQUEST", "cmd":"addnode", "data":{"nodeid":1}}';
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
   var REMOVENODE='{"action": "REQUEST", "cmd":"removenode", "data": {"nodeid":1}}';
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

//GETSWITCH data       var GETSWITCH='{"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":6, "op":"get", "para":""}}';
  function getswitch(getid){
   var getswitchs=new Object();
   getswitchs.action="REQUEST";
   getswitchs.cmd="binaryswitch";
   getswitchs.data={};
   getswitchs.data.nodeid=Number(getid);  //should update
   getswitchs.data.op="get";
   getswitchs.data.para="";
   var GETSWITCH=JSON.stringify(getswitchs);
       //layer.msg("start get switch");
      console.log("client net send: " +GETSWITCH);
       sock.send(GETSWITCH);
       reply();   
  }

  function switchonoroff(switchid){
if($('input[id="'+switchid+'"]').prop("checked")){
    //alert("执行开操作");
   //SWITCHON data        var SWITCHON='{"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":6, "op":"set", "para":"on"}}';
   var nowid =switchid.slice(10);
   var switchons=new Object();
   switchons.action="REQUEST";
   switchons.cmd="binaryswitch";
   switchons.data={};
   switchons.data.nodeid=Number(nowid); //should update
   switchons.data.op="set";
   switchons.data.para="on";
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
   switchoffs.action="REQUEST";
   switchoffs.cmd="binaryswitch";
   switchoffs.data={};
   switchoffs.data.nodeid=Number(nowid);
   switchoffs.data.op="set";
   switchoffs.data.para="off";
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



  function switchon(onid){
       var switchons=new Object();
   switchons.action="REQUEST";
   switchons.cmd="binaryswitch";
   switchons.data={};
   switchons.data.nodeid=Number(onid); //should update
   switchons.data.op="set";
   switchons.data.para="on";
   var SWITCHON=JSON.stringify(switchons);
 console.log(SWITCHON);
   sock.send(SWITCHON);
       //sock.send(SWITCHON);
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


    function switchoff(offid){
   var switchoffs=new Object();
   switchoffs.action="REQUEST";
   switchoffs.cmd="binaryswitch";
   switchoffs.data={};
   switchoffs.data.nodeid=Number(offid);
   switchoffs.data.op="set";
   switchoffs.data.para="off";
   var SWITCHOFF=JSON.stringify(switchoffs);
   console.log(SWITCHOFF);
   sock.send(SWITCHOFF);
       //sock.send(SWITCHOFF);
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
  

  function resetnet(){
     //RESET data
   var RESET='{"action": "REQUEST", "cmd": "resetnetwork", "data": {"nodeid":1}}'; 

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

//   var E1='{"action": "REQUEST", "cmd": "electricmeter", "data":{"nodeid":9, "op":"reset"}}';
  function electricmeter1(e1id){
    var e1=new Object();
   e1.action="REQUEST";
   e1.cmd="electricmeter";
   e1.data={};
   e1.data.nodeid=Number(e1id); //should update
   e1.data.op="get";
   e1.data.para="power";
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
   getswitchs.action="REQUEST";
   getswitchs.cmd="binaryswitch";
   getswitchs.data={};
   getswitchs.data.nodeid=Number(allid);  //should update
   getswitchs.data.op="get";
   getswitchs.data.para="";
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


//   var E2='{"action": "REQUEST", "cmd": "electricmeter", "data":{"nodeid":9, "op":"get", "para":"power"}}';var E3='{"action": "REQUEST", "cmd": "electricmeter", "data":{"nodeid":9, "op":"get", "para":"watt"}}';
    function electricmeter2(e2id){
   var e2=new Object();
   e2.action="REQUEST";
   e2.cmd="electricmeter";
   e2.data={};
   e2.data.nodeid=Number(e2id); //should update
   e2.data.op="get";
   e2.data.para="power";
   var E2=JSON.stringify(e2);
   console.log("client net send: " +E2);
   sock.send(E2);
   
          sock.onmessage = function(e) {
    console.log("according net received: " + e.data);
      
      var datas=e.data
      var jsonobj=eval('('+datas+')');  
     
if (jsonobj.data==undefined && jsonobj.data==null && jsonobj.data==""){
  layer.msg("don't find the node!");
}else{
  //$(". default ").attr("class", " hover_s fl fv lv ");
   $('mark[id="'+e2id+'"]').removeAttr("class");
   $('span[id="'+e2id+'"]').append('<div id="added1"><mark id="'+e2id+'" class="fa fa-arrow-down pull-right" onclick="electricmeter4(this.id)" ></mark><p>consumption:'+jsonobj.data+'kilowatt hour</p></div>');
     //(jsonobj.data);
    setTimeout('electricmeter3('+e2id+')',500);
}
        }

  }


  function electricmeter4(e4id){
//$('mark[id="'+e2id+'"]').removeAttr("class");
$('div[id="added1"]').remove();
$('div[id="added2"]').remove();
$('span[id="'+e4id+'"]').append('<mark id="'+e4id+'" class="fa fa-chevron-right pull-right" onclick="electricmeter2(this.id);"></mark>');
  }


    function electricmeter3(e3id){
    //layer.msg("start e3");
   var e3=new Object();
   e3.action="REQUEST";
   e3.cmd="electricmeter";
   e3.data={};
   e3.data.nodeid=Number(e3id); //should update
   e3.data.op="get";
   e3.data.para="watt";
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

location.href="#index";
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

function savegatewaytofile(gatewayid){
  
       var GATEWAY=$('input[id="gateway'+gatewayid+'"]').attr("value");
         var gatewayip=new Object();
         gatewayip.action="REQUEST";
         gatewayip.cmd="setcontroler";
         gatewayip.data={};
         gatewayip.data.ip=GATEWAY; 
        
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
   lightset.action="REQUEST";
   lightset.cmd="handlemultilevelswitch";
   lightset.data={};
   lightset.data.nodeid=lightid.slice(8); //should update
   lightset.data.op="set";
   lightset.data.para=Number(range.value);
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
   lightadd.action="REQUEST";
   lightadd.cmd="handlemultilevelswitch";
   lightadd.data={};
   lightadd.data.nodeid=Number(numadd); //should update
   lightadd.data.op="change";
   lightadd.data.para=Number(Num);
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
   lightdec.action="REQUEST";
   lightdec.cmd="handlemultilevelswitch";
   lightdec.data={};
   lightdec.data.nodeid=Number(numdec); //should update
   lightdec.data.op="change";
   lightdec.data.para=Number(Num);
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
//mutisensor test
/*data    {"action": "REQUEST", "cmd": "multisensor", "data":{"nodeid":节点id, "op":"CMD_SUPPORTED_GET_SENSOR"}} */
function getmutisensor(sensorid){
  $('span[id="'+sensorid+'"]').append('<form method="post" name="lightsetting"><p>Light: <br /><a id="'+sensorid+'" onclick="numDec(this.id)">-</a> <input type="range" name="range" min="0" max="100" id="quantity'+sensorid+'"  step="1" value="100" onchange="lightchange(this.id)"><output name="result"></output><a id="'+sensorid+'" onclick="numAdd(this.id)">+</a></p><input type="hidden" value="28.1" class="form-group has-primary" id="price" /></form>');
var getmutisensor=new Object();
   getmutisensor.action="REQUEST";
   getmutisensor.cmd="multisensor";
   getmutisensor.data={};
   getmutisensor.data.nodeid=Number(sensorid);  //should update
   getmutisensor.data.op="CMD_SUPPORTED_GET_SENSOR";
 
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

//mutiscale {"action": "REQUEST", "cmd": "multisensor", "data":{"nodeid":32817, "op":"CMD_SUPPORTED_GET_SCALE", "para":{"sensortype":35}}}
function mutisensoroperation(operation){
var getscale=new Object();
   getscale.action="REQUEST";
   getscale.cmd="multisensor";
   getscale.data={};
   getscale.data.nodeid=Number(operation);  //should update
   getscale.data.op="CMD_SUPPORTED_GET_SCALE";
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

//{"action": "REQUEST", "cmd": "multisensor", "data":{"nodeid":32817, "op":"CMD_GET", "para":{"sensortype":35, "scale":2}}}
function getPM(pm){
var getpm=new Object();
   getpm.action="REQUEST";
   getpm.cmd="multisensor";
   getpm.data={};
   getpm.data.nodeid=pm;
   getpm.data.op="CMD_GET";
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

        $('span[id="'+pm+'"]').append('<p>PM2.5:<strong>'+jsonobj.data+'μg/m3</strong></p>');

     setTimeout('getTemperature('+pm+');',500);
      

        }
}

//{"action": "REQUEST", "cmd": "multisensor", "data":{"nodeid":32817, "op":"CMD_GET", "para":{"sensortype":35, "scale":1}}}
function getTemperature(temperature){
var gettemper=new Object();
   gettemper.action="REQUEST";
   gettemper.cmd="multisensor";
   gettemper.data={};
   gettemper.data.nodeid=temperature;
   gettemper.data.op="CMD_GET";
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
     $('span[id="'+temperature+'"]').append('<p>temperature:<strong>'+jsonobj.data+'℃</strong></p>');
     
      
        }
}
