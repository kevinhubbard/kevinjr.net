const express = require('express');
const router = express.Router();

router.get('/', function(req,res) {
	res.status(200).render('photos', {
		css: ['style.css', 'photos.css'],
		js: ['menu.js', 'loginScript.js', 'photos.js']
	});
});


module.exports = router;