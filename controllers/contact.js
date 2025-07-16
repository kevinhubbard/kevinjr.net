const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');
const User = require('../models/user.js');

//contact route
router.get('/', function(req, res){
	res.render('contact',{
		css: ['style.css', 'contact.css'],
		js: ['menu.js', 'loginScript.js']
	});
});

router.post('/',  async function(req, res){

	const user = await User.findOne({where:{email: req.body.email}});
	if (user) {
		const msg = await Contact.create({name: user.name, email: user.email, message: req.body.msg});
		return res.render('contact', {
			success: true,
			message: `Thank you ${user.name}, I have received your information and will respond to you at ${user.email} shortly…`,
			css: ['style.css', 'contact.css'],
			js: ['menu.js', 'loginScript.js']
		})
	} else {
		return res.render('contact', {
			message: 'You must have a verified email to send me a message. Please re-enter your email or create an account first.',
			success: false,
			css: ['style.css', 'contact.css'],
			js: ['menu.js', 'loginScript.js']
		});
	}
});

module.exports = router;