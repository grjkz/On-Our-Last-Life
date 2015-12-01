var express = require('express');
var router = express.Router();
var db = require('../db/sql.js');


/////////////
// LANDING //
/////////////
router.get('/', function(req,res,next) {

	db.query("SELECT * FROM episodes ORDER BY episode_id DESC LIMIT 1;", function(err, result, fields) {
		res.render('index', {
			page: 'index', 
			last_uploaded:result[0]
		});
	});

});


///////////
// ABOUT //
///////////
router.get('/team', function(req,res,next) {
	res.render('team', {page: 'team'});
});


/////////
// FAQ //
/////////
router.get('/faq', function(req,res,next) {
	res.render('faq', {page: 'faq'});
});


////////////
// SERIES //
////////////
router.get('/series', function(req,res,next) {
	// return all series with number of episodes, even if zero episodes
	db.query("SELECT s.*, count(e.episode_id) as episodes FROM series as s LEFT JOIN episodes as e ON s.series_id = e.series_id GROUP BY s.series_id;", function(err, results, fields) {

		res.render('series', results);
	});
});











module.exports = router;