var express = require('express');
var router = express.Router();
var {Course, Round, Hole, RoundParticipant} = require('../models/golfcard.js');
var User = require('../models/user.js');
const { QueryTypes } = require('sequelize');

router.get('/', async function(req, res){
	const crs = await Course.findAll();

	res.render('golfcard', {
		css: ['style.css', 'golfcard/golf.css'],
		js: ['golfcard/golfScript.js', 'menu.js', 'loginScript.js'],
		crs: crs
	});
});

router.get('/courses', async function(req, res){
	try {
		const { courseID } = req.query;

		let where = {};
		if (courseID) {
			where.courseID = courseID;
		}

		const crs = await Course.findAll({where});
		res.json(crs);
	} catch (error) {
		console.error('Error fetching courses: ', error);
		res.status(500).json({error: 'Something went wrong.'});
	}
});

router.get('/hls', async function(req, res) {
	try {
		const { courseID } = req.query;

		let where = {};
		if (courseID) {
			where.courseID = courseID;
		}

		const hls = await Hole.findAll({where});
		res.json(hls);
	} catch (error) {
		console.error('Error fetching holes: ', error);
		res.status(500).json({error: 'Something went wrong.'});
	}
});

router.get('/rounds', async function(req, res) {
	const rounds = await Round.findAll();
	res.json(rounds);
});

router.post('/rounds', async function(req, res){
	try {
		const {courseID, strokes, score} = req.body;
		const newRound = await Round.create({
			courseID: courseID,
			strokes: strokes,
			score: score
		});
		res.json({message: 'Round Saved!', roundID: newRound.roundID});
	} catch (err) {
		console.error(err);
		res.status(500).json({error:'failed to save round'});
	}
});

router.get('/rounds/create', async function(req, res) {

	if (!req.session.userId) {
		return res.status(401).send("please login first");
	}
	const crs = await Course.findAll();
	const host = req.session.userName;
	console.log(host);
	res.render('createRound', {
		css: ['style.css', 'golfcard/golf.css', 'golfcard/createRound.css'],
		js: ['golfcard/golfScript.js', 'menu.js', 'loginScript.js', 'golfcard/createRound.js'],
		crs: crs,
		usr: host,
		pid: req.session.userId
	});
});

router.post('/rounds/create', async function(req, res) {
	if (!req.session.userId) {
		return res.status(401).send("please login first");
	}

	const {course} = req.body;

	try {
		const newRound = await Round.create({
			courseID: course,
			hostID: req.session.userId,
			status: 'waiting'
		});

		await RoundParticipant.create({
			roundID: newRound.roundID,
			userID: req.session.userId
		});
		// redirect user to the current "active round room they created"
		res.redirect(`/golfcard/rounds/${newRound.roundID}/waiting`);
	} catch (err) {
		console.error(err);
		res.status(500).send("Failed to create round.");
	}
});

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
		//console.log(participants);
		res.render('waitingRoom', {
			css: ['style.css', 'golfcard/waiting.css'],
			js: ['golfcard/golfScript.js', 'golfcard/newGolfer.js'],
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
	
	res.render('activeRound', {
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

router.get('/play/:id', async function(req, res) {
	const roundID = req.params.id;
	const currentRound = await Round.findByPk(roundID, {
		include: [Course]
	});
	//console.log(currentRound);

	const players = await RoundParticipant.findAll({
		where: {roundID},
		include: [User]
	});

	const holes = await Hole.findAll({
		where: {
			courseID: currentRound.courseID
		}
	});

	//console.log(holes);
	console.log("session.userId:", req.session.userId);
	res.render('playRound', {
		roundID,
		currentRound,
		course: currentRound.Course,
		players,
		userId: req.session.userId,
		holes,
		css: ['style.css', /*'golfcard/golf.css',*/ 'golfcard/activeRound.css', 'golfcard/play.css'],
		js: [/*'golfScript.js',*/ 'menu.js', 'loginScript.js', 'golfcard/newGolfer.js'],
	});
});

router.post('/rounds/:id/scores', async function(req, res) {

});

router.get('/rounds/:id/scores', async function(req, res) {

});



module.exports = router;