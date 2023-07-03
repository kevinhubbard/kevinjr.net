var express = require('express');
var router = express.Router();
const { Sequelize } = require('sequelize');
const {Ingredient, sequelize} = require('../models/botwModel.js');

router.get('/', async function(req,res){
	try {
		sequelize.authenticate();
		console.log('Connection successfully established.');
	} catch (error) {
		console.error('Unable to connect to database', error);
	}

	const ingred = await Ingredient.findAll();
	console.log(ingred);
	res.render('botw', {
		css: ['style.css', 'botw.css'],
		js: ['botw.js']
	});
});

router.post('/', function(req, res){
	const ing = Ingredient.create({ingredientName: req.body.name, ingredientHearts: req.body.hearts, ingredientPrice: req.body.sellPrice, ingredientTrait: req.body.trait, ingredientDescription: req.body.desc});
	res.render('botw',{
		css: ['style.css', 'botw.css'],
		js: ['botw.js']
	});
});

module.exports = router;