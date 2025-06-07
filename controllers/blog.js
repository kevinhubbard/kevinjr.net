var express = require('express');
var router = express.Router();
var Post = require('../models/blog.js');
const { QueryTypes } = require('sequelize');

router.get('/', async function(req,res){
	let posts = await Post.findAll({
		order: [['postID', 'DESC']]
	});
	const plainPosts = posts.map(post => post.get({ plain: true }));


	res.render('blog', {
		css: ['style.css', 'blog.css'],
		js: ['menu.js', 'loginScript.js'],
		posts: plainPosts
	});
});

module.exports = router;