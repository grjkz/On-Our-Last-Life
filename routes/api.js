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
	db.query("SELECT series.series_id, series.name FROM series, episodes WHERE series.series_id = episodes.series_id ORDER BY series.name;", function(err, results, fields) {
		res.json(results);
	});
});


////////////
// SERIES //
////////////
// last uploaded video
router.get('/series/recent', function(req,res,next) {

	db.query("SELECT * FROM series;", function(err, result, fields) {
		res.json(result[0]);
	});

});

// add new series
router.post('/series', function(req,res,next) {
	db.query("INSERT INTO series SET ?", 
		{ 
			name: req.body.name, 
			description: req.body.description
		}, function(err, result) {

			if (err) {
				console.log(err.code)
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
// get all episodes
router.get('/episodes', function(req,res,next) {

	db.query("SELECT * FROM episodes;", function(err, result, fields) {
		res.render('index', {last_uploaded:result[0]});
	});

});

// get all episodes of specific series
router.get('/:id/episodes', function(req,res,next) {
	db.query("SELECT * FROM series as s, episodes as e WHERE s.series_id = ? AND s.series_id = e.series_id;", req.params.id, function(err, results, fields) {
		console.log(results)
	});
});

// add new episode
router.post('/episodes', function(req,res,next) {
	db.query("INSERT INTO episodes SET ?", 
		{
			series_id: req.body.series_id,
			episode: req.body.episode,
			title: req.body.title,
			description: req.body.description,
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




module.exports = router;