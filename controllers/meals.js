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
		js: ['mealList.js', 'menu.js'],
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

router.post('/iup', async function(req, res) {
	const info = req.body;

	await Ingredient.update(
	{	
		ingredientName: info.ingredientName,
		foodGroup: info.foodGroup,
		servingSize: info.servingSize,
		calories: info.calories,
		totalFat: info.totalFat,
		saturatedFat: info.saturatedFat,
		transFat: info.transFat,
		cholesterol: info.cholesterol,
		sodium: info.sodium,
		totalCarbohydrates: info.totalCarbohydrates,
		fiber: info.fiber,
		sugar: info.sugar,
		protein: info.protein,
		imgLocation: '/images/foods/someshit.jpg'
	},
		{where: 
			{ingredientID: info.id}
		}
	);
});

router.delete('/delete', async function(req, res) {
	const info = req.body;
	await Ingredient.destroy({
		where: {
			ingredientID: info.id
		}
	});
});

module.exports = router;