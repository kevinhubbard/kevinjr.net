var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Blog = require('../models/blogModel.js');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

//GETS ADMIN ROUTE
router.get('/', function(req, res){
	res.render('admin');
});

//SUBMITS ADMIN BLOG POST TO DB USING BLOG MODEL
router.post('/', urlencodedParser, function(req,res){

	var post = new Blog({
		title: req.body.title,
		author: req.body.author,
		body: req.body.body,
		date: Date.now()
	});

	post.save(function(err){
		if (err) return handleError(err);
		res.render('admin');
 	});
});

module.exports = router;