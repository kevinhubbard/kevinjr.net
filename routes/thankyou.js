var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Contact = require('../models/contactModel.js');


var urlencodedParser = bodyParser.urlencoded({ extended: false});

//POST USER INFO FROM CONTACT PAGE
router.post('/', urlencodedParser, function(req, res){

	var info = new Contact({
		name: req.body.name,
		email: req.body.email,
		msg: req.body.msg,
		role: req.body.role,
		date: Date.now()
	}); 

	info.save(function(err){
		if (err) return handleError(err);
		res.render('thankyou', {name: req.body.name, email: req.body.email});
	});
});

module.exports = router;