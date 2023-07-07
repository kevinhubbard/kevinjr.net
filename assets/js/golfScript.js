window.addEventListener("DOMContentLoaded", function(event) {
	var newRoundBtn = document.getElementById('newRound');
	var lookupRoundBtn = document.getElementById('lookupRound');
	var opt = document.getElementById('options');
	var startRound = document.getElementById('startRound');

	newRoundBtn.addEventListener("click", function(){
		opt.style.display = 'none';
		document.getElementById('gamePanel').style.display = 'block';
	});

	lookupRoundBtn.addEventListener("click", function(){
		opt.style.display = 'none';
		document.getElementById('showRound').style.display = 'block';
	});

	startRound.addEventListener("click", function(){
		console.log('starting round');
		var courseName = document.getElementById('courseName').value;
		//var holes = document.getElementsByName('holes').value;
		console.log(courseName);
		//console.log(holes);
	});



});