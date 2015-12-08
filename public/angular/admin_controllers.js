console.log('admin_controllers.js linked');

var AppControllers = angular.module('appControllers', []);

AppControllers.controller('homeCtrl', ['$scope', function($scope) {
	$scope.message = "home page";
}]);


AppControllers.controller('addcontentCtrl', ['$scope', 'Series', 'Episode', function($scope, Series, Episode) {
	$scope.series = Series.query();

	// add new series
	$scope.addSeries = function() {
		var newSeries = new Series();
		newSeries.name = $scope.seriesName;
		newSeries.description = $scope.seriesDescription;

		newSeries.$save(function(res) {
			console.log(res)
			if (res.error) {
				// api's error handler
				globalMessage("Error: " + res.error);
			} else {
				globalMessage($scope.seriesName + " has been added!");

				var newId = res.insertId;
				// push to series array? to make it update select>option
				$scope.series.push({series_id: newId, name: $scope.seriesName, description: $scope.seriesDescription});
			}
		}, function(err) {
			console.log(err);
			globalMessage("Something went wrong! Try again later.");
		});
	};

	// add new episode
	$scope.addEpisode = function() {
		var newEpisode = new Episode();

		newEpisode.series_id = $scope.seriesObj.series_id;
		newEpisode.ep_index = $scope.epIndex;
		newEpisode.ep_num = $scope.epNum;
		newEpisode.title = $scope.epTitle;
		newEpisode.ep_description = $scope.epDescription;
		newEpisode.href = $scope.epHref;
		newEpisode.embeded = $scope.epEmbeded;

		newEpisode.$save(function(res) {
			console.log(res)
			if (res.error) {
				// api's error handler
				globalMessage("Error: " + res.error);
			} else {
				globalMessage($scope.epTitle + " has been added!");
			}
		}, function(err) {
			console.log(err);
			globalMessage("Something went wrong! Try again later.");
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
		if (!$scope.editItem.series_id) {
			console.log('Pick something to edit first!');
			globalMessage("Pick something to edit first!");
			return false;
		}
		
		$scope.editItem.name = $scope.seriesName;
		$scope.editItem.series_description = $scope.seriesDescription;
		// console.log($scope.editItem)

		$scope.editItem.$update(function(res) {
			if (res.error) {
				console.log(res.error)
				globalMessage("Error: " + res.err);
			} else {
				globalMessage($scope.editItem.name + " updated!");
			}
			console.log(res)
		}, function(res) {
			// send error
			globalMessage("Something went wrong! Try again later.");
		});
	};
}]);