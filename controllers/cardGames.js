const express = require('express')
const router = express.Router();

router.get('/', function(req, res) {
	res.render('cardGames', {
		css: ['index.css', 'style.css', 'cardGamesIndex.css'],
		js: ['loginScript.js', 'menu.js', 'cardGamesIndex.js', 'index.js']
	});
});

module.exports = router;