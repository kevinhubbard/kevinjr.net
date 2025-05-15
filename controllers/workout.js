var express = require('express');
var router = express.Router();
var {MuscleGroup, Workout, Muscle} = require('../models/workouts.js');
const { QueryTypes } = require('sequelize');

router.get('/', async function(req, res) {
	//const group = await MuscleGroup.findAll();

	res.render('workout', {
		css: ['style.css', 'workout.css'],
		js: ['menu.js', 'workout.js']
	});
});

router.get('/wapi', async function(req, res) {
	const wrkt = await Workout.findAll();
	res.json(wrkt);
});

module.exports = router;