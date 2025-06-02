var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
let bcrypt = require('bcrypt');

//const { QueryTypes } = require('sequelize');

//GETS INDEX ROUTE
router.get('/', function(req, res){
	res.render('index',{
		css: ['style.css', 'index.css'],
		js: ['canvasScript.js', 'menu.js', 'loginScript.js']
	});
});

router.post('/', async function(req, res) {
	let email = req.body.uname;
	try {
		const user = await User.findOne({where:{email}});
		if (!user) {
			return res.status(404).json({message: 'user not found'});
		}
		const isValidPassword = await bcrypt.compare(req.body.psw, user.password);
		if (!isValidPassword) {
			return res.status(401).json({message: 'Invalid Password'});
		}
		console.log(req.session);
		req.session.userId = user.userID;
		console.log(req.session);
		res.redirect(`/profile/${user.userID}`);
	} catch (error) {
		console.error('Server Error', error);
		res.status(500).json({error: 'Something went wrong.'});
	}
});

router.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		if (err) {
			console.error("Logout error: ", err);
			return res.status(500).send("Logout failed");
		}

		res.clearCookie('connect.sid');
		res.redirect('/');
	})
})
module.exports = router;