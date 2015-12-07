console.log('admin_resources.js linked');

var AppServices = angular.module('appServices', ['ngResource']);

AppServices.factory('Series', ['$resource', function($resource) {
	return $resource('/api/series/:id', 
		{id: '@series_id'}, 
		{update: {method: "PUT"}
	});
}]);

AppServices.factory('Episode', ['$resource', function($resource) {
	return $resource('/api/episodes/:id', 
		{id: '@episode_id'}, 
		{update: {method: "PUT"}
	});
}]);