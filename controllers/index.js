const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const logPath = process.env.LOG_PATH;
const logStream = fs.createWriteStream(logPath, {flags: 'a'});

//GETS INDEX ROUTE
router.get('/', function(req, res){
	const flash = req.session.flash;
	delete req.session.flash;
	res.render('index',{
		message: flash?.message,
		success: flash?.success,
		css: ['style.css', 'index.css'],
		js: ['canvasScript.js', 'menu.js', 'loginScript.js']
	});
});

//GETS LOGOUT ROUTE
router.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		if (err) {
			console.error("Logout error: ", err);
			return res.status(500).send("Logout failed");
		}
		res.clearCookie('connect.sid');
		res.redirect('/');
	});
});

//GETS USER PROFILE PAGE
router.post('/', async function(req, res) {
	const email = req.body.uname;
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

	try {
		const user = await User.findOne({where:{email}});
		//LOG FAILED TO FIND USER ATTEMPT
		if (!user) {
			logStream.write(`[${new Date().toISOString()}] ${ip} - Failed login: user not found - ${email}\n`);
			return res.status(404).json({message: 'user not found'});
		}

		const isValidPassword = await bcrypt.compare(req.body.psw, user.password);
		//LOG FAILED TO ENTER PASSWORD
		if (!isValidPassword) {
			logStream.write(`[${new Date().toISOString()}] ${ip} - Failed login: wrong password - ${email}\n`);
			return res.status(401).json({message: 'Invalid Password'});
		}

		req.session.userId = user.publicID;
		req.session.userName = user.name;
		res.redirect(`/profile/${user.publicID}`);
	} catch (error) {
		logStream.write(`[${new Date().toISOString()}] ${ip} - Server error: ${error.message}\n`);
		res.status(500).json({error: 'Something went wrong.'});
	}
});

module.exports = router;