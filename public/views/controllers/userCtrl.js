angular.module('userCntrl',[])

.controller('userController',function(User,$location,$window){

	vm=this;

	vm.signupUser=function(){
		console.log("hello");
		vm.message='';
		User.create(vm.userData)
			.then(function(response){
				vm.userData={};
				vm.message=response.data.message;
				$window.localStorage.setItem('token',response.data.token);
				$location.path('/');

			})
	}


})