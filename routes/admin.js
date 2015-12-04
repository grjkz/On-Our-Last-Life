var express = require('express');
var router = express.Router();
var db = require('../db/sql.js');


///////////
// ADMIN //
///////////


// show all admin controls
router.get('/', function(req,res,next) {
	res.render('admin/index');
});


// add new content
router.get('/content/new', function(req,res,next) {

	db.query("SELECT * FROM series;", function(err, results, fields) {
		res.render('admin/add_content', {
			page: 'add_content',
			allSeries: results
		});
	});

});


// show all series (links ahead to edit respective episodes)
router.get('/series', function(req,res,next) {
	db.query("SELECT * FROM series;", function(err,results,fields) {
		res.render('admin/show_series', {
			page: 'show_series',
			series: results});
	});
});


// edit episodes of a series
router.get('/series/:series_id', function(req,res,next) {
	db.query("SELECT * FROM episodes as e WHERE e.series_id = ?", req.params.series_id, function(err, results, fields) {
		res.render('/admin/edit_episodes', {
			page: 'show_episodes',
			episodes: results
		});
	});
});

module.exports = router;