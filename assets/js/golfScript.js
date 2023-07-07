window.addEventListener("DOMContentLoaded", function(event) {
	var newRoundBtn = document.getElementById('newRound');
	var lookupRoundBtn = document.getElementById('lookupRound');
	var opt = document.getElementById('options');

	newRoundBtn.addEventListener("click", function(){
		console.log('start a new round function');
		newRound('twisted dunes', '18');
	});

	lookupRoundBtn.addEventListener("click", function(){
		console.log("lookup round function");
		lookupRound('twisted dune');
	});

	function newRound() {
		opt.style.display = 'none';
		document.getElementById('startGame').style.display = 'block';
	}

	function lookupRound() {
		opt.style.display = 'none';
		document.getElementById('showRound').style.display = 'block';
	}

});