require('dotenv').config();
var express = require('express');
var router = express.Router();
var {Course, Teebox, Round, Hole, RoundParticipant, Score} = require('../models/golfcard.js');
var User = require('../models/user.js');
const { QueryTypes } = require('sequelize');

router.get('/', async function(req, res){
	const crs = await Course.findAll();
	res.render('golfcard/golfcard', {
		css: ['style.css', 'golfcard/golf.css'],
		js: ['golfcard/golfScript.js', 'menu.js', 'loginScript.js'],
		crs: crs
	});
});

// ADMIN VIEW TO CREATE COURSES AND HOLES
router.get('/admin', function(req, res) {
	if (req.session.userId != process.env.ADMIN_ID) {
		return res.status(401).send("you must be an admin to view that page.");
	}

	res.render('golfcard/admin', {
		css: ['style.css', 'golfcard/golf.css', 'golfcard/createRound.css', 'golfcard/admin.css'],
		js: ['golfcard/golfScript.js', 'menu.js', 'loginScript.js', 'golfcard/createRound.js']
	});
});
router.post('/admin/course', async function(req, res) {
	const course = await Course.create({ 
		courseName: req.body.cName, 
		township: req.body.tName, 
		state: req.body.sName
	});
	res.redirect('/golfcard/admin');
});
router.post('/admin/teebox', async function(req, res) {
	const rating = req.body.rating || null;
	const slope = req.body.slope || null;
	await Teebox.create({
		courseID: req.body.courseid,
		teeName: req.body.tboxName,
		totalYards: req.body.totalYards,
		rating: rating,
		slope: slope
	});
	res.render('golfcard/admin', {
		css: ['style.css', 'golfcard/golf.css', 'golfcard/createRound.css', 'golfcard/admin.css'],
		js: ['golfcard/golfScript.js', 'menu.js', 'loginScript.js', 'golfcard/createRound.js', 'golfcard/admin/tfocus.js']
	});
});
router.post('/admin/hole', async function(req, res) {
	await Hole.create({
		teeBoxID: req.body.teeboxid,
		holeNumber: req.body.holeNum,
		par: req.body.par,
		yards: req.body.yards
	});
	res.render('golfcard/admin', {
		css: ['style.css', 'golfcard/golf.css', 'golfcard/createRound.css', 'golfcard/admin.css'],
		js: ['golfcard/golfScript.js', 'menu.js', 'loginScript.js', 'golfcard/createRound.js', 'golfcard/admin/hf.js']
	});
});


// USER CAN CREATE A NEW GOLF ROUND JOINABLE BY OTHERS
router.get('/rounds/create', async function(req, res) {

	if (!req.session.userId) {
		return res.status(401).send("please login first");
	}
	const crs = await Course.findAll();
	const host = req.session.userName;
	const teeBoxes = await Teebox.findAll();
	
	res.render('golfcard/createRound', {
		css: ['style.css', 'golfcard/golf.css', 'golfcard/createRound.css'],
		js: ['golfcard/golfScript.js', 'menu.js', 'loginScript.js', 'golfcard/createRound.js'],
		crs: crs,
		usr: host,
		teeBoxes: teeBoxes,
		pid: req.session.userId
	});
});

router.post('/rounds/create', async function(req, res) {
	if (!req.session.userId) {
		return res.status(401).send("please login first");
	}
	const {course, teeBoxID} = req.body;
	try {
		const newRound = await Round.create({
			hostID: req.session.userId,
			courseID: course,
			teeBoxID: teeBoxID,
			status: 'waiting'
		});

		await RoundParticipant.create({
			roundID: newRound.roundID,
			userID: req.session.userId
		});
		// redirect user to the current active round room they created
		res.redirect(`/golfcard/rounds/${newRound.roundID}/waiting`);
	} catch (err) {
		console.error(err);
		res.status(500).send("Failed to create round.");
	}
});

// WAITING ROOM FOR USERS BEFORE ROUND BEGINS
router.get('/rounds/:id/waiting', async function(req, res) {
	const roundID = req.params.id;
	try {
		const round = await Round.findByPk(roundID, {
			include: [Course]
		});

		const participants = await RoundParticipant.findAll({
			where: {roundID},
			include: [User]
		});

		res.render('golfcard/waitingRoom', {
			css: ['style.css', 'golfcard/waiting.css'],
			js: ['golfcard/newGolfer.js', 'menu.js', 'loginScript.js'],
			round: round,
			participants: participants,
			isHost: req.session.userId === round.hostID
		});
	} catch (err) {
		console.error(err);
		res.status(500).send('Could not load waiting room');
	}
});

router.get('/rounds/active', async function(req, res) {
	const activeRounds = await Round.findAll({
		where: {status: 'waiting'},
		include: [Course]
	});
	
	res.render('golfcard/activeRound', {
		css: ['style.css', 'golfcard/golf.css', 'golfcard/activeRound.css'],
		js: ['golfcard/golfScript.js', 'menu.js', 'loginScript.js', 'golfcard/newGolfer.js'],
		rounds: activeRounds
	});
});

router.get('/rounds/:id/join', async function(req, res) {
	if (!req.session.userId) {
		return res.status(401).send("please login first");
	}
	const roundID = req.params.id;
	const userID = req.session.userId;
	const user = await User.findByPk(userID);

	await RoundParticipant.create({ roundID, userID});

	//emit to clients in the room
	const io = req.app.get('io');
	io.to(`round-${roundID}`).emit('newParticipant', {userID, userName: user.name});

	res.redirect(`/golfcard/rounds/${roundID}/waiting`);
});





// HOST STARTED ROUND
router.get('/play/:id', async function(req, res) {
	const roundID = req.params.id;
	try {
		const round = await Round.update({status: 'active'}, {
			where: { roundID: roundID }
		});
	} catch (error) {
		console.error("Error during database update: " , error.message);
	}
	
	const currentRound = await Round.findByPk(roundID, {
		include: [Course, Teebox]
	});

	const players = await RoundParticipant.findAll({
		where: {roundID},
		include: [User]
	});

	const holes = await Hole.findAll({
		where: {
			teeBoxID: currentRound.teeBoxID
		}
	});

	res.render('golfcard/playRound', {
		roundID,
		currentRound,
		course: currentRound.Course,

		players,
		userId: req.session.userId,
		holes,
		css: ['style.css', 'golfcard/golf.css', 'golfcard/activeRound.css'],
		js: ['menu.js', 'loginScript.js'],
	});
});


//GET ROUND SCORES
router.get('/rounds/:id/scores', async function(req, res) {
	const scores = await Score.findAll({
		attributes: ['userID', 'holeNumber', 'strokes'],
		where: { roundID: req.params.id }
	});
	res.json(scores);
});


module.exports = router;