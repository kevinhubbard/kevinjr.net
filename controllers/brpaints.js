var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('brpaints', {
		css: ['style.css', 'brpaints.css']
	});
});

module.exports = router;