angular.module('chatApp',['appRoutes','chatController','userCtrl','userCntrl','onetoonecontroller','userService','loginController','loginService'])


.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
})