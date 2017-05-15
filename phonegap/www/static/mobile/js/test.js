function timetest() {　
      // console.time("on cost");
  
      for(var i=0;i<1000;i++){
　     switchon();
      // console.timeEnd("on cost");
      // console.time("off cost");
      switchoff();
    }
 
    
      // console.timeEnd("off cost");
　     //meter1=setTimeout("timetest()", 100);
   } 

function testmo(){
   for(var i=0;i<100;i++){
　     switchson();
      // console.timeEnd("on cost");

      // console.time("off cost");
      switchsoff();
    }
}

function switchson(){
     var SWITCHONM='{"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":32769, "op":"set", "para":"on"}}';
     sock.send(SWITCHONM);
}

function switchsoff(){
 var SWITCHOFFM='{"action": "REQUEST", "cmd": "binaryswitch", "data":{"nodeid":32769, "op":"set", "para":"off"}}';
     sock.send(SWITCHOFFM);
}

  function back(){
    history.back();
  }