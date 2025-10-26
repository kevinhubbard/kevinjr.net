require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const PendingUser = require('../models/pendingUser.js');

router.get('/:token', async function(req, res) {
	const token = req.params.token;
	const pendingUser = await PendingUser.findOne({where: { token }});
	const rawIp = req.ip || req.connection.remoteAddress;
	const cleanIp = rawIp.replace(/^::ffff:/,'');
	let ipv4 = null;
	let ipv6 = null;
	if (cleanIp.includes('.')) {
		ipv4 = cleanIp;
	} else {
		ipv6 = rawIp;
	}


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
		name: pendingUser.name,
		email: pendingUser.email,
		password: pendingUser.password,
		role: pendingUser.role,
		registeredIp: pendingUser.ipAddress,
		ipv4Initial: ipv4,
		ipv6Initial: ipv6,
		ipv4Current: ipv4,
		ipv6Current: ipv6

	});

	await pendingUser.destroy();

	req.session.flash = {
		message: 'Your email has been validated! You can now login.',
		success: true
	};

	return res.redirect('/');
});

module.exports = router;