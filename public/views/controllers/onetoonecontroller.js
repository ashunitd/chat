angular.module('onetoonecontroller',[])

.controller('oneCtrl',function($rootScope){
var vm=this;
vm.donewMessage=undefined;
vm.msgs=[];
vm.ids=[];


var socket=io();

socket.emit("test","passing message");
socket.on("message",function(msg,id){

	$rootScope.$apply(function(){

		vm.msgs.push(msg);
		vm.ids.push(id);
		
	})
	
})



vm.doMessage=function(){

	var id=vm.id;
	var donewMessage={
		 username:vm.username,
		 msg:vm.donewMessage,
		 id:vm.id
		 

	};
	
	socket.emit("my-message",donewMessage);
	vm.donewMessage=undefined;
};


vm.username=undefined;
$rootScope.$on('new-user',function(event,data,id){
	vm.id=socket.id;
	console.log(vm.id);
	vm.username=data;
	
	

});

$rootScope.$watch(function(){
	return vm.username
},function(){
	if(vm.username){
		console.log("The Username is " + vm.username);
	}
})


});