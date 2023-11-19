var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('campgear', {
		css: ['style.css', 'campgear.css'],
		js: []
	});
});

module.exports = router;