angular.module('userService',[])

.factory('User',function($http){
	userFactory={};
	userFactory.create=function(userData){
		console.log(userData);
		return $http.post('/api/signup',userData);

	}
	return userFactory;
});