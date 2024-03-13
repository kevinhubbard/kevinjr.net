var express = require('express');
var router = express.Router();


var Food = require('../models/meals');

router.get('/', function(req, res) {
	res.render('meals', {
		css: ['style.css', 'cal-counter.css'],
		js: 'cal-counter.js'
	});
});

router.post('/', async function(req, res) {

	const foodName = req.body.foodName;
	const foodGroup = req.body.foodGroup;
	const servingSize = req.body.servingSize;
	const calories = req.body.calories;
	const totalFat = req.body.totalFat;
	const saturatedFat = req.body.saturatedFat;
	const transFat = req.body.transFat;
	const cholesterol = req.body.cholesterol;
	const sodium = req.body.sodium;
	const totalCarbohydrates = req.body.totalCarbohydrates;
	const fiber = req.body.fiber;
	const sugar = req.body.sugar;
	const protein = req.body.protein;
	const imgLocation = '/assets/images/foods/' + req.body.foodName + '.jpg';	

	const foodItem = await Food.create({
		foodName: foodName,
		foodGroup: foodGroup,
		servingSize: servingSize,
		calories: calories,
		totalFat: totalFat,
		saturatedFat: saturatedFat,
		transFat: transFat,
		cholesterol: cholesterol,
		sodium: sodium,
		totalCarbohydrates,
		fiber: fiber,
		sugar: sugar,
		protein: protein,
		imgLocation: imgLocation
	});

	console.log(foodItem);
	res.render('meals', {
		css: ['style.css', 'cal-counter.css'],
		js: ['cal-counter.js']
	});
});

module.exports = router;