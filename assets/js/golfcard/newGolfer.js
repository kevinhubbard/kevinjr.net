document.addEventListener('DOMContentLoaded', () => {
  const socket = io(); // connect to server
  const roundID = document.getElementById('round-id').dataset.round;

  // Join socket.io room for this round
  socket.emit('joinRoom', `round-${roundID}`);
  console.log(`Joining socket room: round-${roundID}`);

  // Listen for new participants
  socket.on('newParticipant', data => {
    const ul = document.getElementById('participant-list');
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = data.userName;
    btn.addEventListener('click', function(e) {
      window.location.href = `/profile/${data.userID}`;
    });
    li.appendChild(btn);
    ul.appendChild(li);
  });

  const startBtn = document.getElementById('start-round');
  if (startBtn) {
    startBtn.addEventListener('click', function() {
      socket.emit('startRound', {roundID});
    });
  }

  socket.on('roundStarted', data => {
    console.log('Received roundStarted', data);
    window.location.href = `/golfcard/play/${data.roundID}`;
  });
















});


