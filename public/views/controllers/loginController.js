angular.module('loginController',[])


.controller('loginCtrl',function($route,$rootScope,$location,Auth){
	var vm=this;
	vm.loggedIn=Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart',function(){
		vm.loggedIn=Auth.isLoggedIn();
		
		Auth.getUser()
			.then(function(data){
				vm.user=data.data;

				

			});
			
	});


	vm.doLogin=function(){
		vm.processing=true;
		vm.error='';
		
		

		Auth.login(vm.loginData.email,vm.loginData.password)
			.success(function(data){
				vm.processing=false;
				Auth.getUser()
					.then(function(data){
						vm.user=data.data;
						
						
					});
					console.log(data);
					if(data.success==true){
						$route.reload();
					}else{
						vm.error=data.message;
					}

			});
	}
	vm.doLogout=function(){
		Auth.logout();
		$route.reload();
	}

})