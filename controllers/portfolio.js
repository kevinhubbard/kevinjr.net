var express = require('express');
var router = express.Router();

//GETS PROJECTS ROUTE FOR PORTFOLIO
router.get('/', function (req, res) {
	res.render('portfolio',{
		css: ['style.css', 'portfolio.css'],
		js: ['menu.js', 'loginScript.js']
	});
});

module.exports = router;