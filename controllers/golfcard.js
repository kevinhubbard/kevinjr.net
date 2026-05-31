require('dotenv').config();
var express = require('express');
var router = express.Router();
var {sequelize, Course, Teebox, Round, Hole, RoundParticipant, Score} = require('../models/golfcard.js');
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
router.post('/admin/bulkhole', async function(req, res) {
	let teeBoxIDs = req.body.bulkteeboxid;
	let tbArr = teeBoxIDs.split(',');

	let numOfHoles = Number(req.body.numOfHoles);

	let pars = req.body.bulkpar;
	let parArr = pars.split(',');

	let teeYards = req.body.bulkyards;
	let teesArr = teeYards.split(';');

	let yardMatrix = [];

	for (let i = 0; i < teesArr.length; i++) {
		let splitArr = teesArr[i].split(',');
		yardMatrix.push(splitArr);
	}

	let holesToCreate = [];
	let error = false;

	if (tbArr.length != yardMatrix.length) {
		error = true;
		console.log(`number of teeboxes: '${tbArr.length}' does not equal the yard matrix: '${yardMatrix.length}' length`);		
	}

	if (numOfHoles != parArr.length) {
		error = true;
		console.log(`the number of pars: '${parArr.length}' must equal the number of holes: '${numOfHoles}'`);
	}

	for (let r = 0; r < yardMatrix.length; r++) {
		if (yardMatrix[r].length != numOfHoles) {
			error = true;
			console.log(`row: '${r}' in yardMatrix array does not have the correct number of holes: '${numOfHoles}'`);
		}
	}

	if (error) {
		res.render('golfcard/admin/error', {
			css: ['style.css', 'golfcard/golf.css', 'golfcard/createRound.css', 'golfcard/admin.css'],
			js: ['golfcard/golfScript.js', 'menu.js', 'loginScript.js', 'golfcard/createRound.js', 'golfcard/admin/hf.js']
		});
		return;
	}

	for (let tb = 0; tb < tbArr.length; tb++) {
		for (let hole = 0; hole < numOfHoles; hole++) {
			let id = tbArr[tb];
			let h = hole + 1;
			let p = parArr[hole];
			let y = yardMatrix[tb][hole];

			holesToCreate.push({
				teeboxID: id,
				holeNumber: h,
				par: p,
				yards: y
			});
		}
	}

	for (let i = 0; i < holesToCreate.length; i++) {
		try {
			await Hole.create({
				teeBoxID: holesToCreate[i].teeboxID,
				holeNumber: holesToCreate[i].holeNumber,
				par: holesToCreate[i].par,
				yards: holesToCreate[i].yards
			});
		} catch (err) {
			console.error("An error occurred: " + err.message);
		}
	}

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
			userID: req.session.userId,
			isHost: true
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
		include: [
			{model: Course},
			{model: Teebox},
			{
				model: RoundParticipant,
				include: [{model: User}]
			}
		]
	});

	res.render('golfcard/activeRound', {
		css: ['style.css', 'golfcard/golf.css', 'golfcard/activeRound.css'],
		js: ['golfcard/golfScript.js', 'menu.js', 'loginScript.js', 'golfcard/newGolfer.js'],
		rounds: activeRounds.map(r => r.get({plain:true}))
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
		const round = await Round.update({
			status: 'active',
			startedAt: new Date()
		}, { 
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
	const scores = await sequelize.query(`
		SELECT
			s.userID,
			s.holeNumber,
			s.strokes,
			h.par,
			(s.strokes - h.par) AS scoreRelativeToPar
		FROM Scores s
		JOIN Rounds r
			ON s.roundID = r.roundID
		JOIN Holes h 
			ON h.teeBoxID = r.teeBoxID
			AND h.holeNumber = s.holeNumber
		WHERE s.roundID = :roundID
		ORDER BY s.userID, s.holeNumber
	`, {
		replacements: { roundID: req.params.id},
		type: QueryTypes.SELECT
	});

	res.json(scores);
});


//LOAD USERS SCORES 
router.get('/rounds/played', async function(req, res) {
	if (!req.session.userId) {
		return res.status(401).send("Please login first to view your rounds played!");
	}

	const rounds = await sequelize.query(`
  		SELECT 
	    	r.roundID,
	   		r.createdAt,
	    	c.courseName,
    		SUM(s.strokes) AS totalStrokes,
    		SUM(s.strokes - h.par) AS scoreToPar
  		FROM Rounds r
  		JOIN Scores s ON r.roundID = s.roundID
		JOIN Holes h ON s.holeNumber = h.holeNumber AND h.teeBoxID = r.teeBoxID
  		JOIN Courses c ON r.courseID = c.courseID
  		WHERE s.userID = :userID
  		GROUP BY r.roundID, c.courseName, r.createdAt
  		ORDER BY r.createdAt DESC
  		LIMIT 10
	`, {
  		replacements: { userID: req.session.userId },
  		type: QueryTypes.SELECT
	});

	rounds.forEach(r => {
		r.date = new Date(r.createdAt). toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});

		if (r.scoreToPar > 0) {
			r.scoreToPar = '+' + r.scoreToPar;
		} else if (r.scoreToPar == 0) {
			r.scoreToPar = 'E';
		}
	});


	res.render('golfcard/myScores', {
		rounds: rounds,
		css: ['style.css', 'golfcard/userScores.css'],
		js: ['menu.js', 'loginScript.js']
	});
});


module.exports = router;