var express = require('express');
var router = express.Router();

//contact route
router.get('/', function(req, res){
	res.render('contact',{
		css: ['style.css'],
		js: ['state.js']
	});
});

module.exports = router;