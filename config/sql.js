var mysql = require('mysql');

// set up MYSQL
var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'last_life'
});

db.connect(function(err) {
	if (err) console.log(err);
	else console.log("DB connected");
});

module.exports = db;