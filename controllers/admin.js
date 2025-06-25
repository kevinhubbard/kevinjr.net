require('dotenv').config();
const express = require('express');
const router = express.Router();
//const ADMIN_ID = require('../config').ADMIN_ID;
const User = require('../models/user');
const Post = require('../models/blog');
const path = require('path');
const multer = require('multer');

// CONFIGURE FILE UPLOAD
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../assets/images/uploads/blog'));
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
	}
});

const upload = multer({storage: storage});

router.post('/upload', upload.single('image'), function(req, res) {
	if (req.file) {
		const imageUrl = `/images/uploads/blog/${req.file.filename}`;
		res.json({success:true, imageUrl});
	} else {
		res.status(400).json({success:false, message:'no file uploaded'});
	}
});

//GETS ADMIN ROUTE
router.get('/', async function(req, res) {
	//Make sure user is logged in first
	if (!req.session.userId) {
		return res.status(401).send("please login first");
	}
	//Make sure user is an admin
	if (req.session.userId !== process.env.ADMIN_ID) {
		return res.status(403).send("Access denied");
	}
	//If authenticated display route
	const user = await User.findOne({where:{publicID: req.session.userId}});
	res.render('admin', {
		user: user.toJSON(),
		css: ['style.css', 'admin.css'],
		js: ['menu.js', 'loginScript.js', 'admin.js']
	});
});


router.post('/blog-post', upload.single('image'), async function(req, res) {
/*	const data = req.body;
	console.log('Recieved data:', data);
	res.status(200).send('data received!');*/

	//console.log(req.body);

	if (!req.session.userId) {
		return res.status(401).send("Please login first");
	}

	if (req.session.userId !== process.env.ADMIN_ID) {
		return res.status(403). send("Access Denied");
	}

	const post = await Post.create({
		title: req.body.title, 
		author: req.body.author, 
		body: req.body.body
	});

	const user = await User.findOne({ where: {publicID: req.session.userId} });
	res.render('admin', {
		user: user.toJSON(),
		css: ['style.css', 'admin.css'],
		js: ['menu.js', 'loginScript.js', 'admin.js']
	});
});

module.exports = router;