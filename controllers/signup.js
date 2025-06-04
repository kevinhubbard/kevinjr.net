const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

//GETS RESUME ROUTE
router.get('/', function (req, res) {
	res.render('signup', {
		css: ['style.css'],
		js: ['menu.js', 'createUser.js', 'loginScript.js']
	});
});

router.post('/', async function (req, res) {
	const uuid = crypto.randomUUID();
	const email = req.body.userEmail;
	try {
		const user = await User.findOne({where:{email}});
		if (user) {
			return res.render('signup', {
				message: 'Email Already in use!',
				success: false,
				css: ['style.css'],
				js: ['menu.js', 'createUser.js', 'loginScript.js']
			});
		}  
		
		const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
		await User.create({
			publicID: uuid,
			email: req.body.userEmail,
			name: req.body.userName,
			password: hashedPassword
		});
		
		return res.render('signup', {
			message: 'Registration successful!',
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