var {Course, Teebox, Round, Hole, RoundParticipant, Score} = require('../models/golfcard.js');
var User = require('../models/user.js');
const { QueryTypes } = require('sequelize');

module.exports = (io) => {
	io.on('connection', (socket) => {
		console.log('New Client Connected');

		socket.on('joinRoom', (roomName) => {
			socket.join(roomName);
			console.log(`Socket joined room: ${roomName}`);
		});

		socket.on('startRound', ({roundID}) => {
			io.to(`round-${roundID}`).emit('roundStarted', {roundID});
		});

	  	socket.on('holeFinished', async ({ roundID, userID, holeNumber, strokes, fairwayHit, greenInReg }) => {
	    	// console.log(`[server] holeFinished: user ${userID}, hole ${holeNum}, strokes: ${strokes}`);
	    	// console.log('update should fire');
	  		try {
	  			await Score.create({
	  				roundID: roundID,
	  				userID: userID,
	  				holeNumber: holeNumber,
	  				strokes: strokes,
	  				fairwayHit: fairwayHit,
	  				greenInReg: greenInReg
	  			});


	  			// await sequelize.query(`
	  			// 	INSERT INTO Scores (roundID, userID, holeNum, strokes, fairwayHit, greenInReg)
	  			// 	VALUES (?, ?, ?, ?)
	  			// 	ON DUPLICATE KEY UPDATE strokes = ?
	  			// 	`, [roundID, userID, holeNum, strokes, fairwayHit, greenInReg, strokes]);

	   			io.to(`round-${roundID}`).emit('updatedScore', { roundID });
	  		} catch (err) {
	  			console.error(err);
	  		}
	 	});

	  	//when phone reconnects, refresh score.
	  	socket.on("connect", () => {
	  		console.log("connected");
	  		fetch(`/rounds/${roundID}/scores`)
	  			.then(res => res.json())
	  			.then(scores => {
	  				updateScoreboard(scores);
	  			});
	  	});

	  	socket.on("reconnect", () => {
  			console.log("socket reconnected");
  			fetch(`/rounds/${roundID}/scores`)
    			.then(res => res.json())
    			.then(scores => updateScoreboard(scores));
		});

		socket.on('disconnect', () => {
			console.log('client disconnected.');
		});
	});
};