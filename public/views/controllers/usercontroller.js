angular.module('userCtrl',[])

.controller('userController',function($rootScope){
var vm=this;
vm.usernames=[];
var socket=io();

socket.on('usernames',function(username){
	console.log(username);
	$rootScope.$apply(function(){
		
		vm.usernames.push(username);
		
		
		
		
	})
	
})




vm.username=undefined;
vm.createUser=function(username){
	
	$rootScope.$broadcast('new-user',username);
}





});