window.addEventListener("DOMContentLoaded", function(event) {
	let courseName;
	let holesPlayed;
	let holeNum = 1;
	let strokes = 0;
	let holeStrokes = 0;
	let score = 0;
	const hole = [];
	let round = {};
	let holesData;
	let courseData;


	const mainApp = document.getElementById('app');
	if (mainApp) {
		mainApp.style.display = 'block';
	}
	//document.getElementById('app').style.display = 'none';
	document.getElementById('courseInfo').style.display = 'none';

	const activeRounds = document.getElementById('activeRounds');
	activeRounds.addEventListener('click', function() {
		window.location.href='/golfcard/rounds/active';
	})

	let newRound = document.getElementById('newRound');
	newRound.addEventListener("click", function() {
		document.getElementById('options').style.display = 'none';
		document.getElementById('courseInfo').style.display = 'block';
	});

/*	let courses = document.getElementById('courses');
		courses.addEventListener("click", function() {
		//load golfcard/rounds
		window.location.href = '/golfcard/courses';
	});*/

	let loadRound = document.getElementById('loadRound');
	loadRound.addEventListener("click", function() {
		//load golfcard/rounds
		window.location.href = '/golfcard/rounds';
	});
	
	let nextHole = document.getElementById('nextHole');
	nextHole.addEventListener("click", function() {
		
		strokes += holeStrokes;	
		let par = document.getElementById('par').innerText;
		score += (holeStrokes - par);
		document.getElementById('score').innerText = score;
		checkScore(score);
		updateScoreCard(holeNum, par, holeStrokes);
		const newHole = new Hole(holeNum, par, holeStrokes);
		hole.push(newHole);
		resetHole();
		if (finishGameCheck(holeNum, holesData.length)) {
			document.getElementById('nextHole').disabled = true;
			document.getElementById('stroke').disabled = true;
			saveRound();
		} else {
			updatePageWithHoleInfo(holeNum - 1);
		}
	});

	function saveRound() {
		round = new Roundr(courseData[0].courseID, strokes, score);
		console.log(round);
		fetch('/golfcard/rounds', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(round)
		})
		.then(response => response.json())
		.then(data => {
			console.log('Round saved:', data);
		})
		.catch(error => {
			console.error('Error saving round:', error);
		});
	}

	let startRound = document.getElementById('start');
	startRound.addEventListener("click", async function() {
		nextHole.disabled = true;
		//document.getElementById('hole').innerText = holeNum;
		document.getElementById('courseInfo').style.display = 'none';
		document.getElementById('app').style.display = 'block';

		const courseID = document.getElementById('courses').value;
		console.log("course id is: " + courseID);
		holesData = await fetchCourseHoles(courseID);
		courseData = await fetchCourseInfo(courseID);

		updatePageWithCourseInfo();
		updatePageWithHoleInfo(0);
	});

	async function fetchCourseInfo(cID) {
		try {
			const response = await fetch(`/golfcard/courses?courseID=${cID}`);
			if (!response.ok) throw new Error("failed to fetch courses.");
			const course = await response.json();
			return course;
		} catch (error) {
			console.error("there was an error", error);
			return [];
		}
	}

	async function fetchCourseHoles(cID) {
		try {
			const response = await fetch(`/golfcard/hls?courseID=${cID}`);
			if (!response.ok) throw new Error("failed to fetch holes");
			const holes = await response.json();
			return holes;
		} catch (error) {
			console.error("Error fetching course holes:", error);
			return [];
		}
	}

	let stroke = document.getElementById('stroke');
	stroke.addEventListener("click", function() {
		holeStrokes++;
		document.getElementById('strokes').innerText = holeStrokes;
		nextHole.disabled = false;
	});

	function updatePageWithCourseInfo() {
		document.getElementById('lcourseName').innerText = courseData[0].courseName;
		document.getElementById('lcoursePar').innerText = courseData[0].par;
		document.getElementById('lcourseYards').innerText = courseData[0].yards;
	}

	function updatePageWithHoleInfo(hNum) {
			document.getElementById('par').innerText = holesData[hNum].par;
			document.getElementById('hole').innerText = holesData[hNum].holeNumber;
			document.getElementById('yards').innerText = holesData[hNum].yards;
	}

	function finishGameCheck(currentHole, totalHoles) {
		console.log(`CurrentHole: ${currentHole}\nTotalHoles: ${totalHoles}`);
		if (currentHole == totalHoles) {
			document.getElementById('nextHole').innerText = 'Finish Game';
			return false;
		} else if (currentHole > totalHoles) {
			return true;
		}
		return false;

		/*if (currentHole>totalHoles) {
			console.log('games over.');
			document.getElementById('nextHole').disabled = true;
			document.getElementById('stroke').disabled = true;
			round = new Round(courseName, holesPlayed, score, strokes, hole);
			console.log(round.toString());
		}*/
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

	function UnlistedRound(name, numOfHoles, score, strokes, hole) {
		this.courseName = name;
		this.holesPlayed = numOfHoles;
		this.score = score;
		this.strokes = strokes;
		this.hole = hole;
	}

	function Roundr(courseID, strokes, score) {
		this.courseID = courseID;
		this.strokes = strokes;
		this.score = score;
	}

	Round.prototype.toString = function() {
		let summary = holesData.length + " holes played at " + courseData[0].courseID + "\nStrokes: " + this.strokes + "\n";
		for (i = 0; i < hole.length; i++) {
			summary += "Hole: " + hole[i].holeNumber + ", Par: " + hole[i].par + ", Strokes: " + hole[i].strokes + "\n";
		}
		return summary;
	}







	


	
});

window.addEventListener('beforeunload', (event) => {
  event.returnValue = `Are you sure you want to leave?`;
});
