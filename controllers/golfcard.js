var express = require('express');
var router = express.Router();
var {Course, Round} = require('../models/golfcard.js');

router.get('/', async function(req, res){
	//const course = await Course.findAll();

	res.render('golfcard', {
		css: ['style.css', 'golf.css'],
		js: ['golfScript.js']
	});
});

router.get('/courses', async function(req, res){
	const course = await Course.findAll();
		res.render('course', {
		css: ['style.css', 'golf.css'],
		js: ['golfScript.js'],
		crs: course
	});
});

router.get('/rounds', async function(req, res){
	const round = await Round.findAll();
		res.render('rounds', {
		css: ['style.css', 'golf.css'],
		js: ['golfScript.js'],
		rnd: round
	});
});

module.exports = router;