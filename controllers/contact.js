const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');
const User = require('../models/user.js');

//contact route
router.get('/', function(req, res){
	res.status(200).render('contact',{
		css: ['style.css', 'contact.css'],
		js: ['menu.js', 'loginScript.js']
	});
});

router.post('/',  async function(req, res){
	try {
		const user = await User.findOne({where:{email: req.body.email}});
		if (user) {
			await Contact.create({name: user.name, email: user.email, message: req.body.msg});
			return res.status(201).render('contact', {
				success: true,
				message: `Thank you ${user.name}, I have received your information and will respond to you at ${user.email} shortly…`,
				css: ['style.css', 'contact.css'],
				js: ['menu.js', 'loginScript.js']
			})
		} else {
			return res.status(403).render('contact', {
				message: 'You must have a verified email to send me a message. Please re-enter your email or create an account first.',
				success: false,
				css: ['style.css', 'contact.css'],
				js: ['menu.js', 'loginScript.js']
			});
		}
	} catch (err) {
		return res.status(500).render('contact', {
			success: false,
			message: 'An unexpected server error occured. Please try again later.',
			css: ['style.css', 'contact.css'],
			js: ['menu.js', 'loginScript.js']
		});
	}
});

module.exports = router;