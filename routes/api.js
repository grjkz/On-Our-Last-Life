var express = require('express');
var router = express.Router();
var db = require('../db/sql.js');


////////////
// SERIES //
////////////
router.get('/series', function(req,res,next) {

	db.query("SELECT * FROM series;", function(err, result, fields) {
		res.render('index', {last_uploaded:result[0]});
	});

});

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
router.get('/episodes', function(req,res,next) {

	db.query("SELECT * FROM episodes;", function(err, result, fields) {
		res.render('index', {last_uploaded:result[0]});
	});

});

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