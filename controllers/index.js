var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Hit = require('../models/info.js');

//GETS INDEX ROUTE
router.get('/', function (req, res){

	Hit.findOne({name: 'server'}, function(err, hit) {
		var n = hit.number;
		n++;
		Hit.findOneAndUpdate({name: 'server'}, {number: n}, function() {
		console.log('idk again');
	});
});




	res.render('index',{
		css: ['style.css', 'index.css'],
		js: ['jquery.flip.min.js','app.js']
	});
});

module.exports = router;