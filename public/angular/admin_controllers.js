console.log('admin_controllers.js linked');

var AppControllers = angular.module('appControllers', []);

AppControllers.controller('homeCtrl', ['$scope', function($scope) {
	$scope.message = "home page";
}]);


AppControllers.controller('addcontentCtrl', ['$scope', function($scope) {
	$scope.message = "add content page";
}]);


AppControllers.controller('seriesCtrl', ['$scope', 'Series',function($scope, Series) {
	$scope.series = Series.query();
	$scope.editItem = new Series;

	// fills form with respective series data
	$scope.fillForm = function(index) {
		$scope.editItem = $scope.series[index];
		// console.log(editItem)
		$scope.seriesName = $scope.editItem.name;
		$scope.seriesDescription = $scope.editItem.series_description;
	};

	// updates the db when 'update-button' clicked
	$scope.update = function() {
		// if no series has been clicked on, do nothing
		if (!$scope.editItem.series_id) { console.log('Pick something to edit first!'); return false; }
		
		$scope.editItem.name = $scope.seriesName;
		$scope.editItem.series_description = $scope.seriesDescription;
		console.log($scope.editItem)

		$scope.editItem.$update();
	};
}]);