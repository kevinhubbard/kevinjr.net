var express = require('express');
var router = express.Router();

//GETS PROJECTS ROUTE FOR PORTFOLIO
router.get('/', function (req, res) {
	res.render('portfolio');
});

module.exports = router;