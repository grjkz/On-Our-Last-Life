var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./sql.js');


module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.user_id);
  });

  passport.deserializeUser(function(id, done) {
		db.query("SELECT * FROM users WHERE user_id = ? LIMIT 1", id, function(err,result) {
			done(err, result[0]);
		});
  });


  // sign up
  passport.use('local-signup', new LocalStrategy({
  	passReqToCallback: true
  },
  function(req, username, password, done) {

  }
  ));


  // login
  passport.use('local-login', new LocalStrategy({
  	passReqToCallback: true
  },
  function(req, username, password, done) {
  	db.query("SELECT * FROM users WHERE user_id = ? LIMIT 1;", username, function(err, results, fields) {
  		if (err) { return done(err); }
  		if (!results.length || results[0].password !== password) {
  			return done(null, false, req.flash('loginMessage', 'Username or Password is wrong'));
  		}
  		return done(null, rows[0]);
  	});
  }
  ));


  // admin login
  passport.use('local-admin-login', new LocalStrategy({
  	passReqToCallback: true
  },
  function(req, username, password, done) {
  	db.query("SELECT * FROM users WHERE admin >= 2 AND username = ? LIMIT 1;", username, function(err, result, fields) {
  		// console.log('****************************')
  		// console.log(result)
  		if (err) { return done(err); }
  		if (!result.length || result[0].password !== password) {
  			console.log('no match')
  			return done(null, false, req.flash('loginMessage', 'Username or Password is wrong'));
  		}
  		return done(null, result[0]);
  	});
  }
  ));






};