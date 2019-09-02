var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Admin = require('../models/userModel');

var urlencodedParser = bodyParser.urlencoded({ extended: false});

module.exports = function(passport) {

	router.post('/login', urlencodedParser, function(req, res) {
		var body = req.body,
			username = body.username,
			password = body.password;

		Admin.findOne({username: username}, function(err,doc){
			if(err) {
				res.status(500).send('error occured')
			} else {
				if(doc) {
					res.status(500).send('username already exists');
				} else {
					var record = new Admin();

					record.username = username;
					record.password = record.hashPassword(password);
					record.save(function(err,user){
						if(err) {
							res.status(500).send('db error');
						} else {
							res.send(user);
						}
					})
				}
			}
		})
	});


	return router;
};