// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('PortusHome', [
  'ngRoute',
  'mobile-angular-ui',
  
  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
  // it is at a very beginning stage, so please be careful if you like to use
  // in production. This is intended to provide a flexible, integrated and and 
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like 
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);


app.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
}]);

// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 
app.config(function($routeProvider) {
  $routeProvider.when('/',             {templateUrl: 'static/mobile/page/index.html', reloadOnSearch: false});
  $routeProvider.when('/reg',          {templateUrl: 'static/mobile/page/reg.html', reloadOnSearch: false});  
  $routeProvider.when('/switch',       {templateUrl: 'static/mobile/page/switch.html', reloadOnSearch: false}); 
  $routeProvider.when('/gateway',      {templateUrl: 'static/mobile/page/gateway.html', reloadOnSearch: false});
  $routeProvider.when('/login',        {templateUrl: '/static/mobile/page/login.html', reloadOnSearch: false}); 
  $routeProvider.when('/category',     {templateUrl: 'static/mobile/page/category.html', reloadOnSearch: false}); 
  $routeProvider.when('/homesetting',  {templateUrl: 'static/mobile/page/homesetting.html', reloadOnSearch: false}); 
  $routeProvider.when('/indexsetting', {templateUrl: 'static/mobile/page/indexsetting.html', reloadOnSearch: false});
  $routeProvider.when('/light',        {templateUrl: 'static/mobile/page/light.html', reloadOnSearch: false}); 
  $routeProvider.when('/environment',  {templateUrl: 'static/mobile/page/environment.html', reloadOnSearch: false}); 
  $routeProvider.when('/power',        {templateUrl: 'static/mobile/page/power.html', reloadOnSearch: false});
  $routeProvider.when('/scene',        {templateUrl: 'static/mobile/page/scene.html', reloadOnSearch: false});
  $routeProvider.when('/addscene',     {templateUrl: 'static/mobile/page/addscene.html', reloadOnSearch: false});   
  //$routeProvider.when();

});

//
// For this trivial demo we have just a unique MainController 
// for everything
//
app.controller('MainController', function($rootScope, $scope){

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;
  
  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });

  // Fake text i used here and there.
  $scope.lorem = 'Obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';

  // 
  // 'Scroll' screen
  // 
  var scrollItems = [];

  for (var i=1; i<=100; i++) {
    scrollItems.push('Item ' + i);
  }

  $scope.scrollItems = scrollItems;

  $scope.bottomReached = function() {
    alert('Congrats you scrolled to the end of the list!');
  }

  
  $scope.chatUsers = [
    { name: 'Carlos Flowers', online: true },
    { name: 'Byron Taylor', online: true },
    { name: 'Jana  Terry', online: true },
    { name: 'Darryl  Stone', online: true },
    { name: 'Fannie  Carlson', online: true },
    { name: 'Holly Nguyen', online: true },
    { name: 'Bill  Chavez', online: true },
    { name: 'Veronica  Maxwell', online: true },
    { name: 'Jessica Webster', online: true },
    { name: 'Jackie  Barton', online: true },
    { name: 'Crystal Drake', online: false },
    { name: 'Milton  Dean', online: false },
    { name: 'Joann Johnston', online: false },
    { name: 'Cora  Vaughn', online: false },
    { name: 'Nina  Briggs', online: false },
    { name: 'Casey Turner', online: false },
    { name: 'Jimmie  Wilson', online: false },
    { name: 'Nathaniel Steele', online: false },
    { name: 'Aubrey  Cole', online: false },
    { name: 'Donnie  Summers', online: false },
    { name: 'Kate  Myers', online: false },
    { name: 'Priscilla Hawkins', online: false },
    { name: 'Joe Barker', online: false },
    { name: 'Lee Norman', online: false },
    { name: 'Ebony Rice', online: false }
  ];

  //
  // 'Forms' screen
  //  
  $scope.rememberMe = true;

  


 


});

app.controller('register',['$scope','$http',function($scope,$http){
     $scope.reg= function(){
          //var data = 'username=admin&password=13456'
         $http({
             method: 'POST',
             url: '/',
             data: $.param($scope.formData), // pass in data as strings
             headers: {'Content-Type':'application/x-www-form-urlencoded; http-equiv="Access-Control-Allow-Origin" ;charset=UTF-8'}  
         }).success(function (data) {
           if(data.errno==0x00){

layer.msg("please wait a moment!");
    
             
          
          }else if(data.errno==0x01){
                      layer.msg('注册失败，请重新注册', {
               offset: 0,
               shift: 6
});
           
          }
          });
 
     };




$scope.dbreg= function(){
         $http({
             method: 'POST',
             url: 'http://45.32.248.21:30/cgi/db/reg',
             data: $.param($scope.formData), // pass in data as strings
             headers: {'Content-Type':'application/x-www-form-urlencoded; http-equiv="Access-Control-Allow-Origin" ;charset=UTF-8'}  
         }).success(function (data) {
          layer.msg('please login!'); 
          location.href="/";
          });
 
     };



 }]);

 app.controller('login',['$scope','$http',function($scope,$http){
     $scope.login= function(){
         $http({
             method: 'POST',
             url: '/data/login',
             data: $.param($scope.formData), // pass in data as strings
             headers: {'Content-Type':'application/x-www-form-urlencoded; http-equiv="Access-Control-Allow-Origin" ;charset=UTF-8'}  
         }).success(function (data) {
           if(data.error==0x12){
            layer.msg('用户名不存在');
          }else if(data.error==0x14){
             layer.msg('密码不正确');
          }else if(data.error==0x17){
             layer.msg('用户已登录', {
               offset: 0,
               shift: 6
});
           }else if(data.error==0x00){  

        layer.load(1);
setTimeout(function(){
  layer.closeAll('loading');
}, 10000);
       
              window.location.href = "#/";
            
           }
          });
     };
 }]);

 
app.controller('scene', function($rootScope, $scope){

   
  $scope.sceneswitch1= false;
  $scope.sceneswitch2= false;
  $scope.sceneswitch3= false;
  $scope.sceneswitch4= false;

 


});


    //    app.controller('node',['$scope','$cacheFactory',function($scope,$cacheFactory){  
    //     var cache = $cacheFactory.get('cache01');  
    //     var gatewaysip = cache.get('gatewayip');  
    //     console.log(gatewaysip);  
    // }]);