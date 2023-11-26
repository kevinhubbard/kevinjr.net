var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('golfcard', {
		layout: 'golf.handlebars',
		css: ['style.css', 'golf.css'],
		js: ['golfScript.js']
	});
});

module.exports = router;