console.log('admin_index.js linked');

var App = angular.module('App',['ngRoute', 'appControllers', 'appServices']);

App.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'angular/views/admin/home.html',
			controller: 'homeCtrl'
		})
		
		.when('/addcontent', {
			templateUrl: 'angular/views/admin/add_content.html',
			controller: 'addcontentCtrl'
		})
		
		.when('/series', {
			templateUrl: 'angular/views/admin/show_series.html',
			controller: 'seriesCtrl'
		})
		
		.when('/series/:id', {
			templateUrl: 'angular/views/admin/show_episodes.html',
			controller: 'episodesCtrl'
		})
		
		.otherwise({
			redirectTo: '/'
		});
}]);