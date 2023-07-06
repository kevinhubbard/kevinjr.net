var express = require('express');
var router = express.Router();
const Ingredient = require('../models/botwModel.js');

router.get('/', function(req,res){
	res.render('botw', {
		css: ['style.css', 'botw.css'],
		js: ['botw.js']
	});
});

router.get('/data', async function(req, res){
	const ingred = await Ingredient.findAll();
	console.log(ingred);
	res.json(ingred);
})

router.post('/', function(req, res){
	Ingredient.create({
		ingredientName: req.body.name,
		ingredientHearts: req.body.hearts,
		ingredientPrice: req.body.sellPrice,
		ingredientTrait: req.body.trait, 
		ingredientDescription: req.body.desc
	});

	res.render('botw',{
		css: ['style.css', 'botw.css'],
		js: ['botw.js']
	});
});

router.delete('/', function(req,res){
	console.log(req.body.name);
	Ingredient.destroy({
		where: {
			ingredientName: req.body.name
		}
	});
});

module.exports = router;