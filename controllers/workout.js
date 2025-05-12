var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('workout', {
		css: ['style.css', 'workout.css'],
		js: ['menu.js']
	});
});

module.exports = router;