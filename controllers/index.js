const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

//GETS INDEX ROUTE
router.get('/', function(req, res){
	res.render('index',{
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
	try {
		const user = await User.findOne({where:{email}});
		if (!user) {
			return res.status(404).json({message: 'user not found'});
		}
		const isValidPassword = await bcrypt.compare(req.body.psw, user.password);
		if (!isValidPassword) {
			return res.status(401).json({message: 'Invalid Password'});
		}
		req.session.userId = user.publicID;
		res.redirect(`/profile/${user.publicID}`);
	} catch (error) {
		console.error('Server Error', error);
		res.status(500).json({error: 'Something went wrong.'});
	}
});

module.exports = router;