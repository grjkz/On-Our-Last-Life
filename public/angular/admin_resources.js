console.log('admin_resources.js linked');

var AppServices = angular.module('appServices', ['ngResource']);

AppServices.factory('Series', ['$resource', function($resource) {
	return $resource('/api/series/:id', 
		{id: '@series_id'}, 
		{update: {method: "PUT"}
	});
}]);