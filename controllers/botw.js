var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
	res.render('botw', {
		css: ['style.css', 'botw.css'],
		js: ['botw.js']
	});
});

module.exports = router;