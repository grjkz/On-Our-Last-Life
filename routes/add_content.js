var express = require('express');
var router = express.Router();
var db = require('../db/sql.js');

router.get('/content/new', function(req,res,next) {

	db.query("SELECT * FROM series;", function(err, results, fields) {
		res.render('add_content', {allSeries: results});
	});

});

module.exports = router;