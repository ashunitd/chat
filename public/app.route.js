angular.module('appRoutes',['ngRoute'])


	.config(function($routeProvider,$locationProvider){

		$routeProvider

			.when('/',{
				templateUrl:'views/pages/home.html',
				controller:'loginCtrl',
				controllerAs:'main'
				
				
			})
			.when('/login_register',{
				templateUrl:'views/pages/login_register.html'
				
			})
			
		$locationProvider.html5Mode(true);

})