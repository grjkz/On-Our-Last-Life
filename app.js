var express = require('express');
var app = express();
var path = require('path');
var ejs = require('ejs');
// var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var cookieParser = require('cookie-parser');
var session = require('express-session');


app.use(cookieParser());
app.use(bodyParser());


///////////////////////
// view engine setup //
///////////////////////
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public'), { maxAge: 300 }));


////////////////////////
// require all routes //
////////////////////////
var routes_api = require('./routes/api');
var routes_index = require('./routes/index');
var routes_series = require('./routes/series');
var routes_admin = require('./routes/admin');


//////////////
// requests //
//////////////
app.use('/api', routes_api);
app.use('/', routes_index);
app.use('/series', routes_series);
app.use('/admin', routes_admin);




app.listen(3000,function(){
	console.log("listening on 3k");
});