var {Course, Teebox, Round, Hole, RoundParticipant, Score} = require('../models/golfcard.js');
var User = require('../models/user.js');
const { QueryTypes } = require('sequelize');

module.exports = (io) => {
	io.on('connection', (socket) => {
		console.log('New Client Connected');

		socket.on('joinRoom', (roomName) => {
			socket.join(roomName);
			console.log(`Socket ${socket.id} joined ${roomName}`);
		});

		socket.on('startRound', ({roundID}) => {
			io.to(`round-${roundID}`).emit('roundStarted', {roundID});
		});

	  	socket.on('holeFinished', async ({ roundID, userID, holeNumber, strokes, fairwayHit, greenInReg }) => {
	  		try {
	  			await Score.upsert({
	  				roundID: roundID,
	  				userID: userID,
	  				holeNumber: holeNumber,
	  				strokes: strokes,
	  				fairwayHit: fairwayHit,
	  				greenInReg: greenInReg
	  			});

	   			io.to(`round-${roundID}`).emit('updatedScore', { roundID });
	  		} catch (err) {
	  			console.error(err);
	  		}
	 	});
	});
};