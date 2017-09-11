angular.module('chatController',[])

.controller('chatCtrl',function($rootScope){
var vm=this;
vm.newMessage=undefined;
vm.messages=[];
vm.ids=[];


var socket=io();


socket.on("recieved",function(msg,id){
	console.log(msg);
	$rootScope.$apply(function(){
		vm.messages.push(msg);
		vm.ids.push(id);
		
	})
	
})



vm.sendMessage=function(){
	var newMessage={
		 username:vm.username,
		 message:vm.newMessage,
		 

	};
	socket.emit("new-message",newMessage);
	vm.newMessage=undefined;
};


vm.username=undefined;
$rootScope.$on('new-user',function(event,data,id){
	vm.id=socket.id;
	vm.username=data;
	socket.emit("connected",vm.username);

	
	

});

$rootScope.$watch(function(){
	return vm.username
},function(){
	if(vm.username){
		console.log("The Username is " + vm.username);
	}
})


});