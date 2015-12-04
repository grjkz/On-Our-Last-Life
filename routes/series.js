var express = require('express');
var router = express.Router();
var db = require('../db/sql.js');


////////////
// SERIES //
////////////


router.get('/', function(req,res,next) {
	// return all series with number of episodes, even if zero episodes
	db.query("SELECT s.*, count(e.episode_id) as episodes FROM series as s LEFT JOIN episodes as e ON s.series_id = e.series_id GROUP BY s.series_id ORDER BY name;", function(err, results, fields) {
		res.render('series', {
			page: 'series',
			series: results
		});
	});
});


router.get('/:series_id', function(req,res,next) {
	db.query("SELECT * FROM series as s, episodes as e WHERE s.series_id = e.series_id AND s.series_id = ? ORDER BY e.ep_index;", req.params.series_id, function(err, results, fields) {
		// get all episodes of specific series
		res.render('show_series', {
			page: 'show_series',
			episodes: results
		});
	});
});


router.get('/:series_id/episode/:ep_num', function(req,res,next) {
	db.query("SELECT * FROM series as s, episodes as e WHERE s.series_id = e.series_id AND s.series_id = ? AND e.ep_num = ? LIMIT 1;", [req.params.series_id, req.params.ep_num], function(err, result, fields) {
		res.render('show_episode', {
			page: 'show_episode',
			episode: result[0]
		});
	});
});


module.exports = router;