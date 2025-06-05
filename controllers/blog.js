var express = require('express');
var router = express.Router();
var Post = require('../models/blog.js');
const { QueryTypes } = require('sequelize');

router.get('/', async function(req,res){
	let posts = await Post.findAll();


	res.render('blog', {
		css: ['style.css'],
		js: ['menu.js', 'loginScript.js'],
		posts: posts
	});
});

module.exports = router;