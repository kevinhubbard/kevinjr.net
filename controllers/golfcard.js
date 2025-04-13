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

router.get('/courses', async function(req, res){
	try {
		const { courseID } = req.query;

		let where = {};
		if (courseID) {
			where.courseID = courseID;
		}

		const crs = await Course.findAll({where});
		res.json(crs);
	} catch (error) {
		console.error('Error fetching courses: ', error);
		res.status(500).json({error: 'Something went wrong.'});
	}
});

router.get('/hls', async function(req, res) {
	try {
		const { courseID } = req.query;

		let where = {};
		if (courseID) {
			where.courseID = courseID;
		}

		const hls = await Hole.findAll({where});
		res.json(hls);
	} catch (error) {
		console.error('Error fetching holes: ', error);
		res.status(500).json({error: 'Something went wrong.'});
	}
});

router.get('/rounds', async function(req, res){
	const rnd = await Round.findAll();
		res.json(rnd);
});

router.get('/play', async function(req, res) {
	
});

module.exports = router;