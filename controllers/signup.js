require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const PendingUser = require('../models/pendingUser.js');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

//GETS RESUME ROUTE
router.get('/', function (req, res) {
	res.render('signup', {
		css: ['style.css'],
		js: ['menu.js', 'createUser.js', 'loginScript.js']
	});
});

router.post('/', async function (req, res) {

	// recaptcha test
	const secretKey = process.env.RE_CAPTCHA_SK;
	const recaptchaToken = req.body['g-recaptcha-response'];
	const uuid = crypto.randomUUID();
	const email = req.body.userEmail;

	const ip = req.ip || req.connection.remoteAddress;


	if (!recaptchaToken) {
		return res.render('signup', {
			message: "Please complete the reCAPTCHA.",
			success: false,
			css: ['style.css'],
			js: ['menu.js', 'createUser.js', 'loginScript.js']
		});
	}

	try {

		const verifyRecaptcha = async (secret, token) => {
			const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `secret=${secret}&response=${token}`
			});

			return response.json();
		};

		const recaptchaRes = await verifyRecaptcha(secretKey, recaptchaToken);
		if (!recaptchaRes.success) {
			return res.render('signup', {
				message: 'reCAPTCHA verification failed. Please try again.',
				success: false,
				css: ['style.css'],
				js: ['menu.js', 'createUser.js', 'loginScript.js']
			});
		}

		const user = await User.findOne({where:{email}});
		if (user) {
			return res.render('signup', {
				message: 'Email Already in use!',
				success: false,
				css: ['style.css'],
				js: ['menu.js', 'createUser.js', 'loginScript.js']
			});
		}  

		//SEND VERFICATION EMAIL
		const mailTransport = nodemailer.createTransport({
			host: 'smtp.zoho.com',
			port: 465,
			secure: true,
			auth: {
				user: process.env.MAIL_ADMIN,
				pass: process.env.MAIL_PSSWD
			}
		});

		(async () => {
			const token = crypto.randomBytes(32).toString('hex');
			let baseURL;
			if (process.env.NODE_ENV === 'development') {
				baseURL = `http://localhost:${process.env.PORT}`;
			} else {
				baseURL = process.env.BASE_URL;
			}
			const verificationLink = `${baseURL}/verify/${token}`;
			const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
			const expires = new Date(Date.now() + 1000 * 60 * 5);

			await PendingUser.create({
				publicID: uuid,
				name: req.body.userName,
				email: req.body.userEmail,
				password: hashedPassword,
				ipAddress: ip,
				token: token,
				expiresAt: expires,
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now())
			});


			const info = await mailTransport.sendMail({
				from: `"Kevin Jr" <${process.env.MAIL_ADMIN}>`,
				to: email,
				subject: 'Email Verification',
				text: `Thank you for registering with my website. To protect against bot accounts I please ask to verify your email one time by clicking this link. ${verificationLink} \n(This link creates a user [you] in my database and expires after 5 minutes.)`,
			});

			console.log("Message send:", info.messageId);
		})();
		


		
		return res.render('signup', {
			message: 'Temporary Registration! A verification link has been sent to the email you provided. This is done to protect against bot accounts. Click the link to verify your account!',
			success: true,
			css: ['style.css'],
			js: ['menu.js', 'createUser.js', 'loginScript.js']
		});
	} catch (error) {
		console.error('Server Error:', error);
    	return res.render('signup', { 
     		message: 'An unexpected error occurred. Please try again.', 
      		success: false,
    		css: ['style.css'],
			js: ['menu.js', 'createUser.js', 'loginScript.js']
   		 });
	}
});

module.exports = router;