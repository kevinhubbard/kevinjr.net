const express = require('express');
const router = express.Router();
let latestTemp = null;

router.get('/', function(req, res){
	res.status(200).render('temperature',{
		temp: latestTemp
		css: ['style.css'],
		js: ['menu.js', 'loginScript.js']
	});
});

router.post('/api', function(req, res){
	latestTemp = req.body.temperature;
	console.log('Received temp:', latestTemp);
	res.sendStatus(200);
});

router.get('/api', function(req, res) {
	res.json({temperature: latestTemp});
});

module.exports = router;