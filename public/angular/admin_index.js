console.log('admin_index.js linked');

var App = angular.module('App',['ngRoute', 'appControllers', 'appServices']);

App.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'angular/views/admin/home.html',
			controller: 'homeCtrl'
		})
		
		.when('/addcontent', {
			templateUrl: 'angular/views/admin/add_content.html'
		})
		
		.when('/series', {
			templateUrl: 'angular/views/admin/show_series.html'
		})
		
		.when('/series/:id', {
			templateUrl: 'angular/views/admin/show_episodes.html'
		})
		
		.otherwise({
			redirectTo: '/'
		});
}]);