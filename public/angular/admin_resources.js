console.log('admin_resources.js linked');

var AppServices = angular.module('appServices', ['ngResource']);

// gets the meta-data summary of the website
AppServices.factory('Summary', ['$resource', function($resource) {
	return $resource('/api/datasummary');
}]);

AppServices.factory('Series', ['$resource', function($resource) {
	return $resource('/api/series/:id', 
		{id: '@series_id'}, 
		{update: {method: "PUT"}
	});
}]);

AppServices.factory('Episode', ['$resource', function($resource) {
	return $resource('/api/series/:series_id/episodes/:episode_id', 
	{
		series_id: '@series_id',
		episode_id: '@episode_id'
	}, 
	{
		get: {method: "GET", isArray: true},
		update: {method: "PUT"}
	});
}]);

AppServices.factory('Article', ['$resource', function($resource) {
	return $resource ('/api/articles/:id',
		{id: '@article_id'}, 
		{update: {method: "PUT"}}
	);
}]);