console.log('admin_controllers.js linked');

var AppControllers = angular.module('appControllers', ['PreloadedData']);

AppControllers.controller('homeCtrl', ['$scope', 'Summary', 'User', function($scope, Summary, User) {
	$scope.metaData = Summary.query();
	$scope.user = User;
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
				globalMessage("Error: " + res.error, 'failure');
			} else {
				globalMessage('"' + $scope.seriesName + '" has been added!', "success");

				var newId = res.insertId;
				// push to series array? to make it update select>option
				$scope.series.push({series_id: newId, name: $scope.seriesName, description: $scope.seriesDescription});
			}
		}, function(err) {
			console.log(err);
			globalMessage("Something went wrong! Try again later.", 'error');
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
				globalMessage("Error: " + res.error, 'failure');
			} else {
				globalMessage('"' + $scope.epTitle + '" has been added!', 'success');
			}
		}, function(err) {
			console.log(err);
			globalMessage("Something went wrong! Try again later.", 'error');
		});
	};
}]); // END addcontentCtrl


AppControllers.controller('seriesCtrl', ['$scope', 'Series', function($scope, Series) {
	
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
			globalMessage("Pick something to edit first!", 'error');
			return false;
		}
		
		$scope.editItem.name = $scope.seriesName;
		$scope.editItem.series_description = $scope.seriesDescription;
		// console.log($scope.editItem)

		$scope.editItem.$update(function(res) {
			if (res.error) {
				console.log(res.error)
				globalMessage("Error: " + res.error, 'failure');
			} else {
				globalMessage('"' + $scope.editItem.name + '" updated!', 'success');
			}
			console.log(res)
		}, function(res) {
			// send error
			globalMessage("Something went wrong! Try again later.", 'error');
		});
	};

	// delete a series
	$scope.delete = function(index) {
		var deleteItem = $scope.series[index];
		var seriesName = angular.copy(deleteItem.name);
		var confirmed = confirm("Delete: \"" + seriesName + "\" ?\n"
				+ "This will also delete all associated episodes!");
		if (confirmed) {
			deleteItem.$delete(function(res) {
				if (res.error) {
					console.log(res.error)
					globalMessage("Error: " + res.error, 'failure');
				} else {
					$scope.series.splice(index,1); // removes object so the DOM element vanishes
					globalMessage('"' + seriesName + '" DELETED!!!', 'success');
				}
			}, function(res) {
				console.log(res)
				globalMessage("Something went wrong! Try again later.", 'error');
			});
		}
	};
}]); // END seriesCtrl


AppControllers.controller('episodesCtrl', ['$scope', '$routeParams', 'Episode', function($scope, $routeParams, Episode) {
	$scope.episodes = Episode.get({series_id: $routeParams.id});
	$scope.editItem = new Episode();

	// fills form with respective episode data
	$scope.fillForm = function(index) {
		$scope.editItem = $scope.episodes[index];
		// console.log(editItem)
		$scope.epIndex = $scope.editItem.ep_index;
		$scope.epNum = $scope.editItem.ep_num;
		$scope.epTitle = $scope.editItem.title;
		$scope.epDescription = $scope.editItem.ep_description;
		$scope.epHref = $scope.editItem.href;
		$scope.epEmbed = $scope.editItem.embed;
	};

	$scope.update = function() {
		// if no episode has been clicked on, do nothing
		if (!$scope.editItem.episode_id) {
			console.log('Pick something to edit first!');
			globalMessage("Pick something to edit first!", 'failure');
			return false;
		}
		
		$scope.editItem.ep_index = $scope.epIndex;
		$scope.editItem.ep_num = $scope.epNum;
		$scope.editItem.title = $scope.epTitle;
		$scope.editItem.ep_description = $scope.epDescription;
		$scope.editItem.href = $scope.epHref;
		$scope.editItem.embed = $scope.epEmbed;

		$scope.editItem.$update(function(res) {
			if (res.error) {
				console.log(res.error)
				globalMessage("Error: " + res.error, 'failure');
			} else {
				globalMessage('"' + $scope.editItem.name + '" updated!', 'success');
			}
			console.log(res)
		}, function(res) {
			// send error
			globalMessage("Something went wrong! Try again later.", 'error');
		});
	};

	$scope.delete = function(index) {
		var deleteItem = $scope.episodes[index];
		var episodeTitle = angular.copy(deleteItem.title);
		var confirmed = confirm('Delete: \"' + episodeTitle + '"?');
		if (confirmed) {
			deleteItem.$delete(function(res) {
				if (res.error) {
					console.log(res.error)
					globalMessage("Error: " + res.error, 'failure');
				} else {
					$scope.episodes.splice(index,1); // removes object so the DOM element vanishes
					globalMessage('"' + episodeTitle + '" DELETED!!!', 'success');
				}
			}, function(res) {
				console.log(res)
				globalMessage("Something went wrong! Try again later.", 'error');
			});
		}
	};


}]); // END episodesCtrl


AppControllers.controller('addArticleCtrl', ['$scope', 'Article', function($scope, Article) {
	$scope.addArticle = function() {
		// check for empty fields
		if (!$scope.articleTitle || !$scope.articleBody) {
			globalMessage("Must have Title and Body!", 'failure');
			return false;
		}

		var article = new Article();
		article.article_title = $scope.articleTitle;
		article.article_body = $scope.articleBody;

		article.$save(function(res) {
			if (res.error) {
				globalMessage('Error: ' + res.error, 'failure');
			} else {
				globalMessage('"' + $scope.articleTitle + '" has been added!', 'success');
			}
		}, function(err) {
			console.log(err);
			globalMessage("Something went wrong! Try again later.", 'error');
		});
	};
}]);