console.log('admin_controllers.js linked');

var AppControllers = angular.module('appControllers', []);

AppControllers.controller('homeCtrl', ['$scope', function($scope) {
	$scope.message = "home page";
}]);


AppControllers.controller('addcontentCtrl', ['$scope', 'Series', 'Episode', function($scope, Series, Episode) {
	$scope.series = Series.query(function(data) {
		// fix empty <option> issue
		$scope.seriesId = $scope.series[0].series_id;
		debugger
	});


	// add new series
	$scope.addSeries = function() {
		var newSeries = new Series();
		newSeries.name = $scope.seriesName;
		newSeries.description = $scope.seriesDescription;

		// console.log(newSeries)
		newSeries.$save(function(res) {
			console.log(response)
			if (res.error) {
				// error handler
			} else {
				// send global message
				// push to series array? to make it update select>option
			}
		});
	};

	// add new episode
	$scope.addEpisode = function() {
		var newEpisode = new Episode();

		newEpisode.series_id = $scope.seriesId;
		newEpisode.ep_index = $scope.epIndex;
		newEpisode.ep_num = $scope.epNum;
		newEpisode.title = $scope.eptitle;
		newEpisode.ep_description = $scope.epDescription;
		newEpisode.href = $scope.epHref;
		newEpisode.embeded = $scope.epEmbeded;

		newEpisode.$save(function(res) {
			if (res.error) {
				// error handler
			} else {
				// success message
			}
		});
	};
}]);


AppControllers.controller('seriesCtrl', ['$scope', 'Series',function($scope, Series) {
	
	$scope.series = Series.query();
	$scope.editItem = new Series();

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

		Series.update($scope.editItem);
	};
}]);