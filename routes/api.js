var express = require('express');
var router = express.Router();
var db = require('../db/sql.js');


//////////
// API  //
//////////


////////////
// NAVBAR //
////////////
router.get('/nav/series', function(req,res,next) {
	// get all series where episodes exists
	db.query("SELECT series.series_id, series.name FROM series, episodes WHERE series.series_id = episodes.series_id GROUP BY series.series_id ORDER BY series.name;", function(err, results, fields) {
		res.json(results);
	});
});


////////////
// SERIES //
////////////


// return last uploaded video
router.get('/series/recent', function(req,res,next) {
	db.query("SELECT * FROM series;", function(err, result, fields) {
		res.json(result[0]);
	});
});


// update a series
router.put('/series/:series_id', function(req,res,next) {
	console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
	console.log('update requested')
	// console.log("SeriesID: "+ req.params.series_id)
	// console.log(req.body)
	var series_id = req.body.series_id;
	var series = {
		name: req.body.name,
		series_description: req.body.series_description
	};

	db.query("UPDATE series SET ? WHERE series_id = ?", [series, series_id], function(err, result, fields) {
		if (err) {
			console.log(err)
			res.json({error: err.code});
		} else {
			// need to return changed row for angular to update itself properly
			db.query("SELET * FROM series WHERE series_id = ?", series_id, function(err,result,fields) {
				res.json(result);
			});
		}
	});
});


// delete a series
router.delete('/series/:series_id', function(req,res,next) {
	console.log('delete request requested')
});


// show all series with its episode count in abc order
router.get('/series', function(req,res,next) {
	db.query("SELECT s.*, count(e.episode_id) as episodes FROM series as s LEFT JOIN episodes as e ON s.series_id = e.series_id GROUP BY s.series_id ORDER BY name;", function(err, results, fields) {
		res.json(results);
	});
});


// add new series
router.post('/series', function(req,res,next) {
	console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
	console.log('add series requested');
	// console.log(req.body)
	db.query("INSERT INTO series SET ?", 
		{ 
			name: req.body.name, 
			series_description: req.body.description
		}, function(err, result) {
			if (err) {
				console.log(err)
				res.json({error: err.code});
			}
			else {
				console.log(result)
				res.json(result);
			}
	});
});


//////////////
// EPISODES //
//////////////


// show all episodes plus the series's details
router.get('/series/:series_id', function(req,res,next) {
	db.query("SELECT * FROM series as s, episodes as e WHERE s.series_id = e.series_id AND s.series_id = ?", req,params.series_id, function(err, results, fields) {
		res.json(results);
	});
});


// get all episodes
router.get('/episodes', function(req,res,next) {
	db.query("SELECT * FROM episodes;", function(err, result, fields) {
		res.render('index', {last_uploaded:result[0]});
	});
});

// add new episode
router.post('/episodes', function(req,res,next) {
	// check for index number
	// check for episode number
	var episodeIndex = req.body.ep_index;
	var episodeNumber = req.body.ep_num;

	// if episodeIndex doesn't exist, find the current highest ep_index in its series
	if (episodeIndex == null || episodeIndex == "" || episodeIndex == "NaN") {
		db.query("SELECT max(ep_index) as maxIndex FROM episodes WHERE series_id = ?;", req.body.series_id, function(err,result,fields) {
			console.log(req.body)
			console.log("highest index: " + result[0].maxIndex);
			// this is to be the next episode index
			var episodeIndex = result[0].maxIndex + 1;
			
			// if episodeNumber doesn't exist but Index does, use it
			episodeNumber = episodeNumber ? episodeNumber : episodeIndex;

			db.query("INSERT INTO episodes SET ?", 
				{
					series_id: req.body.series_id,
					ep_index: episodeIndex,
					ep_num: episodeNumber,
					title: req.body.title,
					ep_description: req.body.ep_description,
					href: req.body.href,
					embed: req.body.embed
				}, function(err, result) {

					if (err) {
						console.log(err)
						res.json({error: err.code});
					}
					else {
						console.log(result)
						res.json(result);
					}

			});

		});
	} else {
		// if episodeNumber doesn't exist but Index does, use it
			episodeNumber = episodeNumber ? episodeNumber : episodeIndex;

		db.query("INSERT INTO episodes SET ?", 
			{
				series_id: req.body.series_id,
				ep_index: episodeIndex,
				ep_num: episodeNumber,
				title: req.body.title,
				ep_description: req.body.description,
				href: req.body.href,
				embed: req.body.embed
			}, function(err, result) {

				if (err) {
					console.log(err)
					res.json({error: err.code});
				}
				else {
					console.log(result)
					res.json(result);
				}
		});
	}

});




module.exports = router;