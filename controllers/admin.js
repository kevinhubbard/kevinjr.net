const express = require('express');
const router = express.Router();
const ADMIN_ID = require('../config').ADMIN_ID;
const User = require('../models/user');

//GETS ADMIN ROUTE
router.get('/', async function(req, res) {
	//Make sure user is logged in first
	if (!req.session.userId) {
		return res.status(401).send("please login first");
	}
	//Make sure user is an admin
	if (req.session.userId !== ADMIN_ID && req.session.userId !== process.env.ADMIN_ID) {
		return res.status(403).send("Access denied");
	}
	//If authenticated display route
	const user = await User.findOne({where:{publicID: req.session.userId}});
	res.render('admin', {
		user: user.toJSON(),
		css: ['style.css', 'admin.css'],
		js: ['menu.js', 'loginScript.js']
	});
});

module.exports = router;