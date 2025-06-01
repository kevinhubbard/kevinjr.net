var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
	res.render('blog', {
		css: ['style.css'],
		js: ['menu.js', 'loginScript.js']
	});
});

module.exports = router;