var express = require('express');
var router = express.Router();
var db = require('../config/sql.js');
var PassportConfig = require('../config/passport.js');
var passport = require('passport');

PassportConfig(passport);

///////////
// ADMIN //
///////////


// show all admin controls
router.get('/', checkAuth, function(req,res,next) {
	res.render('admin/index', {
		page: 'admin',
		// user: req.user.username
		user: 'Asdf Jkl;'
	});
});

// router.get('*', function(req,res,next) {
// 	res.render('admin/index', {
// 		page: 'admin'
// 	});
// });


// // add new content
// router.get('/content/new', function(req,res,next) {

// 	db.query("SELECT * FROM series;", function(err, results, fields) {
// 		res.render('admin/add_content', {
// 			page: 'add_content',
// 			allSeries: results
// 		});
// 	});

// });


// // show all series (links ahead to edit respective episodes)
// router.get('/series', function(req,res,next) {
// 	db.query("SELECT * FROM series;", function(err,results,fields) {
// 		res.render('admin/show_series', {
// 			page: 'show_series',
// 			series: results});
// 	});
// });


// // edit episodes of a series
// router.get('/series/:series_id', function(req,res,next) {
// 	db.query("SELECT * FROM episodes as e WHERE e.series_id = ?", req.params.series_id, function(err, results, fields) {
// 		res.render('/admin/edit_episodes', {
// 			page: 'show_episodes',
// 			episodes: results
// 		});
// 	});
// });


// admin page login
router.get('/login', function(req,res,next) {
	res.render('admin/admin_login', {loginMessage: req.flash('loginMessage')});
});

router.post('/login',
	passport.authenticate(
		'local-admin-login',
		{
			successRedirect: '/admin',
			failureRedirect: '/admin/login'
		})
);


function checkAuth(req, res, next) {
	next();
	return false;
	// check if session is stored
  if (!req.session.passport || !req.session.passport.user || !req.user.admin) {
    // redirect to homepage if no admin session
    res.redirect('/');
  } else {
  	// force forget cache history so logging out and hitting 'back' wont be able to rerender the page
  	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

    next();
  }
}



module.exports = router;