var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Contact = require('../models/contact.js');


var urlencodedParser = bodyParser.urlencoded({ extended: false});

//POST USER INFO FROM CONTACT PAGE
router.post('/', urlencodedParser, function(req, res){

	var info = new Contact({
		name: req.body.name,
		email: req.body.email,
		msg: req.body.msg,
		role: req.body.role,
		state: req.body.state,
		date: Date.now()
	}); 

	if(info.state) {
		res.render('thankyou', {
			name: req.body.name,
			email: req.body.email,
			css: ['style.css'],
			js: ['menu.js']
		});
	} else {
		info.save(function(err){
			if (err) return handleError(err);
			res.render('thankyou', {
				name: req.body.name, 
				email: req.body.email, 
				css: ['style.css'],
				js: ['menu.js']
			});
		});

	}





});

module.exports = router;