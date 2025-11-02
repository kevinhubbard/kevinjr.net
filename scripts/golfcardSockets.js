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

	  	socket.on('holeFinished', ({ roundID, userID, holeNum, strokes }) => {
	    	console.log(`[server] holeFinished: user ${userID}, hole ${holeNum}, strokes: ${strokes}`);
	    	console.log('update should fire');
	   		 io.to(`round-${roundID}`).emit('updateScore', { userID, holeNum, strokes });
	    	console.log('after update');
	 	 });

		socket.on('disconnect', () => {
			console.log('client disconnected.');
		});
	});
};