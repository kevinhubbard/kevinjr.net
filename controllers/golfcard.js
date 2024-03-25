var express = require('express');
var router = express.Router();
var {Course, Round, Hole} = require('../models/golfcard.js');
const { QueryTypes } = require('sequelize');

router.get('/', async function(req, res){
	const crs = await Course.findAll();

	res.render('golfcard', {
		css: ['style.css', 'golf.css'],
		js: ['golfScript.js', 'menu.js'],
		crs: crs
	});
});

/*router.get('/api/courses', async function(req, res) {
	const crs = await Course
});*/

router.get('/api/courses', async function(req, res){
	const course = await Course.findAll();
		res.json(course);
});

router.get('/hls', async function(req, res) {
	const hls = await Hole.findAll({
		where: {
			courseID: 9
		}
	});
	console.log(hls);
})

router.get('/rounds', async function(req, res){
	const round = await Round.findAll();
		res.render('rounds', {
		css: ['style.css', 'golf.css'],
		js: ['golfScript.js'],
		rnd: round
	});
});

module.exports = router;