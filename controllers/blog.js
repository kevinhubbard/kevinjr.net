var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Blog = require('../models/blogModel.js');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

//GETS BLOG POSTS FROM DB
router.get('/', urlencodedParser, function(req, res){

	Blog.find({}).sort({date: 'descending'}).exec(function(err, posts){
		res.render('blog', {
			posts: posts,
			css: ['blog.css']
		});
	});
});

module.exports = router;