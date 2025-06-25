var express = require('express');
var router = express.Router();
var Post = require('../models/blog.js');
const { QueryTypes } = require('sequelize');

router.get('/', async function(req,res){
	let posts = await Post.findAll({
		order: [['postID', 'DESC']]
	});
	const plainPosts = posts.map(post => post.get({ plain: true }));

	for (let i = 0; i < plainPosts.length; i++) {
		let tempTitle = plainPosts[i].title;
		let slug = tempTitle.replace(/ /g, '-');
		plainPosts[i].slug = slug;
	}
	//console.log(plainPosts);
	res.render('blog', {
		css: ['style.css', 'blog.css'],
		js: ['menu.js', 'loginScript.js'],
		posts: plainPosts
	});
});

router.get('/posts/:title', async function(req,res) {
	let temp = req.params.title;
	let title = temp.replace(/-/g, ' ');
	
	let blogPost = await Post.findOne({where: {title: title}});

	res.render('post', {
		css: ['style.css', 'post.css'],
		js: ['menu.js', 'loginScript.js'],
		bp: blogPost
	});
});

module.exports = router;