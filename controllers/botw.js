var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/config.js');

var connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE
});

connection.connect((err) => {
	if (err) throw err;
	console.log('successful connection.');
});


router.get('/', function(req,res){
	connection.query('SELECT * FROM Ingredient', function(err, rows){
		if (err) throw err;
		console.log('the data returned was: \n', rows);
		connection.end();
	});

	res.render('botw', {
		css: ['style.css', 'botw.css'],
		js: ['botw.js']
	});
});

router.post('/', function(req, res){
	console.log(req.body);
	res.render('botw',{
		css: ['style.css', 'botw.css'],
		js: ['botw.js']
	});
});

module.exports = router;