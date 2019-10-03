var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Blog = require('../models/blogModel.js');
var urlencodedParser = bodyParser.urlencoded({ extended: false});
var multer = require('multer');
var upload = multer({dest:'uploads/'}, {limits: {fieldSize: 2*1024*1024}});

//GETS ADMIN ROUTE
router.get('/', function(req, res){
	res.render('admin');
});

//SUBMITS ADMIN BLOG POST TO DB USING BLOG MODEL
var cpUpload = upload.fields([{name: 'blogPic', maxCount: 5}]);

router.post('/', urlencodedParser, cpUpload,  function(req,res){

	var post = new Blog({
		title: req.body.title,
		author: req.body.author,
		body: req.body.body,
		date: Date.now(),
		pic: req.files.path
	});

	console.log(req.files.path);

	post.save(function(err){
		if (err) return handleError(err);
		res.render('admin');
 	});
});

module.exports = router;