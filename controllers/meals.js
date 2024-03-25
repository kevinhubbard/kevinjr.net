var express = require('express');
var router = express.Router();
const { QueryTypes } = require('sequelize');

var Ingredient = require('../models/meals.js');

router.get('/api', async function (req, res) {
	const ingredientList = await Ingredient.findAll();
	res.json(ingredientList);
});

router.get('/', async function(req, res) {
	const ingredientList = await Ingredient.findAll();
	res.render('meals', {
		css: ['style.css', 'cal-counter.css'],
		js: ['mealList.js'],
		iList: ingredientList
	});
});

router.post('/', async function(req, res) {
	const ingredientName = req.body.ingredientName;
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
	const imgLocation = '/images/foods/' + req.body.ingredientName + '.jpg';	

	const ingredient = await Ingredient.create({
		ingredientName: ingredientName,
		foodGroup: foodGroup,
		servingSize: servingSize,
		calories: calories,
		totalFat: totalFat,
		saturatedFat: saturatedFat,
		transFat: transFat,
		cholesterol: cholesterol,
		sodium: sodium,
		totalCarbohydrates: totalCarbohydrates,
		fiber: fiber,
		sugar: sugar,
		protein: protein,
		imgLocation: imgLocation
	});

	const ingredientList = await Ingredient.findAll();
	res.render('meals', {
		css: ['style.css', 'cal-counter.css'],
		js: ['mealList.js'],
		iList: ingredientList
	});
});

module.exports = router;