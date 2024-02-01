window.addEventListener("DOMContentLoaded", function(event) {
	let courseName;
	let holesPlayed;
	let holeNum = 1;
	let strokes = 0;
	let holeStrokes = 0;
	let score = 0;
	const hole = [];
	let round = {};
	
	document.getElementById('app').style.display = 'none';
	document.getElementById('courseInfo').style.display = 'none';

	let newRound = document.getElementById('newRound');
	newRound.addEventListener("click", function() {
		document.getElementById("options").style.display = 'none';
		document.getElementById('courseInfo').style.display = 'block';
	});

	let courses = document.getElementById('courses');
		courses.addEventListener("click", function() {
		//load golfcard/rounds
		window.location.href = '/golfcard/courses';
	});

	let loadRound = document.getElementById('loadRound');
	loadRound.addEventListener("click", function() {
		//load golfcard/rounds
		window.location.href = '/golfcard/rounds';
	});
	
	let nextHole = document.getElementById('nextHole');
	nextHole.addEventListener("click", function() {
		strokes += holeStrokes;	
		let par = document.getElementById('par').value;
		score += (holeStrokes - par);
		document.getElementById('score').innerText = score;
		checkScore(score);
		updateScoreCard(holeNum, par, holeStrokes);
		const newHole = new Hole(holeNum, par, holeStrokes);
		hole.push(newHole);
		resetHole();
		finishGameCheck(holeNum, holesPlayed);

	});

	let startRound = document.getElementById('start');
	startRound.addEventListener("click", function() {
		nextHole.disabled = true;
		document.getElementById('hole').innerText = holeNum;
		courseName = document.getElementById('selectCourse').value;
		holesPlayed = document.getElementById('selectHoles').value;
		console.log("playing " + holesPlayed + " holes at " + courseName);
		document.getElementById('course').innerText = courseName;
		document.getElementById('courseInfo').style.display = 'none';
		document.getElementById('app').style.display = 'block';
	});

	let stroke = document.getElementById('stroke');
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
			round = new Round(courseName, holesPlayed, score, strokes, hole);
			console.log(round.toString());
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

	function updateScoreCard(holeNum, par, holeStrokes) {
		const newHoleRow = document.createElement("TD");
		newHoleRow.innerText = holeNum;
		document.getElementById('holeRow').appendChild(newHoleRow);

		const newParRow = document.createElement("TD");
		newParRow.innerText = par;
		document.getElementById('parRow').appendChild(newParRow);

		const newStrokeRow = document.createElement("TD");
		newStrokeRow.style.width = '25px';
		newStrokeRow.style.height = '25px';
		newStrokeRow.innerText = holeStrokes;
		if (parseInt(holeStrokes) < parseInt(par)) {
			newStrokeRow.style.borderRadius = '50%';
			newStrokeRow.style.color = 'green';
			if (parseInt(holeStrokes ) < parseInt(par - 1)) {
				newStrokeRow.style.border = '3px double black';
			} else {
				newStrokeRow.style.border = '1px solid black';
			}
		} else if (parseInt(holeStrokes) > parseInt(par)) {
			newStrokeRow.style.color = 'red';
			if (parseInt(holeStrokes -1) > parseInt(par)) {
				newStrokeRow.style.border = '3px double black';
			} else {
				newStrokeRow.style.border = '1px solid black';
			}
		}
		document.getElementById('scoreRow').appendChild(newStrokeRow);
	}

	function resetHole() {
		holeNum++;
		document.getElementById('hole').innerText = holeNum;
		document.getElementById('strokes').innerText = 0;
		document.getElementById('fir').checked = false;
		document.getElementById('gir').checked = false;		
		holeStrokes = 0;
		nextHole.disabled = true;
	}

	function Hole(num, par, strk) {
		this.holeNumber = num;
		this.par = par;
		this.strokes = strk;
	}

	function Round(name, numOfHoles, score, strokes, hole) {
		this.courseName = name;
		this.holesPlayed = numOfHoles;
		this.score = score;
		this.strokes = strokes;
		this.hole = hole;
	}

	Round.prototype.toString = function() {
		let summary = this.holesPlayed + " holes played at " + this.courseName + ".\nScore: " + this.score + "\nStrokes: " + this.strokes + "\n";
		for (i = 0; i < hole.length; i++) {
			summary += "Hole: " + hole[i].holeNumber + ", Par: " + hole[i].par + ", Strokes: " + hole[i].strokes + "\n";
		}
		return summary;
	}
});