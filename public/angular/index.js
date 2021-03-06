console.log('indexApp.js linked');
var App = angular.module('App',['ngRoute']);

App.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/angular/views/home.html'
		})
		.when('/team', {
			templateUrl: '/angular/views/team.html',
			// controller: 'teamController',
		})
		.when('/faq', {
			templateUrl: '/angular/views/faq.html'
		})
		.otherwise({
			redirectTo: '/'
		})
});