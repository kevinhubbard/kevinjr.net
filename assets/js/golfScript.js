window.addEventListener("DOMContentLoaded", function(event) {
	var newRoundBtn = document.getElementById('newRound');
	var lookupRoundBtn = document.getElementById('lookupRound');
	var opt = document.getElementById('options');
	var startBtn = document.getElementById('startRound');
	var strokeBtn = document.getElementById('incStroke');
	var nextBtn = document.getElementById('nextHole');
	var holeStro = 0;
	var score = 0;
	var curHole = 0;
	var par = 0;

	var round = {
		course: '',
		totalHoles: 0,
		totalStrokes: 0,
		hole: []
	};



	newRoundBtn.addEventListener("click", function(){
		opt.style.display = 'none';
		document.getElementById('gamePanel').style.display = 'block';
	});

	lookupRoundBtn.addEventListener("click", function(){
		opt.style.display = 'none';
		document.getElementById('showRound').style.display = 'block';
	});

	startBtn.addEventListener("click", function(){
		console.log('starting round');
		var courseName = document.getElementById('courseName').value;
		var holes;
		if (document.getElementById('9holes').checked) {
			holes = '9'; 
		} else if (document.getElementById('18holes').checked) {
			holes = '18';
		}

		document.getElementById('startInfo').style.display = 'none';
		document.getElementById('gameProgress').style.display = 'block';
		document.getElementById('holeInfo').style.display = 'inline-block';
		document.getElementById('holeNum').textContent = curHole + 1;
		startRound(courseName, holes);

	});

	strokeBtn.addEventListener("click", function(){
		holeStro += 1;
		document.getElementById('strokes').textContent = holeStro;
	});

	nextBtn.addEventListener("click", function() {
			var holeObj = {
		holeNum: 0,
		holePar: 0,
		holeStrokes: 0
	};
		holeObj.holeNum = curHole + 1;
		holeObj.holePar = parseInt(document.getElementById('par').value);
		holeObj.holeStrokes = parseInt(document.getElementById('strokes').textContent);
		round.totalStrokes += holeStro;
		round.hole.push(holeObj);
		score += holeStro - document.getElementById('par').value;
		startNextHole();

	});

	function startRound(name, holes) {
		round.course = name;
		round.totalHoles = holes;
		document.getElementById('course').textContent += name;

	}

	function startNextHole() {
		holeStro = 0;
		curHole++;
		document.getElementById('holeNum').textContent = curHole;
		document.getElementById('strokes').textContent = '';
		document.getElementById('score').textContent = score;
		console.log(round);
	}

});