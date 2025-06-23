const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');

router.post('/',  async function(req, res){
	if(req.body.state) {
		res.render('thankyou', {
			name: req.body.name,
			email: req.body.email,
			css: ['style.css'],
			js: ['menu.js']
		});
	} else {
		const msg = await Contact.create({name: req.body.name, email: req.body.email, message: req.body.msg});
		res.render('thankyou', {
			name: req.body.name,
			email: req.body.email,
			css: ['style.css'],
			js: ['menu.js']
		})
	}
});

module.exports = router;