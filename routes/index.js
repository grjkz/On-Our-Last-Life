var express = require('express');
var router = express.Router();
var db = require('../config/sql.js');


/////////////
// LANDING //
/////////////


router.get('/', function(req,res,next) {

	db.query("SELECT *, DATE_FORMAT(added, '%b %d, %Y') AS date FROM episodes ORDER BY episode_id DESC LIMIT 1;", function(err, episode, fields) {
		db.query("SELECT *, DATE_FORMAT(article_added, '%b %d, %Y') AS date FROM articles ORDER BY article_id DESC LIMIT 3;", function(err2, articles, fields) {

			res.render('index', {
				page: 'index',
				latest_episode: episode[0],
				articles: articles
			});
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