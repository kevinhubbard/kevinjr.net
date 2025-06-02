const express = require('express');
const router = express.Router();
const ADMIN_ID = require('../config').ADMIN_ID;
const User = require('../models/user');

router.get('/', async function(req, res) {
	
	if (!req.session.userId) {
		return res.status(401).send("please login first");
	}

	if (req.session.userId !== ADMIN_ID) {
		return res.status(403).send("Access denied");
	}

	const user = await User.findByPk(req.session.userId);
	res.render('admin', {
		user: user.toJSON(),
		css: ['style.css', 'admin.css'],
		js: ['menu.js', 'loginScript.js']
	});
});

module.exports = router;
