var express = require('express');
var router = express.Router();
var db = require('../db/sql.js');


////////////
// SERIES //
////////////


// show all series
router.get('/', function(req,res,next) {
	// return all series with number of episodes, even if zero episodes
	db.query("SELECT s.*, count(e.episode_id) as episodes FROM series as s LEFT JOIN episodes as e ON s.series_id = e.series_id GROUP BY s.series_id ORDER BY name;", function(err, results, fields) {
		res.render('series', {
			page: 'series',
			series: results
		});
	});
});


// show all episodes in a series
router.get('/:series_id', function(req,res,next) {
	db.query("SELECT * FROM series as s, episodes as e WHERE s.series_id = e.series_id AND s.series_id = ? ORDER BY e.ep_index;", req.params.series_id, function(err, results, fields) {
		// get all episodes of specific series
		res.render('show_series', {
			page: 'show_series',
			episodes: results
		});
	});
});


// show single episode
router.get('/:series_id/episode/:ep_id', function(req,res,next) {
	db.query("SELECT * FROM series as s, episodes as e WHERE s.series_id = e.series_id AND s.series_id = ? AND e.episode_id = ? LIMIT 1;", [req.params.series_id, req.params.ep_id], function(err, episode, fields) {
		// console.log(episode[0].ep_index)

		var epIndex = episode[0].ep_index;
		// get previous and next episode id
		db.query("Select series_id,ep_index,ep_num,title FROM episodes "+
			"WHERE ("+
				"ep_index = IFNULL((SELECT min(ep_index) FROM episodes WHERE ep_index > ?),0) "+
				"OR  ep_index = IFNULL((SELECT max(ep_index) from episodes WHERE ep_index < ?),0)"+
			") "+
			"AND (series_id = ?);", [epIndex, epIndex, req.params.series_id], function(err2,prevNextEps,fields2) {
			// console.log(prevNextEps)
			
			var prevIndex = "null";
			var nextIndex = "null";

			// check to make sure other episodes exist
			if (prevNextEps.length === 2) {
				// first returned index (prevNextEps[0]) is always the lower number
				prevIndex = prevNextEps[0];
				// second returned index (prevNextEps[1]) is always the higher number
				nextIndex = prevNextEps[1];
			} else if (prevNextEps.length === 1) {
				// check if result is lower or higher than searched ep_index
				if (prevNextEps[0].ep_index < epIndex) { // lower
					prevIndex = prevNextEps[0];
				} else { // higher
					nextIndex = prevNextEps[0];
				}
			}

			// console.log(prevIndex, nextIndex)
			res.render('show_episode', {
				page: 'show_episode',
				episode: episode[0],
				prevEpIndex: prevIndex,
				nextEpIndex: nextIndex
			});
			
		});
	});
});


module.exports = router;