var express = require('express');
var router = express.Router();

//GETS INDEX ROUTE
router.get('/', function(req, res){
	res.render('index',{
		css: ['style.css', 'index.css'],
		js: ['jquery.flip.min.js','indexScript.js', 'menu.js']
	});
});

module.exports = router;