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
		page: 'admin'
	});
});

// router.get('*', function(req,res,next) {
// 	res.render('admin/index', {
// 		page: 'admin'
// 	});
// });


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


// login
router.get('/login', function(req,res,next) {
	res.render('admin/admin_login', {loginMessage: req.flash('loginMessage')});
});

// admin login
router.post('/login',
	passport.authenticate('local-admin-login',
		{
			successRedirect: '/admin',
			failureRedirect: '/admin/login',
			falureFlash: false
		}
		), function(req,res,next) {
	console.log(req.body)
	res.json({body: req.body})
});


function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.redirect('/');
  } else {
    next();
  }
}



module.exports = router;