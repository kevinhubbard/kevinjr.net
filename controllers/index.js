var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Visit = require('../models/visit.js');

//GETS INDEX ROUTE
router.get('/', async function (req, res){

	const doc = await Visit.findOne({name:'server'});
	doc.number += 1;
	await doc.save();
	
	res.render('index',{
		css: ['style.css', 'index.css'],
		js: ['jquery.flip.min.js','app.js']
	});
});

module.exports = router;