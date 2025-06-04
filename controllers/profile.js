let express = require('express');
let router = express.Router();
let User = require('../models/user.js');

router.get('/:id', async function(req, res) {
	if(!req.session.userId || req.session.userId != req.params.id) {
		return res.status(403).send('Access denied');
	}
	let userID = req.session.userId;
	try {
		const user = await User.findOne({where:{publicID: userID}});
		if (!user) {
			return res.status(404).send("User not found");
		}
		res.render('profile', {
			user: user.toJSON(),
			css: ['style.css'],
			js: ['menu.js', 'loginScript.js']
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
});

module.exports = router;