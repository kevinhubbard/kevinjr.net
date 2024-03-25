var express = require('express');
var router = express.Router();

//contact route
router.get('/', function(req, res){
	res.render('contact',{
		css: ['style.css', 'contact.css'],
		js: ['menu.js']
	});
});

module.exports = router;