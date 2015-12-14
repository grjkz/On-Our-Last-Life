var express = require('express');
var router = express.Router();
var db = require('../config/sql.js');


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


//////////
// TEAM //
//////////
router.get('/team', function(req,res,next) {
	db.query("SELECT fname,lname,username,facebook,twitter FROM users WHERE admin >= 2;", function(err, results, fields) {
		res.render('team', {
			page: 'team',
			members: results
		});
	});
});


/////////
// FAQ //
/////////
router.get('/faq', function(req,res,next) {
	res.render('faq', {page: 'faq'});
});





module.exports = router;