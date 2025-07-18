require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const PendingUser = require('../models/pendingUser.js');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
console.log(" Verify controller loaded");

router.get('/:token', async function(req, res) {
	//console.log(" Verification hit with token:", req.params.token);
	const token = req.params.token;
	const pendingUser = await PendingUser.findOne({where: { token }});

	if (!pendingUser) {
		return res.render('index', {
			message: 'Invalid or expired verification link.',
			success: false,
			css: ['style.css', 'index.css'],
			js: ['menu.js', 'createUser.js', 'loginScript.js']
		});
	}

	if (new Date() > pendingUser.expiresAt) {
		await pendingUser.destroy();
		return res.render('index', {
			message: 'Verification link expired. Please register again.',
			success: false,
			css: ['style.css', 'index.css'],
			js: ['menu.js', 'createUser.js', 'loginScript.js']
		});
	}

	await User.create({
		publicID: pendingUser.publicID,
		email: pendingUser.email,
		name: pendingUser.name,
		password: pendingUser.password,
		role: pendingUser.role
	});

	await pendingUser.destroy();

	/*return res.render('index', {
		message: 'Your email has been validated! You can now login.',
		success: true,
		css: ['style.css', 'index.css'],
		js: ['menu.js', 'createUser.js', 'loginScript.js']
	});*/

	req.session.flash = {
		message: 'Your email has been validated! You can now login.',
		success: true
	};

	return res.redirect('/');
});

module.exports = router;