console.log('admin_controllers.js linked');

var AppControllers = angular.module('appControllers', []);

AppControllers.controller('homeCtrl', ['$scope', function($scope) {
	
}]);


AppControllers.controller('addcontentCtrl', ['$scope', 'Series', function($scope, Series) {
	var series = Series.query();
}]);