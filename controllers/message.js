const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');

//message route
router.get('/', async function(req, res){
	const messages = await Contact.findAll();
	res.status(200).render('messages',{
		css: ['style.css', 'messages.css'],
		js: ['menu.js', 'loginScript.js', 'messages.js'],
		msg: messages
	});
});

module.exports = router;