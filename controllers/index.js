const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const BannedIP = require('../models/bannedIPs.js');
const SusUser = require('../models/suspusiousUsers.js');
const bcrypt = require('bcrypt');
// const fs = require('fs');
// const path = require('path');
// const logPath = process.env.LOG_PATH;
//const logStream = fs.createWriteStream(logPath, {flags: 'a'});


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
	ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
	console.log(ip);
	try {
		const user = await User.findOne({where:{email}});

		//LOG FAILED TO FIND USER ATTEMPT
		if (!user) {
			let attempts;
			//logStream.write(`[${new Date().toISOString()}] ${ip} - Failed login: user not found - ${email}\n`);
			// IF YOU ENTER 3 UNFOUND USER EMAILS ADDRESSES TEMPORARLY BAN IP ADDRESS
			try {
				const susUsr = await SusUser.findOne({where:{ipAddress: ip}});
				if (susUsr) {
					attempts = susUsr.attemptCount;
					attempts++;
					if (attempts >=3) {
						// create banned user
						try {
							const bannedIP = await BannedIP.findOne({where:{ipAddress: ip}});
							if (bannedIP) {

							} else {
								await BannedIP.create({
									ipAddress: ip,
									reason: 'Suspicious activity: Entering invalid emails.',
									banType: 'temporary',
									attemptCount: attempts,
									banCount: 1,
									firstAttemptAt: new Date().toISOString(),
									lastAttemptAt: new Date().toISOString(),
									userAgent: req.headers['user-agent'],
									referrer: req.headers['referrer'],
									pathAttempted: req.originalUrl,
									geoLocation: 'somewhere idk',
									bannedAt: new Date().toISOString(),
									banExpiresAt: new Date().toISOString(),
									unbannedAt: new Date().toISOString(),
									notes: 'extra notes here.'
								});

								await susUsr.destroy();
							}
						} catch (err) {
							console.log('error trying to create banned IP.', err);
						}
					}
					await SusUser.update({attemptCount: attempts}, {where:{ipAddress: ip}});
					await susUsr.save();
				} else {
					await SusUser.create({ ipAddress: ip, attemptCount: 1 });
					attempts = 1;
				}
			} catch (err) {
				console.log("failed to log suspicious error:", err);
			}

			return res.render('index', {
				message: `Email not found, you have ${3 - attempts} attempt(s) left `,
				css: ['style.css', 'index.css'],
				js: ['canvasScript.js', 'menu.js', 'loginScript.js']
			});
		}

		const isValidPassword = await bcrypt.compare(req.body.psw, user.password);
		//LOG FAILED TO ENTER PASSWORD
		if (!isValidPassword) {
			//logStream.write(`[${new Date().toISOString()}] ${ip} - Failed login: wrong password - ${email}\n`);
			// IF YOU ENTER A PASSWORD INCORRECTLY 5 TIMES TEMPORARLY BAN IP ADDRESS



			// IF IP 

			return res.status(401).json({message: 'Invalid Password'});
		}

		req.session.userId = user.publicID;
		req.session.userName = user.name;
		res.redirect(`/profile/${user.publicID}`);
	} catch (error) {
		//logStream.write(`[${new Date().toISOString()}] ${ip} - Server error: ${error.message}\n`);
		res.status(500).json({error: 'Something went wrong.'});
	}
});

module.exports = router;



