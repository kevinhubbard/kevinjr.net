window.addEventListener("DOMContentLoaded", function(event) {
	let courseName;
	let holes;
	let hole = 1;
	let strokes = 0;
	let holeStrokes = 0;
	let score = 0;
	
	document.getElementById('app').style.display = 'none';
	
	let nextHole = document.getElementById('nextHole');
	let stroke = document.getElementById('stroke');
	let startRound = document.getElementById('start');
	startRound.addEventListener("click", function() {
		nextHole.disabled = true;
		document.getElementById('hole').innerText = hole;
		courseName = document.getElementById('courseName').value;
		holes = document.getElementById('holes').value;
		console.log("playing " + holes + " holes at " + courseName);
		document.getElementById('course').innerText = courseName;
		document.getElementById('courseInfo').style.display = 'none';
		document.getElementById('app').style.display = 'block';
	});

	nextHole.addEventListener("click", function() {
		
		strokes += holeStrokes;	
		let par = document.getElementById('par').value;
		score += (holeStrokes - par);
		document.getElementById('score').innerText = score;
		checkScore(score);

		const newHoleRow = document.createElement("TD");
		newHoleRow.innerText = hole;
		document.getElementById('holeRow').appendChild(newHoleRow);

		const newParRow = document.createElement("TD");
		newParRow.innerText = par;
		document.getElementById('parRow').appendChild(newParRow);

		const newStrokeRow = document.createElement("TD");
		newStrokeRow.innerText = holeStrokes;
		document.getElementById('scoreRow').appendChild(newStrokeRow);
		
		document.getElementById('strokes').innerText = 0;
		hole++;
		document.getElementById('hole').innerText = hole;
		holeStrokes = 0;
		finishGameCheck(hole, holes);
		nextHole.disabled = true;
	});

	stroke.addEventListener("click", function() {
		holeStrokes++;
		document.getElementById('strokes').innerText = holeStrokes;
		nextHole.disabled = false;
	});

	function finishGameCheck(currentHole, totalHoles) {
		if (currentHole == totalHoles) {
			document.getElementById('nextHole').innerText = 'Finish Game';
		}
		if (currentHole>totalHoles) {
			console.log('games over.');
			document.getElementById('nextHole').disabled = true;
			document.getElementById('stroke').disabled = true;
		}
	}

	function checkScore(s) {
		if (s === 0) {
			document.getElementById('score').innerText = 'E';
			document.getElementById('score').style.color = 'green';
		} else if (s>0) {
			document.getElementById('score').style.color = 'black';
		} else {
			document.getElementById('score').style.color = 'red';
		}
	}
});