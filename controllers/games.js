const express = require('express')
const router = express.Router();

router.get('/', function(req, res) {
	res.render('apps/games/gameIndex', {
		css: ['index.css', 'style.css', 'cardGamesIndex.css'],
		js: ['loginScript.js', 'menu.js', 'cardGamesIndex.js']
	});
});

// POKER GAME
router.get('/poker', function(req, res) {
	res.render('apps/games/poker', {
		css: ['index.css', 'style.css'],
		js: ['loginScript.js', 'menu.js']
	});
});

// BLACKJACK GAME
router.get('/blackjack', function(req, res) {
	res.render('apps/games/blackjack', {
		css: ['index.css', 'style.css'],
		js: ['loginScript.js', 'menu.js']
	});
});

// CEELO GAME
router.get('/ceelo', function(req, res) {
	res.render('apps/games/ceelo', {
		css: ['index.css', 'style.css', '/games/ceeloGame.css'],
		js: ['loginScript.js', 'menu.js']
	});
});

module.exports = router;